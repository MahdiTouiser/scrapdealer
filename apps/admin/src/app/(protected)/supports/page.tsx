import PageTitle from '@/components/common/PageTitle';
import SupportsTable from '@/components/supports/SupportsTable';
import fa from '@/i18n/fa';
import { Box } from '@mui/material';

const Supports = () => {
    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <PageTitle title={fa.supports} />
            <SupportsTable />
        </Box>
    )
}

export default Supports