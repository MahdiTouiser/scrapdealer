"use client";

import WholeSaleTable from '@/components/buyers/wholesale/WholeSaleTable';
import PageTitle from '@/components/common/PageTitle';
import fa from '@/i18n/fa';
import { Box } from '@mui/material';

const WholeSaleBuyers = () => {
    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <PageTitle title={fa.wholeSaleBuyers}
            />
            <WholeSaleTable />
        </Box>
    );
};

export default WholeSaleBuyers;
