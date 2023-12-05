import myData from "./assets/pisa_math.json";
import {useMemo} from "react";
import Select from 'react-select';

interface CountrySelectorProps {
    onChange: (value: string[]) => void
}

export const CountrySelector = (props: CountrySelectorProps) => {
    const data = myData

    const options = useMemo(() => data.map(v => {
        return {value: v.Jurisdiction, label: v.Jurisdiction}
    }), [data])

    return (
        <>
            <Select
                isMulti
                name="colors"
                options={options}
                onChange={e => {
                    props.onChange(Array.from(e.map(v => v.value)))
                }}
                className="basic-multi-select"
                classNamePrefix="select"
            />
        </>
    )
}