import {CountrySelector} from "./CountrySelector.tsx";
import {useState} from "react";
import myData from "./assets/pisa_math.json";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";

type RenderDataEntry = {
    name: number,
    [key: string]: number | null
}

function App() {
    const [selectedCountries, setSelectedCountries] = useState<string[]>([])

    const dataToRender = myData
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
        .sort((a, b) => a.name - b.name);
    console.log(dataToRender);
    return (
        <>
            <CountrySelector onChange={setSelectedCountries}/>
            <LineChart width={400} height={400} data={dataToRender}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                    domain={['dataMin - 100', 'dataMax + 100']}
                />
                <Tooltip />
                <Legend />
                {selectedCountries.map(v => <Line type="monotone" dataKey={v} />)}
            </LineChart>
        </>
    )
}

export default App
