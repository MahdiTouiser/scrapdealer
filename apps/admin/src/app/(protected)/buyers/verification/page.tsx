"use client";

import React from 'react';

import BuyersVerificationTable from '@/components/buyers/verification/BuyersVerificationTable';
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
        {fa.seeBuyersVerifications}
      </Typography>

      <BuyersVerificationTable />
    </Box>
  );
};

export default BuyersVerification;
