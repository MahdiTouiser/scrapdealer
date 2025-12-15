'use client';

import React, {
    useMemo,
    useState,
} from 'react';

import type { ColDef } from 'ag-grid-community';

import DataGrid from '@/components/DataGrid';
import {
    ExpandLess,
    ExpandMore,
} from '@mui/icons-material';
import {
    Box,
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useTheme,
} from '@mui/material';

interface InvoiceItem {
    id: string;
    scrap: string;
    weight: number;
    price: number;
}

interface Invoice {
    id: string;
    invoiceNumber: string;
    date: string;
    buyer: string;
    seller: string;
    status: string;
    totalPrice: number;
    items: InvoiceItem[];
}

const guid = () =>
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });

const InvoicesTable: React.FC = () => {
    const theme = useTheme();
    const [expandedRow, setExpandedRow] = useState<string | null>(null);

    const invoices: Invoice[] = useMemo(() => [
        {
            id: guid(),
            invoiceNumber: 'INV-00101',
            date: '2025-11-07',
            buyer: 'شرکت صنایع فلزی پارس',
            seller: 'ضایعاتی امیر',
            status: 'تکمیل شده',
            totalPrice: 125000000,
            items: [
                { id: guid(), scrap: 'مس', weight: 120, price: 36000000 },
                { id: guid(), scrap: 'آلومینیوم', weight: 80, price: 20000000 },
                { id: guid(), scrap: 'برنج', weight: 50, price: 18000000 },
            ],
        },
        {
            id: guid(),
            invoiceNumber: 'INV-00102',
            date: '2025-11-06',
            buyer: 'کارخانه لوله سازی',
            seller: 'ضایعاتی محمدی',
            status: 'در انتظار پرداخت',
            totalPrice: 68000000,
            items: [
                { id: guid(), scrap: 'آهن', weight: 200, price: 30000000 },
                { id: guid(), scrap: 'استیل', weight: 60, price: 38000000 },
                { id: guid(), scrap: 'مس', weight: 30, price: 9000000 },
                { id: guid(), scrap: 'آلومینیوم', weight: 50, price: 15000000 },
            ],
        },
        {
            id: guid(),
            invoiceNumber: 'INV-00103',
            date: '2025-11-05',
            buyer: 'صنایع برق و الکترونیک',
            seller: 'ضایعاتی علی',
            status: 'تکمیل شده',
            totalPrice: 95000000,
            items: [
                { id: guid(), scrap: 'برنج', weight: 150, price: 52500000 },
                { id: guid(), scrap: 'مس', weight: 90, price: 42500000 },
                { id: guid(), scrap: 'آهن', weight: 300, price: 45000000 },
                { id: guid(), scrap: 'آلومینیوم', weight: 180, price: 54000000 },
                { id: guid(), scrap: 'استیل', weight: 75, price: 48750000 },

            ],
        },
    ], []);

    const rowData = useMemo(() => {
        const rows: any[] = [];
        invoices.forEach(inv => {
            rows.push({ type: 'invoice', ...inv });
            if (inv.id === expandedRow) {
                rows.push({
                    type: 'detail',
                    id: inv.id + '-detail',
                    parentId: inv.id,
                    items: inv.items,
                    invoiceNumber: inv.invoiceNumber,
                });
            }
        });
        return rows;
    }, [invoices, expandedRow]);

    const columnDefs = useMemo<ColDef[]>(() => [
        {
            headerName: '',
            field: 'expand',
            width: 70,
            pinned: 'right',
            cellRenderer: (params: any) => {
                if (params.data.type !== 'invoice') return null;
                const isOpen = expandedRow === params.data.id;
                return (
                    <Box
                        onClick={() => setExpandedRow(isOpen ? null : params.data.id)}
                        sx={{
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            color: theme.palette.primary.main,
                            fontSize: 24,
                            '&:hover': { bgcolor: 'action.hover' },
                            borderRadius: 1,
                        }}
                    >
                        {isOpen ? <ExpandLess /> : <ExpandMore />}
                    </Box>
                );
            },
        },
        { field: 'invoiceNumber', headerName: 'شماره فاکتور', width: 150 },
        {
            field: 'date',
            headerName: 'تاریخ',
            width: 130,
            valueFormatter: (p) => p.data.type === 'invoice' ? new Intl.DateTimeFormat('fa-IR').format(new Date(p.value)) : '',
        },
        { field: 'buyer', headerName: 'خریدار', flex: 1.5, minWidth: 180 },
        { field: 'seller', headerName: 'فروشنده', flex: 1.5, minWidth: 180 },
        {
            field: 'totalPrice',
            headerName: 'مبلغ کل',
            width: 180,
            valueFormatter: (p) => p.data.type === 'invoice' ? `${p.value.toLocaleString('fa-IR')} تومان` : '',
            cellStyle: { fontWeight: 'bold', color: theme.palette.primary.main },
        },
        {
            field: 'status',
            headerName: 'وضعیت',
            width: 140,
            cellRenderer: (p: any) => {
                if (p.data.type !== 'invoice') return null;
                const status = p.value;
                const isCompleted = status === 'تکمیل شده';
                return (
                    <Chip
                        label={status}
                        size="small"
                        sx={{
                            bgcolor: isCompleted ? 'success.light' : 'info.light',
                            color: isCompleted ? 'success.contrastText' : 'info.contrastText',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                        }}
                    />
                );
            },
        },
    ], [expandedRow, theme]);

    const DetailRenderer = (params: any) => {
        if (params.data.type !== 'detail') return null;

        const { items, invoiceNumber } = params.data;

        return (
            <Box
                sx={{
                    p: 3,
                    bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
                    borderTop: `1px solid ${theme.palette.divider}`,
                }}
            >
                <Typography variant="h6" fontWeight={700} mb={2} color="primary">
                    جزئیات فاکتور {invoiceNumber}
                </Typography>

                <TableContainer component={Paper} elevation={2} sx={{ maxHeight: 400, borderRadius: 2 }}>
                    <Table stickyHeader size="small">
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'primary.main' }}>
                                <TableCell sx={{ color: 'white', fontWeight: 700 }}>نوع ضایعه</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontWeight: 700 }}>وزن (کیلوگرم)</TableCell>
                                <TableCell align="right" sx={{ color: 'white', fontWeight: 700 }}>قیمت واحد</TableCell>
                                <TableCell align="right" sx={{ color: 'white', fontWeight: 700 }}>جمع کل</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item: InvoiceItem) => (
                                <TableRow key={item.id} hover sx={{ '&:last-child td': { border: 0 } }}>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                                        {item.scrap}
                                    </TableCell>
                                    <TableCell align="center">
                                        {item.weight.toLocaleString('fa-IR')}
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontFamily: 'monospace' }}>
                                        {item.price.toLocaleString('fa-IR')} تومان
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                                        {(item.price * item.weight).toLocaleString('fa-IR')} تومان
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell colSpan={3} align="right" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                                    جمع کل فاکتور:
                                </TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1.2rem', color: theme.palette.success.main }}>
                                    {items.reduce((sum: number, i: InvoiceItem) => sum + i.price * i.weight, 0).toLocaleString('fa-IR')} تومان
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        );
    };

    return (
        <Box sx={{ width: '100%', p: { xs: 1, md: 3 } }}>
            <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                <DataGrid
                    rowData={rowData}
                    columnDefs={columnDefs}
                    getRowHeight={(params) => {
                        if (params.data.type === 'detail') {
                            return 500;
                        }
                        return 60;
                    }}
                    isFullWidthRow={(params) => params.rowNode.data?.type === 'detail'}
                    fullWidthCellRenderer={DetailRenderer}
                />
            </Paper>
        </Box>
    );
};

export default InvoicesTable;