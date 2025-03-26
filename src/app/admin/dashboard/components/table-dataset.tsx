import {DatasetBrute, DatasetProcessed} from "@/types/sindra-types";
import React from "react";
import {FaCircleInfo} from "react-icons/fa6";
import {formatterNumber} from "@/utils/formatter";
import ChartLineCnae from "@/app/admin/dashboard/components/chart-line-cnae";
import ChartBarCnae from "@/app/admin/dashboard/components/chart-bar-cnae";


interface TableDatasetProps {
    rows: DatasetProcessed[];
    dataBrute: DatasetBrute[];
}

const TableDataset: React.FC<TableDatasetProps> = ({rows, dataBrute}) => {
    if (rows === undefined || rows.length === 0) return
    //TODO: FAZER O PRIMEIRO JÁ VIR ABERTO
    return rows.map((item) => {
        return <div className={`collapse collapse-arrow bg-base-200 border border-base-300 my-3`} key={item.value}>
            <input type="radio" name="my-accordion-2"/>
            <div className="collapse-title font-semibold">{item.label}</div>
            <div className="collapse-content text-sm flex flex-col lg:flex-row space-y-3 justify-between">
                <div className="flex flex-wrap flex-1">
                   <div className="w-full h-full space-y-3 space-x-3">
                       <ChartLineCnae data={dataBrute.slice(1)} title={`Evolução ao longo dos anos`}  group={item.value}/>
                       <ChartBarCnae data={item} />
                   </div>
                </div>
                <ul className="timeline timeline-vertical flex-1">
                    {item.data.map((item) => {
                        return <li key={item.value}>
                            <hr/>
                            <div className="timeline-start text-4xl">{item.label}</div>
                            <div className="timeline-middle">
                                <FaCircleInfo/>
                            </div>
                            <div className="timeline-end timeline-box">
                                <div className="overflow-x-auto">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>CNAE</th>
                                            <th>Valor</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {item.data.map((item) => {
                                            return <tr className="hover:bg-base-300" key={item.value}>
                                                <th>{item.label}</th>
                                                <td>{formatterNumber.format(Number(item.data[0].V))}</td>
                                            </tr>
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <hr/>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    });

}

export default TableDataset;