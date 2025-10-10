'use client';

import { theme } from '@/theme';
import {
    Box,
    Typography,
} from '@mui/material';

interface PageTitleProps {
    title: string;
}

export default function PageTitle({ title }: PageTitleProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                width: '100%',
                mb: 4,
            }}
        >
            <Box
                sx={{
                    width: 160,
                    height: 3,
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 2,
                }}
            />

            <Typography
                variant="h4"
                component="h1"
                sx={{
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    color: theme.palette.text.primary,
                }}
            >
                {title}
            </Typography>

            <Box
                sx={{
                    flex: 1,
                    height: 3,
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1,
                }}
            />
        </Box>
    );
}
