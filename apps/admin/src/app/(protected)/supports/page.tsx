import PageTitle from '@/components/common/PageTitle';
import SupportsTable from '@/components/supports/SupportsTable';
import fa from '@/i18n/fa';

const Supports = () => {
    return (
        <>
            <PageTitle title={fa.supports} />
            <SupportsTable />
        </>)
}

export default Supports