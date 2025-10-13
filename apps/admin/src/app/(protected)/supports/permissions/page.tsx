import PageTitle from '@/components/common/PageTitle';
import PermissionsTable from '@/components/supports/permissions/PermissionsTable';
import fa from '@/i18n/fa';
import { Box } from '@mui/material';

const page = () => {
    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <PageTitle title={fa.permissionLevel}
            />
            <PermissionsTable />
        </Box>
    )
}

export default page