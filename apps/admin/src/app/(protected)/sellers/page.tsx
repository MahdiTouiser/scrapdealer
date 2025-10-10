import PageTitle from '@/components/common/PageTitle';
import SellerTable from '@/components/sellers/SellerTable';
import fa from '@/i18n/fa';

const Sellers = () => {
    return (
        <>
            <PageTitle title={fa.sellers} />
            <SellerTable />
        </>

    );
};

export default Sellers;
