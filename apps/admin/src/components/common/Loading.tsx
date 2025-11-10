'use client';

import {
    Box,
    CircularProgress,
    Typography,
} from '@mui/material';

const Loading = ({ label = 'در حال بارگذاری...' }: { label?: string }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="60vh"
            sx={{
                color: 'text.secondary',
                gap: 2,
            }}
        >
            <CircularProgress size={48} thickness={4} color="primary" />
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {label}
            </Typography>
        </Box>
    );
};

export default Loading;
