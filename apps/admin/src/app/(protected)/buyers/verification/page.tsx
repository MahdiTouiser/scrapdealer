"use client";

import React from 'react';

import VerificationTable
  from '@/components/buyers/verification/VerificationTable';
import PageTitle from '@/components/common/PageTitle';
import fa from '@/i18n/fa';
import {
  Box,
  Typography,
} from '@mui/material';

const BuyersVerification: React.FC = () => {
    return (
        <Box sx={{ p: 3 }}>
            <PageTitle title={fa.verificationBuyers} />

            <Typography variant="body1" color="text.secondary" mb={3}>
                در این بخش می‌توانید مدارک و وضعیت حساب خریداران را مشاهده، بررسی و تأیید کنید.
            </Typography>

            <VerificationTable />
        </Box>
    );
};

export default BuyersVerification;
