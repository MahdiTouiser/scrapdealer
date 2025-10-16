"use client";

import RetailTable from '@/components/buyers/retail/RetailTable';
import PageTitle from '@/components/common/PageTitle';
import fa from '@/i18n/fa';
import { Box } from '@mui/material';

const RetailBuyers = () => {
    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <PageTitle title={fa.retailBuyers}
            />
            <RetailTable />
        </Box>
    );
};

export default RetailBuyers;
