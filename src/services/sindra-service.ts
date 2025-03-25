import httpClient from "@/services/http-client";

interface SindraParams {
    variablesList: Category[];
    cnaeList: number[];
    yearsList: number[];
}

type Category = {
    id: number;
    decimalPlaces?: number;
}

class SindraService {
    static BASE_URL = "https://apisidra.ibge.gov.br";

    static fetchData = async (params: SindraParams) => {

        const existsDecimalFilter = params.variablesList.some((item) => item.decimalPlaces !== undefined);
        let url = `/values/t/1842/n1/all/v/${params.variablesList}/${this.listToString(params.cnaeList)}/p/${this.listToString(params.yearsList)}/c12762/117897`;
        if(existsDecimalFilter){
            url += `/d/${this.listCategoryToString(params.variablesList, true)}`;
        }


        try {
            const data = await httpClient.get(url);
            console.log(data);
        } catch (error) {
            console.error("Erro ao enviar dados:", error);
        }
    };

    static fetchDataFilters = async () => {
        try {
            const data = await httpClient.get("/Ajax/JSon/Tabela/1/1842?versao=-1&_=1742862516711", {}, 'https://sidra.ibge.gov.br');
            console.log(data);
        } catch (error) {
            console.error("Erro ao enviar dados:", error);
        }
    }

    private static listToString = (list: number[] | string[]) => {
        return list.join(",");
    }

    private static listCategoryToString = (list: Category[], decimalFilter: boolean = false) => {
        if (decimalFilter) {
            return list.map((item) => `${item.id}%${item.decimalPlaces}`).join(",");
        }
        return list.map((item) => item.id).join(",");
    }

}

export default SindraService;
