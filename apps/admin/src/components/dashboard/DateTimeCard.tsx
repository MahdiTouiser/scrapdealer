'use client';

import React, {
    useEffect,
    useState,
} from 'react';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import {
    Box,
    Paper,
    Typography,
    useTheme,
} from '@mui/material';

interface DateTimeCardProps {
    locale?: string;
}

const toPersianDigits = (value: string): string => {
    return value.replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(digit, 10)]);
};

const DateTimeCard: React.FC<DateTimeCardProps> = ({ locale = 'fa-IR' }) => {
    const theme = useTheme();
    const [currentTime, setCurrentTime] = useState<Date | null>(null);

    useEffect(() => {
        setCurrentTime(new Date());
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    if (!currentTime) {
        return (
            <Paper sx={{ py: 5, px: 4, borderRadius: 3, textAlign: 'center' }}>
                در حال بارگذاری...
            </Paper>
        );
    }

    const formatTime = (date: Date) => {
        const time = date.toLocaleTimeString(locale, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });
        return toPersianDigits(time);
    };

    const formatDate = (date: Date) => {
        const day = date.toLocaleDateString(locale, { day: 'numeric' });
        const month = date.toLocaleDateString(locale, { month: 'long' });
        const year = date.toLocaleDateString(locale, { year: 'numeric' });
        return toPersianDigits(`${day} ${month} ${year}`);
    };

    const formatDayOfWeek = (date: Date) => {
        return date.toLocaleDateString(locale, { weekday: 'long' });
    };

    const mainColor = theme.palette.primary.main;

    return (
        <Paper
            sx={{
                py: 5,
                px: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
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
                    bgcolor: mainColor,
                }}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                <AccessTimeIcon sx={{ fontSize: '1.6rem', color: mainColor }} />
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        fontFamily: 'Vazirmatn, sans-serif',
                        color: theme.palette.text.primary,
                        letterSpacing: '0.03em',
                    }}
                >
                    {formatTime(currentTime)}
                </Typography>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    textAlign: 'right',
                    gap: 1,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CalendarTodayIcon sx={{ fontSize: '1rem', color: mainColor }} />
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 600,
                            fontFamily: 'Vazirmatn, sans-serif',
                            color: mainColor,
                        }}
                    >
                        {formatDayOfWeek(currentTime)}
                    </Typography>
                </Box>

                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: 500,
                        fontFamily: 'Vazirmatn, sans-serif',
                        color: theme.palette.text.secondary,
                    }}
                >
                    {formatDate(currentTime)}
                </Typography>
            </Box>
        </Paper>
    );
};

export default DateTimeCard;
