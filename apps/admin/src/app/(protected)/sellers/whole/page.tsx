import PageTitle from '@/components/common/PageTitle';
import WholeSellersTable from '@/components/sellers/whole/WholeSellersTable';
import fa from '@/i18n/fa';
import Box from '@mui/material/Box';

const RetailSellers = () => {
    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>

            <PageTitle title={fa.wholeSellers}
            />
            <WholeSellersTable />
        </Box>

    )
}

export default RetailSellers