'use client'

import { useState } from 'react';

import Image from 'next/image';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {
  Box,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

const tabs = [
    'همه ضایعات',
    'ضایعات مس',
    'ضایعات آهن',
    'ضایعات آلومینیوم',
    'ضایعات برنج',
    'ضایعات چوب',
    'ضایعات پلاستیک'
];

const gridItems = {
    'همه ضایعات': [
        { name: 'مس', priceKg: 1400000, daily: 2.15, weekly: -4.20, monthly: 8.50, yearly: 15.30 },
        { name: 'آهن', priceKg: 26000, daily: -1.80, weekly: 3.10, monthly: -2.40, yearly: -10.50 },
        { name: 'آلومینیوم', priceKg: 320000, daily: 0.95, weekly: -1.70, monthly: 5.20, yearly: 12.80 },
        { name: 'برنج', priceKg: 900000, daily: -3.40, weekly: 2.60, monthly: -6.10, yearly: 9.70 },
        { name: 'چوب', priceKg: 12000, daily: 1.20, weekly: 0.80, monthly: 4.30, yearly: -5.20 },
        { name: 'پلاستیک', priceKg: 45000, daily: -0.60, weekly: 2.90, monthly: -3.50, yearly: 7.40 },
    ],
    'ضایعات مس': [
        { name: 'مس درجه یک', priceKg: 1470000, daily: 3.25, weekly: -2.10, monthly: 6.80, yearly: 18.50 },
        { name: 'مس لوله', priceKg: 1380000, daily: -1.40, weekly: 4.30, monthly: -3.20, yearly: 11.20 },
        { name: 'مس سیم', priceKg: 1375000, daily: 0.85, weekly: -0.90, monthly: 2.70, yearly: -4.60 },
    ],
    'ضایعات آهن': [
        { name: 'آهن سنگین', priceKg: 28000, daily: -2.10, weekly: 1.50, monthly: 7.40, yearly: -8.30 },
        { name: 'آهن سبک', priceKg: 22000, daily: 1.70, weekly: -3.80, monthly: -1.20, yearly: 6.90 },
        { name: 'آهن ورق', priceKg: 26000, daily: 0.30, weekly: 2.20, monthly: 4.60, yearly: 10.10 },
    ],
    'ضایعات آلومینیوم': [
        { name: 'آلومینیوم نرم', priceKg: 330000, daily: 2.80, weekly: -1.40, monthly: 3.90, yearly: 14.20 },
        { name: 'آلومینیوم پروفیل', priceKg: 310000, daily: -0.90, weekly: 2.10, monthly: -5.30, yearly: 8.70 },
    ],
    'ضایعات برنج': [
        { name: 'برنج زرد', priceKg: 920000, daily: 1.60, weekly: 3.40, monthly: -2.80, yearly: 12.50 },
        { name: 'برنج شیر', priceKg: 880000, daily: -2.30, weekly: -1.70, monthly: 5.10, yearly: -7.40 },
    ],
    'ضایعات چوب': [
        { name: 'چوب ام‌دی‌اف', priceKg: 15000, daily: 0.50, weekly: 2.80, monthly: -4.20, yearly: 9.30 },
        { name: 'چوب کاج', priceKg: 10000, daily: -1.20, weekly: -0.60, monthly: 3.70, yearly: -6.10 },
        { name: 'چوب نئوپان', priceKg: 13000, daily: 2.40, weekly: 1.90, monthly: 6.50, yearly: 11.80 },
    ],
    'ضایعات پلاستیک': [
        { name: 'پلاستیک PET', priceKg: 65000, daily: -3.10, weekly: 4.20, monthly: -1.80, yearly: 5.60 },
        { name: 'پلاستیک PP', priceKg: 40000, daily: 1.90, weekly: -2.50, monthly: 4.30, yearly: -9.20 },
    ],
};

const PercentageCell = ({ value, small = false }: { value: number; small?: boolean }) => {
    const isPositive = value > 0;
    const color = isPositive ? '#06975C' : '#970608';

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4, color }}>
            {isPositive ? (
                <ArrowUpwardIcon sx={{ fontSize: small ? 13 : 18 }} />
            ) : (
                <ArrowDownwardIcon sx={{ fontSize: small ? 13 : 18 }} />
            )}
            <Typography sx={{ fontSize: small ? 12 : 14, fontWeight: 600 }}>
                {Math.abs(value).toFixed(2)}%
            </Typography>
        </Box>
    );
};

const ScrapsGrid = () => {
    const [activeTab, setActiveTab] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const currentItems = gridItems[tabs[activeTab] as keyof typeof gridItems];

    const headers = ['نوع ضایعات', 'قیمت هر کیلو (تومان)', 'قیمت هر تن (تومان)', 'روزانه', 'هفتگی', 'ماهانه', 'سالانه'];

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, width: '100%', maxWidth: 1400, mx: 'auto', mt: 4 }}>
            <Tabs
                value={activeTab}
                onChange={(_, newValue) => setActiveTab(newValue)}
                variant={isMobile ? 'scrollable' : 'fullWidth'}
                scrollButtons="auto"
                slotProps={{ indicator: { sx: { display: 'none' } } }}
                sx={{
                    mb: 3,
                    '& .MuiTab-root': {
                        fontWeight: 'medium',
                        textTransform: 'none',
                        fontSize: { xs: 15, md: 17 },
                        color: '#333',
                        py: 2,
                        minWidth: 'auto',
                    },
                    '& .Mui-selected': {
                        fontWeight: 'bold !important',
                        color: '#333 !important',
                        bgcolor: 'transparent !important',
                    },
                }}
            >
                {tabs.map((tab) => (
                    <Tab key={tab} label={tab} />
                ))}
            </Tabs>

            {!isMobile && (
                <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 4, overflow: 'hidden' }}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#f6f6f6' }}>
                                {headers.map((header) => (
                                    <TableCell key={header} align="center" sx={{ fontWeight: 'bold', fontSize: 16, py: 2 }}>
                                        {header}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentItems.map((item) => {
                                const rowBg = item.daily > 0 ? '#f0fdf4' : '#fef2f2';
                                return (
                                    <TableRow key={item.name} sx={{ bgcolor: rowBg }}>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                            {item.name}
                                        </TableCell>
                                        <TableCell align="center">{item.priceKg.toLocaleString('fa-IR')}</TableCell>
                                        <TableCell align="center">{(item.priceKg * 1000).toLocaleString('fa-IR')}</TableCell>
                                        <TableCell align="center"><PercentageCell value={item.daily} /></TableCell>
                                        <TableCell align="center"><PercentageCell value={item.weekly} /></TableCell>
                                        <TableCell align="center"><PercentageCell value={item.monthly} /></TableCell>
                                        <TableCell align="center"><PercentageCell value={item.yearly} /></TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {isMobile && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {currentItems.map((item) => {
                        const isPositive = item.daily > 0;
                        const cardBg = isPositive ? '#f0fdf4' : '#fef2f2';
                        const iconSrc = isPositive ? '/icons/chevUp.svg' : '/icons/chevDown.svg';

                        return (
                            <Paper
                                key={item.name}
                                elevation={0}
                                sx={{
                                    bgcolor: cardBg,
                                    borderRadius: 2,
                                    p: 1.2,
                                    border: '1px solid #e0e0e0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    minHeight: 48,
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Image src={iconSrc} width={14} height={14} alt="" />
                                    <Box>
                                        <Typography sx={{ fontWeight: 'bold', fontSize: 14, lineHeight: 1.2 }}>
                                            {item.name}
                                        </Typography>
                                        <Typography sx={{ fontSize: 12, color: '#555', lineHeight: 1.2 }}>
                                            {item.priceKg.toLocaleString('fa-IR')} تومان/کیلو • {(item.priceKg * 1000).toLocaleString('fa-IR')} تومان/تن
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                                    <PercentageCell value={item.daily} small />
                                    <PercentageCell value={item.weekly} small />
                                    <PercentageCell value={item.monthly} small />
                                    <PercentageCell value={item.yearly} small />
                                </Box>
                            </Paper>
                        );
                    })}
                </Box>
            )}
        </Box>
    );
};

export default ScrapsGrid;