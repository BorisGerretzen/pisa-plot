import {useMemo, useState} from "react";
import {DataSource} from "../lib/DataSource.ts";
import {getData} from "../lib/getData.ts";
import randomColor from "randomcolor";
import {DataSourceSelector} from "./DataSourceSelector.tsx";
import {CountrySelector} from "./CountrySelector.tsx";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {DataSourceRow} from "../lib/dataSourceRow.ts";
import "./plotter.css"

type RenderDataEntry = {
    name: number,
    [key: string]: number | null
}

const renderData = (dataSource: DataSourceRow[], selectedCountries: string[]) => {
    return dataSource
        .filter(v => selectedCountries.includes(v.Jurisdiction))
        .map(v => v.data.map(row => {
                const val: RenderDataEntry = {
                    name: row.Year,
                    [v.Jurisdiction]: row.Average
                }
                return val;
            })
        )
        .flat()
        .reduce((result: RenderDataEntry[], current: RenderDataEntry) => {
            const existingEntry = result.find(entry => entry.name == current.name);

            if (existingEntry) {
                Object.assign(existingEntry, current);
            } else {
                result.push(current);
            }

            return result;
        }, [] as RenderDataEntry[])
        .sort((a, b) => a.name - b.name)
}

const presetColors: { [country: string]: string } = {
    'Netherlands': '#FF7F00',
}

export const Plotter = () => {
    const [showIncomplete, setShowIncomplete] = useState<boolean>(false)
    const [dataSource, setDataSource] = useState<DataSource>(DataSource.Maths)
    const [selectedCountries, setSelectedCountries] = useState<string[]>([])
    const [countryColors, setCountryColors] = useState<{ [country: string]: string }>({});

    const data = useMemo(() => getData(dataSource), [dataSource])
    const dataToRender = useMemo(() => renderData(data, selectedCountries), [data, selectedCountries])

    // Make sure all selected countries have a color
    useMemo(() => {
        setCountryColors(c => {
            const newColors = {...c}

            selectedCountries.forEach((country) => {
                if (!newColors[country]) {
                    newColors[country] = presetColors[country] || randomColor({luminosity: 'bright'});
                }
            });

            return newColors;
        })
    }, [selectedCountries]);

    // Calculate min and max values for Y axis
    const dataMin = dataToRender.length > 0 ? Math.min(...dataToRender.map(v => Math.min(...selectedCountries.filter(c => v[c] != null).map(c => v[c] || 0)))) : 0
    const dataMax = dataToRender.length > 0 ? Math.max(...dataToRender.map(v => Math.max(...selectedCountries.filter(c => v[c] != null).map(c => v[c] || 0)))) : 0
    const dataMinRoundedToNearestTen = Math.floor(dataMin / 10) * 10
    const dataMaxRoundedToNearestTen = Math.ceil(dataMax / 10) * 10
    const dataRoundedRange = dataMaxRoundedToNearestTen - dataMinRoundedToNearestTen

    return (
        <>
            <div id="controls">
                <DataSourceSelector defaultValue={DataSource.Maths} onChange={ds => {
                    console.log("ds changed", ds)
                    if (ds != undefined) setDataSource(ds)
                }}/>
                <CountrySelector onChange={setSelectedCountries} showIncomplete={showIncomplete} data={data}/>
                <label
                    style={{userSelect: 'none'}}
                    title={"Show countries that do not have data for all years"}>
                    <input
                        type={"checkbox"}
                        onChange={e => setShowIncomplete(e.target.checked)}
                    /> Show incomplete data
                </label>
            </div>
            <ResponsiveContainer width="100%" height={500}>
                <LineChart data={dataToRender}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis
                        tickCount={dataRoundedRange / 8}
                        domain={[dataMinRoundedToNearestTen, dataMaxRoundedToNearestTen]}
                    />
                    <Tooltip/>
                    <Legend/>
                    {selectedCountries.map(v =>
                        <Line type="monotone"
                              dataKey={v}
                              key={v}
                              stroke={countryColors[v]}
                              strokeWidth={2}
                              connectNulls={true}/>
                    )}
                </LineChart>
            </ResponsiveContainer>
        </>
    )
}