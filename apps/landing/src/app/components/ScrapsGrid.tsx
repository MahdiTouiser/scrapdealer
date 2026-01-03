'use client'

import { useState } from 'react';

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
    'ضایعات پلاستیک',
]

const gridItems = {
    'همه ضایعات': [
        { name: 'مس', priceKg: 1400000, daily: 2.15, weekly: -4.2, monthly: 8.5, yearly: 15.3 },
        { name: 'آهن', priceKg: 26000, daily: -1.8, weekly: 3.1, monthly: -2.4, yearly: -10.5 },
        { name: 'آلومینیوم', priceKg: 320000, daily: 0.95, weekly: -1.7, monthly: 5.2, yearly: 12.8 },
        { name: 'برنج', priceKg: 900000, daily: -3.4, weekly: 2.6, monthly: -6.1, yearly: 9.7 },
        { name: 'چوب', priceKg: 12000, daily: 1.2, weekly: 0.8, monthly: 4.3, yearly: -5.2 },
        { name: 'پلاستیک', priceKg: 45000, daily: -0.6, weekly: 2.9, monthly: -3.5, yearly: 7.4 },
    ],
    'ضایعات مس': [
        { name: 'مس درجه یک', priceKg: 1470000, daily: 3.25, weekly: -2.1, monthly: 6.8, yearly: 18.5 },
        { name: 'مس لوله', priceKg: 1380000, daily: -1.4, weekly: 4.3, monthly: -3.2, yearly: 11.2 },
        { name: 'مس سیم', priceKg: 1375000, daily: 0.85, weekly: -0.9, monthly: 2.7, yearly: -4.6 },
    ],
    'ضایعات آهن': [
        { name: 'آهن سنگین', priceKg: 28000, daily: -2.1, weekly: 1.5, monthly: 7.4, yearly: -8.3 },
        { name: 'آهن سبک', priceKg: 22000, daily: 1.7, weekly: -3.8, monthly: -1.2, yearly: 6.9 },
        { name: 'آهن ورق', priceKg: 26000, daily: 0.3, weekly: 2.2, monthly: 4.6, yearly: 10.1 },
    ],
    'ضایعات آلومینیوم': [
        { name: 'آلومینیوم نرم', priceKg: 330000, daily: 2.8, weekly: -1.4, monthly: 3.9, yearly: 14.2 },
        { name: 'آلومینیوم پروفیل', priceKg: 310000, daily: -0.9, weekly: 2.1, monthly: -5.3, yearly: 8.7 },
    ],
    'ضایعات برنج': [
        { name: 'برنج زرد', priceKg: 920000, daily: 1.6, weekly: 3.4, monthly: -2.8, yearly: 12.5 },
        { name: 'برنج شیر', priceKg: 880000, daily: -2.3, weekly: -1.7, monthly: 5.1, yearly: -7.4 },
    ],
    'ضایعات چوب': [
        { name: 'چوب ام‌دی‌اف', priceKg: 15000, daily: 0.5, weekly: 2.8, monthly: -4.2, yearly: 9.3 },
        { name: 'چوب کاج', priceKg: 10000, daily: -1.2, weekly: -0.6, monthly: 3.7, yearly: -6.1 },
        { name: 'چوب نئوپان', priceKg: 13000, daily: 2.4, weekly: 1.9, monthly: 6.5, yearly: 11.8 },
    ],
    'ضایعات پلاستیک': [
        { name: 'پلاستیک PET', priceKg: 65000, daily: -3.1, weekly: 4.2, monthly: -1.8, yearly: 5.6 },
        { name: 'پلاستیک PP', priceKg: 40000, daily: 1.9, weekly: -2.5, monthly: 4.3, yearly: -9.2 },
    ],
}

const PercentageCell = ({ value, small = false }: { value: number; small?: boolean }) => {
    const positive = value > 0
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.4, color: positive ? '#06975C' : '#970608' }}>
            {positive ? <ArrowUpwardIcon sx={{ fontSize: small ? 13 : 18 }} /> : <ArrowDownwardIcon sx={{ fontSize: small ? 13 : 18 }} />}
            <Typography sx={{ fontSize: small ? 12 : 14, fontWeight: 600 }}>
                {Math.abs(value).toFixed(2)}%
            </Typography>
        </Box>
    )
}

const ScrapsGrid = () => {
    const [activeTab, setActiveTab] = useState(0)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const currentItems = gridItems[tabs[activeTab] as keyof typeof gridItems]

    const headers = ['نوع ضایعات', 'قیمت هر کیلو', 'قیمت هر تن', 'روزانه', 'هفتگی', 'ماهانه', 'سالانه']

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, width: '100%', maxWidth: 1400, mx: 'auto', mt: 4 }}>
            <Tabs
                value={activeTab}
                onChange={(_, v) => setActiveTab(v)}
                variant={isMobile ? 'scrollable' : 'fullWidth'}
                scrollButtons="auto"
                slotProps={{ indicator: { sx: { display: 'none' } } }}
                sx={{
                    mb: 3,
                    '& .MuiTab-root': { fontSize: { xs: 15, md: 17 }, minWidth: 'auto', py: 2 },
                    '& .Mui-selected': { fontWeight: 700 },
                }}
            >
                {tabs.map(t => <Tab key={t} label={t} />)}
            </Tabs>

            {!isMobile && (
                <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 4, overflow: 'hidden' }}>
                    <Table sx={{ tableLayout: 'fixed', minWidth: 900 }}>
                        <colgroup>
                            <col style={{ width: '18%' }} />
                            <col style={{ width: '16%' }} />
                            <col style={{ width: '16%' }} />
                            <col style={{ width: '12%' }} />
                            <col style={{ width: '12%' }} />
                            <col style={{ width: '13%' }} />
                            <col style={{ width: '13%' }} />
                        </colgroup>
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#f6f6f6' }}>
                                {headers.map(h => (
                                    <TableCell key={h} align="center" sx={{ fontWeight: 700, fontSize: 15, py: 2 }}>
                                        {h}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentItems.map(item => (
                                <TableRow key={item.name} sx={{ bgcolor: item.daily > 0 ? '#f0fdf4' : '#fef2f2' }}>
                                    <TableCell align="center" sx={{ fontWeight: 700 }}>{item.name}</TableCell>
                                    <TableCell align="center">{item.priceKg.toLocaleString('fa-IR')}</TableCell>
                                    <TableCell align="center">{(item.priceKg * 1000).toLocaleString('fa-IR')}</TableCell>
                                    <TableCell align="center"><PercentageCell value={item.daily} /></TableCell>
                                    <TableCell align="center"><PercentageCell value={item.weekly} /></TableCell>
                                    <TableCell align="center"><PercentageCell value={item.monthly} /></TableCell>
                                    <TableCell align="center"><PercentageCell value={item.yearly} /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {isMobile && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {currentItems.map(item => (
                        <Paper
                            key={item.name}
                            elevation={0}
                            sx={{
                                bgcolor: item.daily > 0 ? '#f0fdf4' : '#fef2f2',
                                borderRadius: 2,
                                p: 1.2,
                                border: '1px solid #e0e0e0',
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box>
                                <Typography sx={{ fontWeight: 700, fontSize: 14 }}>{item.name}</Typography>
                                <Typography sx={{ fontSize: 12, color: '#555' }}>
                                    {item.priceKg.toLocaleString('fa-IR')} / {(item.priceKg * 1000).toLocaleString('fa-IR')}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <PercentageCell value={item.daily} small />
                                <PercentageCell value={item.weekly} small />
                                <PercentageCell value={item.monthly} small />
                                <PercentageCell value={item.yearly} small />
                            </Box>
                        </Paper>
                    ))}
                </Box>
            )}
        </Box>
    )
}

export default ScrapsGrid
