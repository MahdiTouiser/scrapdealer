import FixedLocationBuyersTable
  from '@/components/buyers/fixed-location/FixedLocationBuyers';
import PageTitle from '@/components/common/PageTitle';
import fa from '@/i18n/fa';
import { Box } from '@mui/material';

const FixedLocationBuyers: React.FC = () => {
    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <PageTitle title={fa.fixedLocationBuyers}
            />
            <FixedLocationBuyersTable />
        </Box>
    )
}

export default FixedLocationBuyers