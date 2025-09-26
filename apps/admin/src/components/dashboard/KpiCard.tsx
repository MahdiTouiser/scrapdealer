import React from 'react';

import {
  Box,
  Paper,
  Typography,
} from '@mui/material';

interface KpiCardProps {
    title: string;
    value: string | number;
    color?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, color = '#1976d2' }) => {
    return (
        <Paper
            sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: 3,
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                bgcolor: 'background.paper',
                position: 'relative',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
                },
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: 4,
                    borderRadius: '3px 3px 0 0',
                    bgcolor: color,
                }}
            />

            <Typography
                variant="subtitle1"
                sx={{
                    mb: 1,
                    fontWeight: 500,
                    fontFamily: 'Vazirmatn, sans-serif',
                    color: 'text.secondary',
                }}
            >
                {title}
            </Typography>

            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    fontFamily: 'Vazirmatn, sans-serif',
                    color: 'text.primary',
                }}
            >
                {value}
            </Typography>
        </Paper>
    );
};

export default KpiCard;
