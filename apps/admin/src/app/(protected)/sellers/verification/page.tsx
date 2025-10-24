'use client';

import PageTitle from '@/components/common/PageTitle';
import SellersVerificationTable from '@/components/sellers/verification/SellersVerificationTable';
import fa from '@/i18n/fa';
import {
    Box,
    Typography,
} from '@mui/material';

const VendorVerificationPage = () => {
    return (
        <Box sx={{ p: 3 }}>
            <PageTitle title="احراز هویت فروشندگان" />
            <Typography variant="body1" color="text.secondary" mb={3}>
                {fa.seeSellersVerifications}
            </Typography>
            <SellersVerificationTable />
        </Box>
    );
};

export default VendorVerificationPage;
