'use client';
import React, { useMemo } from 'react';

import type {
    ColDef,
    ValueFormatterParams,
} from 'ag-grid-community';

import DataGrid from '@/components/DataGrid';

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
}

const TransactionsTable: React.FC = () => {

    const rowData = useMemo<Transaction[]>(() => [
        {
            id: 1,
            date: '2025-11-07',
            buyer: 'شرکت صنایع فلزی پارس',
            seller: 'ضایعاتی امیر',
            scrap: 'مس',
            amount: 250,
            weight: 250,
            price: 75000000,
            type: 'خرید',
            status: 'تکمیل شده',
        },
        {
            id: 2,
            date: '2025-11-07',
            buyer: 'کارخانه آلومینیوم سازی',
            seller: 'ضایعاتی رضا',
            scrap: 'آلومینیوم',
            amount: 180,
            weight: 180,
            price: 45000000,
            type: 'فروش',
            status: 'در حال پردازش',
        },
        {
            id: 3,
            date: '2025-11-06',
            buyer: 'شرکت ذوب آهن',
            seller: 'ضایعاتی حسینی',
            scrap: 'آهن',
            amount: 500,
            weight: 500,
            price: 125000000,
            type: 'خرید',
            status: 'تکمیل شده',
        },
        {
            id: 4,
            date: '2025-11-06',
            buyer: 'کارخانه لوله سازی',
            seller: 'ضایعاتی محمدی',
            scrap: 'استیل',
            amount: 320,
            weight: 320,
            price: 96000000,
            type: 'خرید',
            status: 'تکمیل شده',
        },
        {
            id: 5,
            date: '2025-11-05',
            buyer: 'صنایع برق و الکترونیک',
            seller: 'ضایعاتی علی',
            scrap: 'برنج',
            amount: 150,
            weight: 150,
            price: 52500000,
            type: 'فروش',
            status: 'تکمیل شده',
        },
        {
            id: 6,
            date: '2025-11-05',
            buyer: 'شرکت بازیافت فلزات',
            seller: 'ضایعاتی کریمی',
            scrap: 'سرب',
            amount: 200,
            weight: 200,
            price: 40000000,
            type: 'خرید',
            status: 'لغو شده',
        },
        {
            id: 7,
            date: '2025-11-04',
            buyer: 'کارخانه قطعات خودرو',
            seller: 'ضایعاتی احمدی',
            scrap: 'آهن آلات',
            amount: 450,
            weight: 450,
            price: 108000000,
            type: 'فروش',
            status: 'تکمیل شده',
        },
        {
            id: 8,
            date: '2025-11-04',
            buyer: 'صنایع سیم و کابل',
            seller: 'ضایعاتی نوری',
            scrap: 'مس',
            amount: 175,
            weight: 175,
            price: 52500000,
            type: 'خرید',
            status: 'در حال پردازش',
        },
        {
            id: 9,
            date: '2025-11-03',
            buyer: 'شرکت بازیافت پلاستیک',
            seller: 'ضایعاتی یوسفی',
            scrap: 'پلاستیک',
            amount: 600,
            weight: 600,
            price: 30000000,
            type: 'خرید',
            status: 'تکمیل شده',
        },
        {
            id: 10,
            date: '2025-11-03',
            buyer: 'کارخانه ریخته گری',
            seller: 'ضایعاتی صادقی',
            scrap: 'چدن',
            amount: 380,
            weight: 380,
            price: 76000000,
            type: 'فروش',
            status: 'تکمیل شده',
        },
        {
            id: 11,
            date: '2025-11-02',
            buyer: 'صنایع هوافضا',
            seller: 'ضایعاتی رحیمی',
            scrap: 'تیتانیوم',
            amount: 50,
            weight: 50,
            price: 150000000,
            type: 'خرید',
            status: 'تکمیل شده',
        },
        {
            id: 12,
            date: '2025-11-02',
            buyer: 'شرکت بازیافت کاغذ',
            seller: 'ضایعاتی مرادی',
            scrap: 'کاغذ',
            amount: 800,
            weight: 800,
            price: 24000000,
            type: 'فروش',
            status: 'تکمیل شده',
        },
    ], []);

    const columnDefs = useMemo<ColDef<Transaction>[]>(
        () => [
            {
                field: 'id',
                headerName: 'شناسه',
                width: 100,
                checkboxSelection: true,
                headerCheckboxSelection: true,
                pinned: 'right',
            },
            {
                field: 'date',
                headerName: 'تاریخ',
                flex: 1,
                minWidth: 120,
                valueFormatter: (params: ValueFormatterParams) => {
                    const date = new Date(params.value);
                    return new Intl.DateTimeFormat('fa-IR').format(date);
                },
            },
            {
                field: 'type',
                headerName: 'نوع',
                width: 100,
                cellStyle: (params) => {
                    if (params.value === 'خرید') {
                        return {
                            backgroundColor: '#e8f5e9',
                            color: '#2e7d32',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        };
                    }
                    return {
                        backgroundColor: '#fff3e0',
                        color: '#e65100',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    };
                },
            },
            {
                field: 'buyer',
                headerName: 'خریدار',
                flex: 1.5,
                minWidth: 180,
            },
            {
                field: 'seller',
                headerName: 'فروشنده',
                flex: 1.5,
                minWidth: 180,
            },
            {
                field: 'scrap',
                headerName: 'نوع ضایعه',
                flex: 1,
                minWidth: 130,
                cellStyle: {
                    fontWeight: '500',
                },
            },
            {
                field: 'weight',
                headerName: 'وزن (کیلوگرم)',
                flex: 1,
                minWidth: 150,
                valueFormatter: (params: ValueFormatterParams) =>
                    params.value?.toLocaleString('fa-IR') + ' کیلوگرم',
            },
            {
                field: 'price',
                headerName: 'قیمت کل',
                flex: 1.2,
                minWidth: 160,
                valueFormatter: (params: ValueFormatterParams) =>
                    params.value?.toLocaleString('fa-IR') + ' تومان',
                cellStyle: {
                    fontWeight: 'bold',
                    color: '#1976d2',
                },
            },
            {
                field: 'status',
                headerName: 'وضعیت',
                flex: 1,
                minWidth: 130,
                cellStyle: (params) => {
                    switch (params.value) {
                        case 'تکمیل شده':
                            return {
                                backgroundColor: '#e8f5e9',
                                color: '#2e7d32',
                                padding: '4px 12px',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            };
                        case 'در حال پردازش':
                            return {
                                backgroundColor: '#e3f2fd',
                                color: '#1565c0',
                                padding: '4px 12px',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            };
                        case 'لغو شده':
                            return {
                                backgroundColor: '#ffebee',
                                color: '#c62828',
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
        []
    );

    // Calculate summary statistics
    const summary = useMemo(() => {
        const totalTransactions = rowData.length;
        const totalValue = rowData.reduce((sum, row) => sum + row.price, 0);
        const buyTransactions = rowData.filter((row) => row.type === 'خرید').length;
        const sellTransactions = rowData.filter((row) => row.type === 'فروش').length;
        const completedTransactions = rowData.filter(
            (row) => row.status === 'تکمیل شده'
        ).length;

        return {
            totalTransactions,
            totalValue,
            buyTransactions,
            sellTransactions,
            completedTransactions,
        };
    }, [rowData]);

    return (
        <div style={{ width: '100%', padding: '20px' }}>
            {/* Header Section */}
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
                    مدیریت تراکنش‌های ضایعات
                </h1>
                <p style={{ color: '#666', fontSize: '14px' }}>
                    مشاهده و مدیریت کلیه تراکنش‌های خرید و فروش ضایعات
                </p>
            </div>

            {/* Summary Cards */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '16px',
                    marginBottom: '24px',
                }}
            >
                <div
                    style={{
                        backgroundColor: '#fff',
                        padding: '20px',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        border: '1px solid #e0e0e0',
                    }}
                >
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                        کل تراکنش‌ها
                    </div>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1976d2' }}>
                        {summary.totalTransactions.toLocaleString('fa-IR')}
                    </div>
                </div>

                <div
                    style={{
                        backgroundColor: '#fff',
                        padding: '20px',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        border: '1px solid #e0e0e0',
                    }}
                >
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                        ارزش کل
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2e7d32' }}>
                        {summary.totalValue.toLocaleString('fa-IR')} تومان
                    </div>
                </div>

                <div
                    style={{
                        backgroundColor: '#fff',
                        padding: '20px',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        border: '1px solid #e0e0e0',
                    }}
                >
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                        خرید / فروش
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                        <span style={{ color: '#2e7d32' }}>
                            {summary.buyTransactions.toLocaleString('fa-IR')}
                        </span>
                        <span style={{ margin: '0 8px', color: '#999' }}>/</span>
                        <span style={{ color: '#e65100' }}>
                            {summary.sellTransactions.toLocaleString('fa-IR')}
                        </span>
                    </div>
                </div>

                <div
                    style={{
                        backgroundColor: '#fff',
                        padding: '20px',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        border: '1px solid #e0e0e0',
                    }}
                >
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                        تراکنش‌های موفق
                    </div>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#7b1fa2' }}>
                        {summary.completedTransactions.toLocaleString('fa-IR')}
                    </div>
                </div>
            </div>

            {/* Data Grid */}
            <div
                style={{
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    border: '1px solid #e0e0e0',
                    overflow: 'hidden',
                }}
            >
                <DataGrid<Transaction> rowData={rowData} columnDefs={columnDefs} />
            </div>
        </div>
    );
};

export default TransactionsTable;