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
    active: boolean;
    salesCount: number;
}

const SellersTable: React.FC<{
    data?: Seller[];
    onEdit?: (seller: Seller) => void;
    onDelete?: (id: string) => void;
}> = ({ data = [], onEdit, onDelete }) => {
    const [rowData, setRowData] = useState<Seller[]>([]);

    useEffect(() => {
        const sorted = [...data].sort((a, b) => b.salesCount - a.salesCount);
        setRowData(sorted);
    }, [data]);

    const handleStatusToggle = useCallback(
        (id: string) => {
            setRowData(prev =>
                prev.map(item =>
                    item.id === id ? { ...item, active: !item.active } : item
                )
            );
        },
        []
    );

    const [columnDefs] = useState<ColDef<Seller>[]>([
        { field: 'id', headerName: 'شناسه', maxWidth: 100 },
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
            cellRenderer: params => (
                <Box display="flex" gap={1}>
                    <button
                        onClick={() => onEdit?.(params.data)}
                        className="text-blue-500"
                    >
                        ویرایش
                    </button>
                    <button
                        onClick={() => onDelete?.(params.data.id)}
                        className="text-red-500"
                    >
                        حذف
                    </button>
                </Box>
            ),
            maxWidth: 150,
        },
    ]);

    return <DataGrid<Seller> rowData={rowData} columnDefs={columnDefs} />;
};

export default SellersTable;
