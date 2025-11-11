'use client';

import React from 'react';

import type { ColDef } from 'ag-grid-community';

import Loading from '@/components/common/Loading';
import DataGrid from '@/components/DataGrid';
import { Box } from '@mui/material';

import ActionsCell from '../common/ActionCell';

export interface Support {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

interface Props {
    data: Support[];
    loading?: boolean;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const SupportsTable: React.FC<Props> = ({ data, loading, onEdit, onDelete }) => {
    const columnDefs: ColDef<Support>[] = [
        {
            headerName: 'ردیف',
            valueGetter: (params) => params.node.rowIndex + 1,
            width: 100,
            sortable: false,
            filter: false,
            cellStyle: { textAlign: 'center' },
        },
        { field: 'firstName', headerName: 'نام', flex: 1 },
        { field: 'lastName', headerName: 'نام خانوادگی', flex: 1 },
        { field: 'phoneNumber', headerName: 'شماره تماس', flex: 1 },
        { field: 'username', headerName: 'نام کاربری', flex: 1 },
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

    return <DataGrid<Support> rowData={data} columnDefs={columnDefs} />;
};

export default SupportsTable;
