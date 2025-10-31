import NewAdminRequestsTable
  from '@/components/admin-requests/new/NewAdminRequestsTable';
import PageTitle from '@/components/common/PageTitle';
import fa from '@/i18n/fa';
import { Box } from '@mui/material';

const NewAdminRequests = () => {
    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <PageTitle title={fa.newRequests}
            />
            <NewAdminRequestsTable />
        </Box>)
}

export default NewAdminRequests