"use client";

import BuyerTable from '@/components/buyers/BuyerTable';
import fa from '@/i18n/fa';
import {
  Box,
  Typography,
} from '@mui/material';

const Buyers = () => {
    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Typography
                variant="h4"
                component="h1"
                sx={{ mb: 3, fontWeight: 700 }}
            >
                {fa.buyers}
            </Typography>
            <BuyerTable />
        </Box>
    );
};

export default Buyers;
