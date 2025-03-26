import Filters from "@/app/admin/dashboard/components/filters";
import TableDataset from "@/app/admin/dashboard/components/table-dataset";

export default function Dashboard() {


    return (
        <div className={`space-y-3`}>
            <Filters/>
            <TableDataset/>
        </div>
    );
}
