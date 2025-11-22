'use client';

import React from 'react';

import { ColDef } from 'ag-grid-community';

import DataGrid from '@/components/DataGrid';
import {
    Box,
    Chip,
} from '@mui/material';

export interface UserQuestion {
    id: string;
    user: string;
    question: string;
    answer?: string;
    group: 'buyers' | 'sellers' | 'supports';
    date?: string;
}

interface Props {
    data: UserQuestion[];
    loading?: boolean;
    onEdit: (question: UserQuestion) => void;
    onDelete: (id: string) => void;
}

const UsersQuestionsTable: React.FC<Props> = ({ data, loading, onEdit, onDelete }) => {
    const groupColorMap: Record<string, 'default' | 'success' | 'warning' | 'info'> = {
        buyers: 'success',
        sellers: 'warning',
        supports: 'info',
    };

    const columns: ColDef<UserQuestion>[] = [
        { field: 'id', headerName: 'شناسه', maxWidth: 100 },
        { field: 'user', headerName: 'کاربر', flex: 1 },
        {
            field: 'group', headerName: 'گروه', flex: 1, cellRenderer: params => (
                <Chip label={params.value} color={groupColorMap[params.value] || 'default'} size="small" />
            )
        },
        { field: 'question', headerName: 'پرسش', flex: 2 },
        { field: 'answer', headerName: 'پاسخ', flex: 2 },
        { field: 'date', headerName: 'تاریخ', flex: 1 },
        {
            headerName: 'عملیات',
            flex: 1,
            valueGetter: () => '', // a dummy value to satisfy ColDef
            cellRenderer: params => (
                <Box display="flex" gap={1}>
                    <Chip label="ثبت پاسخ" color="primary" clickable onClick={() => onEdit(params.data)} />
                    <Chip label="حذف" color="error" clickable onClick={() => onDelete(params.data.id)} />
                </Box>
            ),
        },
    ];
    return <DataGrid rowData={data} columnDefs={columns} />;
};

export default UsersQuestionsTable;
