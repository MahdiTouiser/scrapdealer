"use client";

import BuyerTable from '@/components/buyers/BuyerTable';
import PageTitle from '@/components/common/PageTitle';
import fa from '@/i18n/fa';
import { Box } from '@mui/material';

const Buyers = () => {
    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <PageTitle title={fa.buyers}
            />
            <BuyerTable />
        </Box>
    );
};

export default Buyers;
