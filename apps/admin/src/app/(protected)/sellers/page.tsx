import PageTitle from '@/components/common/PageTitle';
import SellerTable from '@/components/sellers/SellerTable';
import fa from '@/i18n/fa';
import { Box } from '@mui/material';

const Sellers = () => {
    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <PageTitle title={fa.sellers} />
            <SellerTable />
        </Box>

    );
};

export default Sellers;
