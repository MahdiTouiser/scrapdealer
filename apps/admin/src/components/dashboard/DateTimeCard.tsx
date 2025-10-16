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
} from '@mui/material';

interface DateTimeCardProps {
    locale?: string;
    color?: string;
}

const toPersianDigits = (value: string): string => {
    return value.replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(digit, 10)]);
};

const DateTimeCard: React.FC<DateTimeCardProps> = ({
    locale = 'fa-IR',
    color = '#1976d2',
}) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

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
                    bgcolor: color,
                }}
            />

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.2,
                }}
            >
                <AccessTimeIcon sx={{ fontSize: '1.6rem', color: color }} />
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        fontFamily: 'Vazirmatn, sans-serif',
                        color: 'text.primary',
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
                    <CalendarTodayIcon sx={{ fontSize: '1rem', color: color }} />
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 600,
                            fontFamily: 'Vazirmatn, sans-serif',
                            color: color,
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
                        color: 'text.secondary',
                    }}
                >
                    {formatDate(currentTime)}
                </Typography>
            </Box>
        </Paper>
    );
};

export default DateTimeCard;
