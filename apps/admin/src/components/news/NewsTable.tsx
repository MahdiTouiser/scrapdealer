'use client';

import React from 'react';

import type { ColDef } from 'ag-grid-community';

import Loading from '@/components/common/Loading';
import DataGrid from '@/components/DataGrid';
import { Box } from '@mui/material';

import ActionsCell from '../common/ActionCell';

export interface News {
    id: string;
    username: string;
    title: string;
    summary: string;
    content: string;
}

interface Props {
    data: News[];
    loading?: boolean;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const NewsTable: React.FC<Props> = ({ data, loading, onEdit, onDelete }) => {
    const columnDefs: ColDef<News>[] = [
        {
            headerName: 'ردیف',
            valueGetter: (params) => params.node.rowIndex + 1,
            width: 100,
            sortable: false,
            filter: false,
            cellStyle: { textAlign: 'center' },
        },
        { field: 'title', headerName: 'عنوان', flex: 1 },
        { field: 'summary', headerName: 'خلاصه', flex: 1 },
        {
            headerName: 'عملیات',
            minWidth: 160,
            filter: false,
            cellRenderer: ActionsCell,
            cellRendererParams: { onEdit, onDelete },
        },
    ];

    if (loading) {
        return (
            <Box mt={6}>
                <Loading />
            </Box>
        );
    }

    return <DataGrid<News> rowData={data} columnDefs={columnDefs} />;
};

export default NewsTable;
