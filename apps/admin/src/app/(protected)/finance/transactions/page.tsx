"use client";

import React, { useState } from 'react';

import PageTitle from '@/components/common/PageTitle';
import TransactionsTable from '@/components/dashboard/TransactionsTable';
import {
    Transaction,
} from '@/components/finance/transactions/TransactionsTable';
import fa from '@/i18n/fa';
import { Box } from '@mui/material';

const TransactionsPage: React.FC = () => {
    const [transactions] = useState<Transaction[]>([
        { id: 1, date: "2025-10-25", user: "mehdi123", amount: 250000, type: "واریز", status: "موفق" },
        { id: 2, date: "2025-10-24", user: "sara_m", amount: 500000, type: "برداشت", status: "ناموفق" },
        { id: 3, date: "2025-10-23", user: "ali_r", amount: 120000, type: "واریز", status: "موفق" },
        { id: 4, date: "2025-10-22", user: "negar_m", amount: 300000, type: "برداشت", status: "موفق" },
    ]);

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <PageTitle title={fa.transactions}
            />
            <TransactionsTable data={transactions} />
        </Box>
    );
};

export default TransactionsPage;
