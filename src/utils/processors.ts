import {DatasetBrute, DatasetProcessed} from "@/types/sindra-types";

export const processInformation = (dataset: DatasetBrute[]): DatasetProcessed[] => {
    const data = dataset.slice(1); // ignora cabeçalho
    const grouped: Record<string, any> = {};

    data.forEach(item => {
        const variable = item.D2C;
        const labelVariable = item.D2N;
        const year = item.D3C;
        const labelYear = item.D3N;
        const cnae = item.D4C;
        const labelCnae = item.D4N;
        const unit = item.MN;

        if (!grouped[variable]) {
            grouped[variable] = {
                label: `${labelVariable} (${unit})`,
                value: variable,
                data: {},
            };
        }

        if (!grouped[variable].data[year]) {
            grouped[variable].data[year] = {
                label: labelYear,
                value: year,
                data: {},
            };
        }

        if (!grouped[variable].data[year].data[cnae]) {
            grouped[variable].data[year].data[cnae] = {
                label: labelCnae,
                value: cnae,
                data: [],
            };
        }

        grouped[variable].data[year].data[cnae].data.push(item);
    });

    return Object.values(grouped).map(variable => ({
        label: variable.label,
        value: variable.value,
        data: Object.values(variable.data).map((year: any) => ({
            label: year.label,
            value: year.value,
            data: Object.values(year.data).map((cnae: any) => ({
                label: cnae.label,
                value: cnae.value,
                data: cnae.data
            }))
        }))
    }));
};
