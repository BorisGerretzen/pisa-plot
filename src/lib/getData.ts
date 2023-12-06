import {DataSource} from "./DataSource.ts";

import dataMaths from '../assets/pisa_math.json'
import dataScience from '../assets/pisa_science.json'
import dataReading from '../assets/pisa_reading.json'
import {DataSourceRow} from "./dataSourceRow.ts";

export const getData = (dataSource: DataSource): DataSourceRow[] => {
    switch (dataSource) {
        case DataSource.Maths:
            return dataMaths;
        case DataSource.Science:
            return dataScience;
        case DataSource.Reading:
            return dataReading;
    }
}