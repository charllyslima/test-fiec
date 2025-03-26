import React, { useState, useEffect, SetStateAction, Dispatch } from "react";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { Variable } from "@/types/sindra-types";

interface Filter {
    sidraId: number;
    minDecimalPlaces: number;
    maxDecimalPlaces: number;
    name: string;
    checked?: boolean;
    currentDecimalPlaces?: number;
}

interface FilterVariableProps {
    filters: Filter[];
    filter: Variable[];
    setFilter: Dispatch<SetStateAction<Variable[]>>;
}

const castToCategory = (el: Filter[]): Variable[] => {
    return el.map((filter) => ({
        id: filter.sidraId,
        decimalPlaces: filter.maxDecimalPlaces ? filter.currentDecimalPlaces : undefined,
    }));
};

const FilterVariable: React.FC<FilterVariableProps> = ({ filters, setFilter }) => {
    const [selectedFilters, setSelectedFilters] = useState<Filter[]>(filters);
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        const updatedFilters = filters.map((filter) => ({
            ...filter,
            currentDecimalPlaces: filter.minDecimalPlaces || 2,
        }));
        setSelectedFilters(updatedFilters);
    }, [filters]);

    const handleCheckboxChange = (sidraId: number) => {
        const updatedFilters = selectedFilters.map((filter) =>
            filter.sidraId === sidraId ? { ...filter, checked: !filter.checked } : filter
        );
        setSelectedFilters(updatedFilters);
        setFilter(castToCategory(updatedFilters.filter((el) => el.checked === true)));
    };

    const incrementDecimalPlaces = (sidraId: number) => {
        const updatedFilters = selectedFilters.map((filter) =>
            filter.sidraId === sidraId && (filter.currentDecimalPlaces ?? 0) < filter.maxDecimalPlaces
                ? { ...filter, currentDecimalPlaces: (filter.currentDecimalPlaces ?? 0) + 1 }
                : filter
        );
        setSelectedFilters(updatedFilters);
        setFilter(castToCategory(updatedFilters.filter((el) => el.checked === true)));
    };

    const decrementDecimalPlaces = (sidraId: number) => {
        const updatedFilters = selectedFilters.map((filter) =>
            filter.sidraId === sidraId && (filter.currentDecimalPlaces ?? 0) > filter.minDecimalPlaces
                ? { ...filter, currentDecimalPlaces: (filter.currentDecimalPlaces ?? 0) - 1 }
                : filter
        );
        setSelectedFilters(updatedFilters);
        setFilter(castToCategory(updatedFilters.filter((el) => el.checked === true)));
    };

    const handleMarkAll = () => {
        const updatedFilters = selectedFilters.map((filter) => ({
            ...filter,
            checked: true,
        }));
        setSelectedFilters(updatedFilters);
        setFilter(castToCategory(updatedFilters.filter((el) => el.checked === true)));
    };

    const handleUnmarkAll = () => {
        const updatedFilters = selectedFilters.map((filter) => ({
            ...filter,
            checked: false,
        }));
        setSelectedFilters(updatedFilters);
        setFilter(castToCategory(updatedFilters.filter((el) => el.checked === true)));
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
            <hr className={`my-3`}/>
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
                        {filter.maxDecimalPlaces && filter.checked && (
                            <div className="flex space-x-2 items-center text-gray-400">
                                <button
                                    className="btn btn-sm btn-soft btn-primary"
                                    onClick={() => decrementDecimalPlaces(filter.sidraId)}
                                >
                                    <FaMinusSquare />
                                </button>
                                <p>
                                    {filter.currentDecimalPlaces} de {filter.maxDecimalPlaces}
                                </p>
                                <button
                                    className="btn btn-sm btn-soft btn-primary"
                                    onClick={() => incrementDecimalPlaces(filter.sidraId)}
                                >
                                    <FaPlusSquare />
                                </button>
                                <p>casas decimais</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterVariable;
