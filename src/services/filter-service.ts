class FilterService {
    static async getVariableFilters() {
        try {
            const response = await fetch("/api/filters/variable");
            const data = await response.json();

            return data;
        } catch (error) {
            console.error("Erro ao buscar filtros de variável:", error);
            throw new Error("Erro ao buscar filtros de variável");
        }
    }

    static async getYearFilters() {
        try {
            const response = await fetch("/api/filters/year");
            const data = await response.json();

            return data.yearFilters;
        } catch (error) {
            console.error("Erro ao buscar filtros de ano:", error);
            throw new Error("Erro ao buscar filtros de ano");
        }
    }

    static async getCnaeFilters() {
        try {
            const response = await fetch("/api/filters/cnae");
            const data = await response.json();

            return data.cnaeFilters;
        } catch (error) {
            console.error("Erro ao buscar filtros de CNAE:", error);
            throw new Error("Erro ao buscar filtros de CNAE");
        }
    }
}

export default FilterService;
