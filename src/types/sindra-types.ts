export type Variable = {
    id: number;
    decimalPlaces?: number;
}

export type DatasetBrute = {
    NC: string;
    NN: string;
    MC: string;
    MN: string;
    V: string;
    D1C: string;
    D1N: string;
    D2C: string;
    D2N: string;
    D3C: string;
    D3N: string;
    D4C: string;
    D4N: string;
}


export interface DatasetGroupNode<T = any> {
    label: string;
    value: string;
    data: T;
}

export type DatasetProcessed = DatasetGroupNode<DatasetGroupNode<DatasetGroupNode<DatasetBrute[]>[]>[]>;

