import PageTitle from '@/components/common/PageTitle';
import ActivityTable from '@/components/supports/activity/ActivityTable';
import fa from '@/i18n/fa';
import { Box } from '@mui/material';

const SupportsActivity = () => {
    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <PageTitle title={fa.activity}
            />
            <ActivityTable />
        </Box>
    )
}

export default SupportsActivity