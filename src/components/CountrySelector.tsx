import Select from 'react-select';
import {DataSourceRow} from "../lib/dataSourceRow.ts";

interface CountrySelectorProps {
    onChange: (value: string[]) => void,
    showIncomplete?: boolean
    data: DataSourceRow[]
}

export const CountrySelector = (props: CountrySelectorProps) => {
    const options = props.data
        .filter(v => props.showIncomplete || v.data.every(row => row.Average != null))
        .map(v => {
            return {value: v.Jurisdiction, label: v.Jurisdiction}
        })

    return (
        <>
            <Select
                isMulti
                options={options}
                placeholder={"Select countries..."}
                onChange={e => {
                    props.onChange(Array.from(e.map(v => v.value)))
                }}
            />
        </>
    )
}