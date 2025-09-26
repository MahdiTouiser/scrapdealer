import BuyerTable from '@/components/buyers/BuyerTable';
import fa from '@/i18n/fa';

export default function DashboardPage() {
    return (
        <main style={{ padding: "20px" }}>
            <h1>{fa.buyers}</h1>
            <BuyerTable />
        </main>
    );
}
