'use client';

import React, { useMemo } from 'react';

import type { ColDef } from 'ag-grid-community';

import Loading from '@/components/common/Loading';
import DataGrid from '@/components/DataGrid';
import { Box } from '@mui/material';

export interface Support {
    username: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

interface Props {
    data: Support[];
    loading?: boolean;
}

const SupportsTable: React.FC<Props> = ({ data, loading }) => {
    const columnDefs: ColDef<Support>[] = useMemo(
        () => [
            {
                field: 'firstName',
                headerName: 'نام',
                flex: 1,
            },
            {
                field: 'lastName',
                headerName: 'نام خانوادگی',
                flex: 1,
            },
            {
                field: 'phoneNumber',
                headerName: 'شماره تماس',
                flex: 1,
            },
            {
                field: 'username',
                headerName: 'نام کاربری',
                flex: 1,
            },
        ],
        []
    );

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
