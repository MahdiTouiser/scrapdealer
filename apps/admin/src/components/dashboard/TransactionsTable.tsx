'use client';

import React, { useMemo } from 'react';

import type {
    ColDef,
    ValueFormatterParams,
} from 'ag-grid-community';

import DataGrid from '@/components/DataGrid';
import {
    Box,
    Grid,
    Paper,
    Typography,
    useTheme,
} from '@mui/material';

interface Transaction {
    id: number;
    date: string;
    buyer: string;
    seller: string;
    scrap: string;
    amount: number;
    price: number;
    type: string;
    status: string;
    weight: number;
    guid: string;
}

const generateGUID = () =>
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });

const TransactionsTable: React.FC = () => {
    const theme = useTheme();

    const rowData = useMemo<Transaction[]>(() => [
        { id: 1, date: '2025-11-07', buyer: 'شرکت صنایع فلزی پارس', seller: 'ضایعاتی امیر', scrap: 'مس', amount: 250, weight: 250, price: 75000000, type: 'خرید', status: 'تکمیل شده', guid: generateGUID() },
        { id: 2, date: '2025-11-07', buyer: 'کارخانه آلومینیوم سازی', seller: 'ضایعاتی رضا', scrap: 'آلومینیوم', amount: 180, weight: 180, price: 45000000, type: 'فروش', status: 'در حال پردازش', guid: generateGUID() },
        { id: 3, date: '2025-11-06', buyer: 'شرکت ذوب آهن', seller: 'ضایعاتی حسینی', scrap: 'آهن', amount: 500, weight: 500, price: 125000000, type: 'خرید', status: 'تکمیل شده', guid: generateGUID() },
        { id: 4, date: '2025-11-06', buyer: 'کارخانه لوله سازی', seller: 'ضایعاتی محمدی', scrap: 'استیل', amount: 320, weight: 320, price: 96000000, type: 'خرید', status: 'تکمیل شده', guid: generateGUID() },
        { id: 5, date: '2025-11-05', buyer: 'صنایع برق و الکترونیک', seller: 'ضایعاتی علی', scrap: 'برنج', amount: 150, weight: 150, price: 52500000, type: 'فروش', status: 'تکمیل شده', guid: generateGUID() },
        { id: 6, date: '2025-11-05', buyer: 'شرکت بازیافت فلزات', seller: 'ضایعاتی کریمی', scrap: 'سرب', amount: 200, weight: 200, price: 40000000, type: 'خرید', status: 'لغو شده', guid: generateGUID() },
        { id: 7, date: '2025-11-04', buyer: 'کارخانه قطعات خودرو', seller: 'ضایعاتی احمدی', scrap: 'آهن آلات', amount: 450, weight: 450, price: 108000000, type: 'فروش', status: 'تکمیل شده', guid: generateGUID() },
        { id: 8, date: '2025-11-04', buyer: 'صنایع سیم و کابل', seller: 'ضایعاتی نوری', scrap: 'مس', amount: 175, weight: 175, price: 52500000, type: 'خرید', status: 'در حال پردازش', guid: generateGUID() },
        { id: 9, date: '2025-11-03', buyer: 'شرکت بازیافت پلاستیک', seller: 'ضایعاتی یوسفی', scrap: 'پلاستیک', amount: 600, weight: 600, price: 30000000, type: 'خرید', status: 'تکمیل شده', guid: generateGUID() },
        { id: 10, date: '2025-11-03', buyer: 'کارخانه ریخته گری', seller: 'ضایعاتی صادقی', scrap: 'چدن', amount: 380, weight: 380, price: 76000000, type: 'فروش', status: 'تکمیل شده', guid: generateGUID() },
        { id: 11, date: '2025-11-02', buyer: 'صنایع هوافضا', seller: 'ضایعاتی رحیمی', scrap: 'تیتانیوم', amount: 50, weight: 50, price: 150000000, type: 'خرید', status: 'تکمیل شده', guid: generateGUID() },
        { id: 12, date: '2025-11-02', buyer: 'شرکت بازیافت کاغذ', seller: 'ضایعاتی مرادی', scrap: 'کاغذ', amount: 800, weight: 800, price: 24000000, type: 'فروش', status: 'تکمیل شده', guid: generateGUID() },
    ], []);

    const columnDefs = useMemo<ColDef<Transaction>[]>(() => [
        {
            headerName: 'ردیف',
            valueGetter: (params) => params.node.rowIndex + 1,
            width: 80,
            pinned: 'right',
            cellStyle: {
                display: 'flex',
                justifyContent: 'center',
                fontWeight: '500',
            },
        },
        { field: 'guid', headerName: 'شماره تراکنش', width: 180 },
        { field: 'date', headerName: 'تاریخ', flex: 1, minWidth: 120, valueFormatter: (params: ValueFormatterParams) => new Intl.DateTimeFormat('fa-IR').format(new Date(params.value)) },
        {
            field: 'type', headerName: 'نوع', width: 100, cellStyle: params => params.value === 'خرید'
                ? { backgroundColor: '#e8f5e9', color: '#2e7d32', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }
                : { backgroundColor: '#fff3e0', color: '#e65100', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }
        },
        { field: 'buyer', headerName: 'خریدار', flex: 1.5, minWidth: 180 },
        { field: 'seller', headerName: 'فروشنده', flex: 1.5, minWidth: 180 },
        { field: 'scrap', headerName: 'نوع ضایعه', flex: 1, minWidth: 130, cellStyle: { fontWeight: '500' } },
        { field: 'weight', headerName: 'وزن (کیلوگرم)', flex: 1, minWidth: 150, valueFormatter: (params: ValueFormatterParams) => params.value?.toLocaleString('fa-IR') + ' کیلوگرم' },
        { field: 'price', headerName: 'قیمت کل', flex: 1.2, minWidth: 160, valueFormatter: (params: ValueFormatterParams) => params.value?.toLocaleString('fa-IR') + ' تومان', cellStyle: { fontWeight: 'bold', color: theme.palette.mode === 'dark' ? '#90caf9' : '#1976d2' } },
        {
            field: 'status', headerName: 'وضعیت', flex: 1, minWidth: 130, cellStyle: params => {
                switch (params.value) {
                    case 'تکمیل شده': return { backgroundColor: theme.palette.mode === 'dark' ? '#1b5e20' : '#e8f5e9', color: theme.palette.mode === 'dark' ? '#a5d6a7' : '#2e7d32', padding: '4px 12px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' };
                    case 'در حال پردازش': return { backgroundColor: theme.palette.mode === 'dark' ? '#0d47a1' : '#e3f2fd', color: theme.palette.mode === 'dark' ? '#90caf9' : '#1565c0', padding: '4px 12px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' };
                    case 'لغو شده': return { backgroundColor: theme.palette.mode === 'dark' ? '#b71c1c' : '#ffebee', color: theme.palette.mode === 'dark' ? '#ef9a9a' : '#c62828', padding: '4px 12px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' };
                    default: return {};
                }
            }
        },
    ], [theme.palette.mode]);

    const summary = useMemo(() => {
        const totalTransactions = rowData.length;
        const totalValue = rowData.reduce((sum, row) => sum + row.price, 0);
        const buyTransactions = rowData.filter(row => row.type === 'خرید').length;
        const sellTransactions = rowData.filter(row => row.type === 'فروش').length;
        const completedTransactions = rowData.filter(row => row.status === 'تکمیل شده').length;
        return { totalTransactions, totalValue, buyTransactions, sellTransactions, completedTransactions };
    }, [rowData]);

    return (
        <Box sx={{ width: '100%', p: 3 }}>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" fontWeight={700} mb={1}>مدیریت تراکنش‌های ضایعات</Typography>
                <Typography color="text.secondary" variant="body2">مشاهده و مدیریت کلیه تراکنش‌های خرید و فروش ضایعات</Typography>
            </Box>

            <Grid container spacing={2} mb={3}>
                {[
                    { label: 'کل تراکنش‌ها', value: summary.totalTransactions, color: theme.palette.mode === 'dark' ? '#90caf9' : '#1976d2' },
                    { label: 'ارزش کل', value: summary.totalValue.toLocaleString('fa-IR') + ' تومان', color: theme.palette.mode === 'dark' ? '#a5d6a7' : '#2e7d32' },
                    { label: 'خرید / فروش', value: `${summary.buyTransactions} / ${summary.sellTransactions}`, color: theme.palette.mode === 'dark' ? '#90caf9' : '#2e7d32' },
                    { label: 'تراکنش‌های موفق', value: summary.completedTransactions, color: theme.palette.mode === 'dark' ? '#ce93d8' : '#7b1fa2' }
                ].map((card, i) => (
                    <Grid key={i}>
                        <Paper sx={{ p: 3, borderRadius: 2, border: `1px solid ${theme.palette.divider}`, bgcolor: theme.palette.background.paper }}>
                            <Typography variant="body2" color="text.secondary" mb={1}>{card.label}</Typography>
                            <Typography variant="h5" fontWeight={700} color={card.color}>{card.value}</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Paper sx={{ borderRadius: 2, overflow: 'hidden', bgcolor: theme.palette.background.paper }}>
                <DataGrid<Transaction> rowData={rowData} columnDefs={columnDefs} />
            </Paper>
        </Box>
    );
};

export default TransactionsTable;
