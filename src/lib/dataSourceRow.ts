export type DataSourceRow = {
    Jurisdiction: string;
    data: {
        Year: number;
        Average: number | null;
    }[];
}