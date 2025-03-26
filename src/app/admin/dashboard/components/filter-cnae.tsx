import React, { useState, useEffect, SetStateAction, Dispatch } from "react";

interface Filter {
    sidraId: number;
    name: string;
    checked?: boolean;
}

interface FilterCnaeProps {
    filters: Filter[];
    setFilter: Dispatch<SetStateAction<number[]>>;
}

const FilterCnae: React.FC<FilterCnaeProps> = ({ filters, setFilter }) => {
    const [selectedFilters, setSelectedFilters] = useState<Filter[]>(filters);
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        setSelectedFilters(filters);
    }, [filters]);

    const handleCheckboxChange = (sidraId: number) => {
        // Atualiza o estado de selectedFilters com base na alteração do checkbox
        const updatedFilters = selectedFilters.map((filter) =>
            filter.sidraId === sidraId
                ? { ...filter, checked: !filter.checked } // Alterna o valor de checked
                : filter
        );

        setSelectedFilters(updatedFilters);

        const selectedIds = updatedFilters
            .filter((filter) => filter.checked)
            .map((filter) => filter.sidraId);
        setFilter(selectedIds);
    };

    const handleMarkAll = () => {
        const updatedFilters = selectedFilters.map((filter) => ({
            ...filter,
            checked: true,
        }));
        setSelectedFilters(updatedFilters);
        setFilter(updatedFilters.map((filter) => filter.sidraId)); // Marca todos os filtros
    };

    const handleUnmarkAll = () => {
        const updatedFilters = selectedFilters.map((filter) => ({
            ...filter,
            checked: false,
        }));
        setSelectedFilters(updatedFilters);
        setFilter([]);
    };

    const filteredFilters = selectedFilters.filter((filter) =>
        filter.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Pesquisar por nome"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input input-bordered w-full"
                />
            </div>

            <div className="flex flex-col space-x-4 space-y-3 md:space-y-0 mb-4 md:flex-row">
                <button className="btn btn-primary w-full md:w-auto" onClick={handleMarkAll}>
                    Marcar Todos
                </button>
                <button className="btn btn-secondary w-full md:w-auto" onClick={handleUnmarkAll}>
                    Desmarcar Todos
                </button>
            </div>
            <hr className="my-3"/>
            <div className="space-y-3 h-[200px] overflow-y-auto">
                {filteredFilters.map((filter) => (
                    <div key={filter.sidraId} className="space-y-2">
                        <div>
                            <label className="text-sm space-x-2 flex">
                                <input
                                    id={filter.sidraId.toString()}
                                    type="checkbox"
                                    checked={filter.checked || false}
                                    className="checkbox checkbox-primary"
                                    onChange={() => handleCheckboxChange(filter.sidraId)}
                                />
                                <p>{filter.name}</p>
                            </label>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterCnae;
