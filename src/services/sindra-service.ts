import httpClient from "@/services/http-client";
import {Variable} from "@/types/sindra-types";

interface SindraParams {
    variablesList: Variable[];
    cnaeList: number[];
    yearsList: number[];
}


class SindraService {
    static BASE_URL = "https://apisidra.ibge.gov.br";

    static fetchData = async (params: SindraParams) => {
        // OTIMIZAÇÕES FIXAS DEVIDO AO TEMPO
        const strVariables = params.variablesList.length === 28 ? 'all' : this.listVariableToString(params.variablesList);
        const strYears = params.yearsList.length === 16?'all':this.listToString(params.yearsList);
        const strCnae = params.cnaeList.length === 143?'all':this.listToString(params.cnaeList);


        const existsDecimalFilter = params.variablesList.some((item) => item.decimalPlaces !== undefined);
        let url = `/values/t/1842/n1/all/v/${strVariables}/p/${strYears}/c12762/${strCnae}`;
        if (existsDecimalFilter) {
            url += `/d/${this.listVariableToString(params.variablesList, true)}`;
        }


        try {
            return await httpClient.get(url);
        } catch (error) {

            console.error("Erro ao enviar dados:", error);
        }
    };


    private static listToString = (list: number[] | string[]) => {
        return list.join(",");
    }

    private static listVariableToString = (list: Variable[], decimalFilter: boolean = false) => {
        if (decimalFilter) {
            return list
                .filter(item => item.decimalPlaces !== undefined)
                .map((item) => `v${item.id}%20${item.decimalPlaces}`).join(",");
        }
        return list.map((item) => item.id).join(",");
    }

}

export default SindraService;
