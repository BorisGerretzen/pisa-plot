import Select from 'react-select';
import {DataSource} from "../lib/DataSource.ts";

type DataSourceSelectorProps = {
    onChange?: (dataSource?: DataSource) => void
    defaultValue?: DataSource
}


export const DataSourceSelector = (props: DataSourceSelectorProps) => {
    const options = [
        {value: DataSource.Maths, label: "Maths"},
        {value: DataSource.Science, label: "Science"},
        {value: DataSource.Reading, label: "Reading"}
    ]
    return <>
        <Select
            defaultValue={props.defaultValue != null ? options.find(v => v.value == props.defaultValue) : undefined}
            placeholder={"Select a data source"}
            options={options}
            onChange={e => {
                props.onChange?.(e?.value)
            }}/>
    </>
}