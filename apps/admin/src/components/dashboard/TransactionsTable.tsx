'use client';

import React, { useMemo } from 'react';

import type { ColDef } from 'ag-grid-community';

import DataGrid from '@/components/DataGrid';

interface Transaction {
    id: number;
    type: string;
    scrap: string;
    amount: number;
    price: number;
    user: string;
}

const TransactionsTable: React.FC = () => {
    const rowData: Transaction[] = [
        { id: 1, type: 'خرید', scrap: 'مس', amount: 25, price: 3000000, user: 'کاربر ۱' },
        { id: 2, type: 'فروش', scrap: 'آلومینیوم', amount: 40, price: 4000000, user: 'کاربر ۲' },
        { id: 3, type: 'خرید', scrap: 'آهن', amount: 120, price: 5000000, user: 'کاربر ۳' },
    ];

    const columnDefs = useMemo<ColDef<Transaction>[]>(() => [
        { field: 'id', headerName: 'شناسه', width: 90 },
        { field: 'type', headerName: 'نوع تراکنش', width: 130 },
        { field: 'scrap', headerName: 'نوع ضایعه', width: 130 },
        { field: 'amount', headerName: 'وزن (کیلوگرم)', width: 150 },
        {
            field: 'price',
            headerName: 'قیمت (تومان)',
            width: 150,
            valueFormatter: (params) =>
                params.value?.toLocaleString('fa-IR'),
        },
        { field: 'user', headerName: 'کاربر', width: 150 },
    ], []);

    return (
        <div style={{ width: '100%' }}>
            <DataGrid<Transaction> rowData={rowData} columnDefs={columnDefs} />
        </div>
    );
};

export default TransactionsTable;
