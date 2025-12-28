'use client';

import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import type { ColDef } from 'ag-grid-community';

import DataGrid from '@/components/DataGrid';
import {
  Box,
  Switch,
} from '@mui/material';

import ActionsCell from '../common/ActionCell';
import Loading from '../common/Loading';

export interface Seller {
    id: string;
    firstName: string;
    lastName: string;
    nationalCode: string;
    phone: string;
    email: string;
    shopName: string;
    city: string;
    province: string;
    postalCode?: string;
    addressDescription?: string;
    gender?: 'Male' | 'Female';
    personType?: 'real' | 'legal';
    active: boolean;
    salesCount: number;
}


const SellersTable: React.FC<{
    data?: Seller[];
    loading: boolean
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    onReward?: (userId: string) => void
}> = ({ data = [], onEdit, onDelete, onReward, loading }) => {
    const [rowData, setRowData] = useState<Seller[]>([]);

    useEffect(() => {
        const sorted = [...data].sort((a, b) => b.salesCount - a.salesCount);
        setRowData(sorted);
    }, [data]);

    const handleStatusToggle = useCallback((id: string) => {
        setRowData(prev =>
            prev.map(item =>
                item.id === id ? { ...item, active: !item.active } : item
            )
        );
    }, []);

    const [columnDefs] = useState<ColDef<Seller>[]>([
        { field: 'firstName', headerName: 'نام', flex: 1 },
        { field: 'lastName', headerName: 'نام خانوادگی', flex: 1 },
        { field: 'shopName', headerName: 'نام مغازه', flex: 1 },
        { field: 'phone', headerName: 'شماره تماس', flex: 1 },
        { field: 'email', headerName: 'ایمیل', flex: 1 },
        { field: 'nationalCode', headerName: 'کد ملی', flex: 1 },
        { field: 'city', headerName: 'شهر', flex: 1 },
        { field: 'province', headerName: 'استان', flex: 1 },
        {
            field: 'salesCount',
            headerName: 'تعداد فروش',
            flex: 1,
            sortable: true,
            sort: 'desc',
        },
        {
            field: 'active',
            headerName: 'وضعیت',
            cellRenderer: params => (
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Switch
                        checked={params.value}
                        onChange={() => handleStatusToggle(params.data.id)}
                        color="success"
                    />
                </Box>
            ),
            cellStyle: { textAlign: 'center' },
            maxWidth: 150,
        },
        {
            headerName: 'عملیات',
            cellRenderer: ActionsCell,
            cellRendererParams: { onEdit, onDelete, onReward },
            maxWidth: 150,
        },
    ]);

    if (loading) {
        return (
            <Box mt={6}>
                <Loading />
            </Box>
        );
    }

    return <DataGrid<Seller> rowData={rowData} columnDefs={columnDefs} />;
};

export default SellersTable;
