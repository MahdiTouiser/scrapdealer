'use client';

import React, {
  useMemo,
  useState,
} from 'react';

import type { ColDef } from 'ag-grid-community';

import DataGrid from '@/components/DataGrid';
import {
  Box,
  Paper,
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

    const invoices: Invoice[] = useMemo(
        () => [
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
                ],
            },
        ],
        []
    );

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
                });
            }
        });
        return rows;
    }, [invoices, expandedRow]);

    const columnDefs = useMemo<ColDef[]>(
        () => [
            {
                headerName: '',
                field: 'expand',
                width: 60,
                pinned: 'right',
                cellRenderer: (params: any) => {
                    if (params.data.type !== 'invoice') return '';
                    const isOpen = expandedRow === params.data.id;

                    return (
                        <button
                            onClick={() => setExpandedRow(isOpen ? null : params.data.id)}
                            style={{
                                cursor: 'pointer',
                                background: 'none',
                                border: 'none',
                                fontSize: 18,
                                fontWeight: 'bold',
                                padding: '4px 8px',
                            }}
                        >
                            {isOpen ? '−' : '+'}
                        </button>
                    );
                },
            },
            {
                field: 'invoiceNumber',
                headerName: 'شماره فاکتور',
                width: 150,
                cellRenderer: (params: any) =>
                    params.data.type === 'invoice' ? params.value : '',
            },
            {
                field: 'date',
                headerName: 'تاریخ',
                flex: 1,
                minWidth: 120,
                valueFormatter: (params: any) =>
                    params.data.type === 'invoice'
                        ? new Intl.DateTimeFormat('fa-IR').format(new Date(params.value))
                        : '',
            },
            {
                field: 'buyer',
                headerName: 'خریدار',
                flex: 1.5,
                minWidth: 180,
                cellRenderer: (params: any) =>
                    params.data.type === 'invoice' ? params.value : '',
            },
            {
                field: 'seller',
                headerName: 'فروشنده',
                flex: 1.5,
                minWidth: 180,
                cellRenderer: (params: any) =>
                    params.data.type === 'invoice' ? params.value : '',
            },
            {
                field: 'totalPrice',
                headerName: 'قیمت کل',
                flex: 1.2,
                minWidth: 160,
                valueFormatter: (p: any) =>
                    p.data.type === 'invoice'
                        ? p.value.toLocaleString('fa-IR') + ' تومان'
                        : '',
                cellStyle: {
                    fontWeight: 'bold',
                    color: theme.palette.mode === 'dark' ? '#90caf9' : '#1976d2',
                },
            },
            {
                field: 'status',
                headerName: 'وضعیت',
                flex: 1,
                minWidth: 130,
                cellRenderer: (params: any) =>
                    params.data.type === 'invoice' ? params.value : '',
                cellStyle: (params: any) => {
                    if (params.data.type !== 'invoice') return {};
                    switch (params.value) {
                        case 'تکمیل شده':
                            return {
                                backgroundColor:
                                    theme.palette.mode === 'dark' ? '#1b5e20' : '#e8f5e9',
                                color: theme.palette.mode === 'dark' ? '#a5d6a7' : '#2e7d32',
                                padding: '4px 12px',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            };
                        case 'در انتظار پرداخت':
                            return {
                                backgroundColor:
                                    theme.palette.mode === 'dark' ? '#0d47a1' : '#e3f2fd',
                                color: theme.palette.mode === 'dark' ? '#90caf9' : '#1565c0',
                                padding: '4px 12px',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            };
                        default:
                            return {};
                    }
                },
            },
        ],
        [expandedRow, theme.palette.mode]
    );


    const DetailRenderer = (params: any) => {
        if (params.data.type !== 'detail') return null;

        return (
            <Box sx={{ p: 3, backgroundColor: '#fafafa' }}>
                <Typography fontWeight={700} mb={2} fontSize={14}>
                    جزئیات فاکتور
                </Typography>
                <table
                    style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        fontSize: '13px',
                    }}
                >
                    <thead>
                        <tr style={{ backgroundColor: '#e0e0e0' }}>
                            <th
                                style={{
                                    padding: '10px',
                                    textAlign: 'right',
                                    fontWeight: 600,
                                }}
                            >
                                نوع ضایعه
                            </th>
                            <th
                                style={{
                                    padding: '10px',
                                    textAlign: 'right',
                                    fontWeight: 600,
                                }}
                            >
                                وزن (کیلوگرم)
                            </th>
                            <th
                                style={{
                                    padding: '10px',
                                    textAlign: 'right',
                                    fontWeight: 600,
                                }}
                            >
                                قیمت
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {params.data.items.map((i: InvoiceItem) => (
                            <tr key={i.id} style={{ borderBottom: '1px solid #ddd' }}>
                                <td style={{ padding: '10px' }}>{i.scrap}</td>
                                <td style={{ padding: '10px' }}>
                                    {i.weight.toLocaleString('fa-IR')} کیلوگرم
                                </td>
                                <td
                                    style={{
                                        padding: '10px',
                                        fontWeight: 600,
                                        color: '#1976d2',
                                    }}
                                >
                                    {i.price.toLocaleString('fa-IR')} تومان
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Box>
        );
    };

    return (
        <Box sx={{ width: '100%', p: 3 }}>
            <Paper
                sx={{
                    borderRadius: 2,
                    overflow: 'hidden',
                    bgcolor: theme.palette.background.paper,
                }}
            >
                <DataGrid
                    rowData={rowData}
                    columnDefs={columnDefs}
                    getRowHeight={(params) =>
                        params.data.type === 'detail' ? 200 : 55
                    }
                    isFullWidthRow={(params) => params.rowNode.data?.type === 'detail'}
                    fullWidthCellRenderer={DetailRenderer}
                    getRowStyle={(params) =>
                        params.data.type === 'detail' ? { background: '#fafafa' } : {}
                    }
                />
            </Paper>
        </Box>
    );
};

export default InvoicesTable;