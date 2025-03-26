import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { DatasetGroupNode, DatasetBrute } from "@/types/sindra-types";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartBarCnaeProps {
    data: DatasetGroupNode<DatasetGroupNode<DatasetGroupNode<DatasetBrute[]>[]>[]>;
}

const ChartBarCnae = ({ data }: ChartBarCnaeProps) => {
    // Agrupar como: { cnae: valorTotalSomado }
    const cnaeTotals: Record<string, number> = {};

    data.data.forEach((ano) => {
        ano.data.forEach((cnae) => {
            const valorTotal = cnae.data.reduce((acc, item) => acc + parseFloat(item.V), 0);
            if (!cnaeTotals[cnae.label]) cnaeTotals[cnae.label] = 0;
            cnaeTotals[cnae.label] += valorTotal;
        });
    });

    const cnaesOrdenados = Object.keys(cnaeTotals);
    const chartData = {
        labels: cnaesOrdenados,
        datasets: [
            {
                label: data.label,
                data: cnaesOrdenados.map((cnae) => cnaeTotals[cnae]),
                backgroundColor: 'rgb(96, 93, 255)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: `Total por CNAE: ${data.label}`,
            },
        },
    };

    return (
        <div className="bg-base-100 border rounded-box p-4">
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default ChartBarCnae;
