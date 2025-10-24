"use client";

import WholeBuyersTable from '@/components/buyers/wholesale/WholeBuyersTable';
import PageTitle from '@/components/common/PageTitle';
import fa from '@/i18n/fa';
import { Box } from '@mui/material';

const WholeSaleBuyers = () => {
    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <PageTitle title={fa.wholeBuyers}
            />
            <WholeBuyersTable />
        </Box>
    );
};

export default WholeSaleBuyers;
