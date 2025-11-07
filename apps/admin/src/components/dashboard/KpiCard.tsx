import React from 'react';

import {
    Box,
    Paper,
    Typography,
    useTheme,
} from '@mui/material';

interface KpiCardProps {
    title: string;
    value: string | number;
    color?: string;
}

const toPersianDigits = (value: string | number): string => {
    if (typeof value === 'number') {
        return value.toLocaleString('fa-IR');
    }
    return value.replace(/\d/g, (digit) =>
        '۰۱۲۳۴۵۶۷۸۹'[parseInt(digit, 10)]
    );
};

const KpiCard: React.FC<KpiCardProps> = ({ title, value, color }) => {
    const theme = useTheme();
    const persianValue = toPersianDigits(value);

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
                    bgcolor: color || theme.palette.primary.main,
                }}
            />

            <Typography
                variant="subtitle1"
                sx={{
                    mb: 1,
                    fontWeight: 500,
                    color: theme.palette.text.secondary,
                }}
            >
                {title}
            </Typography>

            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                }}
            >
                {persianValue}
            </Typography>
        </Paper>
    );
};

export default KpiCard;
