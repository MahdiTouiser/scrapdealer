"use client";

import React from 'react';

import type { ColDef } from 'ag-grid-community';

import DataGrid from '@/components/DataGrid';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {
    Box,
    Chip,
} from '@mui/material';

export interface Transaction {
    id: number;
    date: string;
    user: string;
    amount: number;
    type: "واریز" | "برداشت";
    status: "موفق" | "ناموفق";
}

interface TransactionsTableProps {
    data: Transaction[];
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ data }) => {
    const columnDefs: ColDef<Transaction>[] = [
        { field: "id", headerName: "شناسه", sortable: true, filter: true },
        { field: "date", headerName: "تاریخ", sortable: true, filter: true },
        { field: "user", headerName: "نام کاربری", flex: 1, sortable: true, filter: true },
        {
            field: "amount",
            headerName: "مبلغ (تومان)",
            sortable: true,
            filter: true,
            valueFormatter: (params) => params.value.toLocaleString(),
        },
        {
            field: "type",
            headerName: "نوع تراکنش",
            sortable: true,
            filter: true,
            cellRenderer: (params: any) => (
                <Box display="flex" alignItems="center">
                    {params.value === "واریز" ? (
                        <ArrowUpwardIcon color="success" fontSize="small" />
                    ) : (
                        <ArrowDownwardIcon color="error" fontSize="small" />
                    )}
                    <Box ml={0.5}>{params.value}</Box>
                </Box>
            ),
        },
        {
            field: "status",
            headerName: "وضعیت",
            sortable: true,
            filter: true,
            cellRenderer: (params: any) => (
                <Chip
                    label={params.value}
                    color={params.value === "موفق" ? "success" : "error"}
                    size="small"
                />
            ),
        },
    ];

    return <DataGrid<Transaction> rowData={data} columnDefs={columnDefs} />;
};

export default TransactionsTable;
