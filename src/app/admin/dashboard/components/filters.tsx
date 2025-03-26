"use client";

import React, {useEffect, useState} from "react";
import FilterService from "@/services/filter-service";
import FilterVariable from "@/app/admin/dashboard/components/filter-variable";
import {DatasetBrute, DatasetProcessed, Variable} from "@/types/sindra-types";
import FilterYear from "@/app/admin/dashboard/components/filter-year";
import FilterCnae from "@/app/admin/dashboard/components/filter-cnae";
import SindraService from "@/services/sindra-service";
import toast, {Toaster} from "react-hot-toast";
import {processInformation} from "@/utils/processors";
import TableDataset from "@/app/admin/dashboard/components/table-dataset";
import {FaInfoCircle} from "react-icons/fa";


const Filters = () => {
    const [datasetFilterVariable, setDatasetFilterVariable] = useState([]);
    const [datasetFilterCnae, setDatasetFilterCnae] = useState([]);
    const [datasetFilterYear, setDatasetFilterYear] = useState([]);

    const [filterVariable, setFilterVariable] = useState<Variable[]>([]);
    const [filterCnae, setFilterCnae] = useState<number[]>([]);
    const [filterYear, setFilterYear] = useState<number[]>([]);

    const [processedData, setProcessedData] = useState<DatasetProcessed[]>([]);
    const [dataBrute, setDataBrute] = useState<DatasetBrute[]>([]);
    const [loading, setLoading] = useState(false);


    const filterData = [
        {
            title: "Variável",
            content: (
                <FilterVariable
                    filters={datasetFilterVariable}
                    filter={filterVariable}
                    setFilter={setFilterVariable}
                />
            ),
            id: "filter-1",
        },
        {
            title: "Classificação Nacional de Atividades Econômicas (CNAE 2.0)",
            content: <FilterCnae filters={datasetFilterCnae} setFilter={setFilterCnae}/>,
            id: "filter-2",
        },
        {
            title: "Unidade Territorial",
            content: <FilterYear filters={datasetFilterYear} setFilter={setFilterYear}/>,
            id: "filter-3",
        },
    ];

    const [filtersStatus, setFiltersStatus] = useState([true, true, true]);

    const handleFilterChange = (index: number) => {
        setFiltersStatus((prev) =>
            prev.map((status, i) => (i === index ? !status : status))
        );
    };

    useEffect(() => {
        FilterService.getVariableFilters().then(setDatasetFilterVariable);
        FilterService.getYearFilters().then(setDatasetFilterYear);
        FilterService.getCnaeFilters().then(setDatasetFilterCnae);
    }, []);

    const hasFilters =
        filterVariable.length > 0 && filterCnae.length > 0 && filterYear.length > 0;
    const filtersKey = JSON.stringify({filterVariable, filterCnae, filterYear});

    useEffect(() => {
        if (!hasFilters) return;

        setLoading(true);
        toast.promise(
            SindraService.fetchData({
                variablesList: filterVariable,
                cnaeList: filterCnae,
                yearsList: filterYear,
            })
                .then((data) => {
                    setDataBrute(data);
                    setProcessedData(processInformation(data));
                })
                .catch(() => {
                    toast.error("Não foi possível realizar a busca.");
                })
                .finally(() => {
                    setLoading(false);
                }),
            {
                loading: "Carregando...",
                success: "Busca realizada com sucesso!",
                error: "Erro ao realizar a busca.",
            }
        );
    }, [filterCnae, filterVariable, filterYear, filtersKey, hasFilters]);

    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <Toaster position="bottom-center" reverseOrder={false}/>

            {filterData.map((filter, index) => (
                <div key={filter.id} className={` col-span-2 lg:col-span-1`}>
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


            <div className={`card bg-base-100 rounded-lg h-full col-span-3 p-3 overflow-y-auto`}>
                {!loading && processedData && processedData.length > 0 ?
                        <TableDataset rows={processedData} dataBrute={dataBrute}/>
                    : (!loading &&
                        <div role="alert" className="alert alert-info alert-soft">
                            <FaInfoCircle/>
                            <span>Preencha os filtros para buscar</span>
                        </div>
                    )}
                {loading && (
                    <div className="text-center col-span-3">
                        <span className="loading loading-dots loading-lg"></span>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Filters;