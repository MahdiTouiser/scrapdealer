import ReviewedAdminRequestsTable
  from '@/components/admin-requests/reviewed/ReviewedAdminRequestsTable';
import PageTitle from '@/components/common/PageTitle';
import fa from '@/i18n/fa';
import { Box } from '@mui/material';

const ReviewedAdminRequests = () => {
    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <PageTitle title={fa.reviewedRequests}
            />
            <ReviewedAdminRequestsTable />
        </Box>
    )
}

export default ReviewedAdminRequests