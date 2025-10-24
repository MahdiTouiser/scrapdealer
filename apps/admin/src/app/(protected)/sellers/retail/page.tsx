import PageTitle from '@/components/common/PageTitle';
import RetailSellersTable from '@/components/sellers/retail/RetailSellersTable';
import fa from '@/i18n/fa';
import Box from '@mui/material/Box';

const RetailSellers = () => {
    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>

            <PageTitle title={fa.retailSellers}
            />
            <RetailSellersTable />
        </Box>

    )
}

export default RetailSellers