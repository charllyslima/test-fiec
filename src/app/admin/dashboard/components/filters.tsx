"use client";

import {useEffect, useState} from "react";
import SindraService from "@/services/sindra-service";
import FilterService from "@/services/filter-service";

const Filters = () => {
    const filterData = [
        { title: "Variável", content: "filter 01", id: "filter-1" },
        {
            title: "Classificação Nacional de Atividades Econômicas (CNAE 2.0)",
            content: "filter 02",
            id: "filter-2",
        },
        { title: "Unidade Territorial", content: "filter 03", id: "filter-3" },
    ];

    const [filtersStatus, setFiltersStatus] = useState([true, true, true]);


    const handleFilterChange = (index: number) => {
        setFiltersStatus((prev) =>
            prev.map((status, i) => (i === index ? !status : status))
        );
    };

    useEffect(() => {
        const filters1 = FilterService.getVariableFilters();
        const filters2 = FilterService.getYearFilters();
        const filters3 = FilterService.getCnaeFilters();
        console.log(filters1);
        console.log(filters2);
        console.log(filters3);
    }, []);

    return (
        <div className="grid grid-cols-3 gap-4">
            {filterData.map((filter, index) => (
                <div key={filter.id}>
                    <div className="collapse bg-base-100 border-base-300 border">
                        <input
                            type="checkbox"
                            id={filter.id}
                            checked={filtersStatus[index]}
                            onChange={() => handleFilterChange(index)}
                            className="peer"
                        />
                        <div className="collapse-title font-semibold">{filter.title}</div>
                        <div className="collapse-content text-sm">{filter.content}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Filters;
