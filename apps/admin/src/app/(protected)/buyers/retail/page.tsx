"use client";

import RetailBuyersTable from '@/components/buyers/retail/RetailBuyersTable';
import PageTitle from '@/components/common/PageTitle';
import fa from '@/i18n/fa';
import { Box } from '@mui/material';

const RetailBuyers = () => {
    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <PageTitle title={fa.retailBuyers}
            />
            <RetailBuyersTable />
        </Box>
    );
};

export default RetailBuyers;
