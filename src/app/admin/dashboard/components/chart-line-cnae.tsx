import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { DatasetBrute } from "@/types/sindra-types";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartLineCnaeProps {
    data: DatasetBrute[];
    title?: string;
    group: string;
}

const ChartLineCnae = ({ data, title, group }: ChartLineCnaeProps) => {
    const anoMap: Record<string, Record<string, number>> = {};
    const cnaesSet: Set<string> = new Set();

    data.forEach(item => {
        const ano = item.D3N;
        const cnae = item.D4N;
        const valor = Number(item.V);

        if(item.D2C !== group) return

        if (!anoMap[ano]) anoMap[ano] = {};
        anoMap[ano][cnae] = valor;
        cnaesSet.add(cnae);
    });

    const anosOrdenados = Object.keys(anoMap).sort((a, b) => Number(a) - Number(b));
    const cnaesOrdenados = Array.from(cnaesSet);
    const datasets = cnaesOrdenados.map(cnae => {
        return {
            label: cnae,
            data: anosOrdenados.map(ano => anoMap[ano]?.[cnae] || 0),
            backgroundColor: 'rgb(96, 93, 255)',
            fill: false,
            tension: 0.3,
        };
    });

    const chartData = {
        labels: anosOrdenados,
        datasets,
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: !!title,
                text: title || "Evolução de CNAEs ao longo dos anos",
            },
        },
    };

    return (
        <div className="bg-base-100 border rounded-box p-4 w-full">
            <Line data={chartData} options={options} />
        </div>
    );
};

export default ChartLineCnae;