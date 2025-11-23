"use client";

import React from 'react';

import PageTitle from '@/components/common/PageTitle';
import InvoicesTable from '@/components/finance/invoices/InvoicesTable';
import fa from '@/i18n/fa';
import { Box } from '@mui/material';

const Invoices: React.FC = () => {


    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <PageTitle title={fa.invoices}
            />
            <InvoicesTable />
        </Box>
    );
};

export default Invoices;
