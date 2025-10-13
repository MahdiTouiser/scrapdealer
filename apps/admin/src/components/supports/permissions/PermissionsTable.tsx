"use client";

import React, { useState } from 'react';

import type { ColDef } from 'ag-grid-community';

import DataGrid from '@/components/DataGrid';
import { Switch } from '@mui/material';

interface SupporterPermission {
    id: number;
    supporter: string;
    role: "پشتیبان خریداران" | "پشتیبان فروشندگان" | "مدیر";
    buyersAccess: boolean;
    sellersAccess: boolean;
    categoriesAccess: boolean;
    canApproveContent: boolean;
    canHandleComplaints: boolean;
}

const PermissionsTable: React.FC = () => {
    const [rowData, setRowData] = useState<SupporterPermission[]>([
        {
            id: 1,
            supporter: "مهدی تویسرکانی",
            role: "پشتیبان فروشندگان",
            buyersAccess: false,
            sellersAccess: true,
            categoriesAccess: true,
            canApproveContent: true,
            canHandleComplaints: true,
        },
        {
            id: 2,
            supporter: "سارا محمدی",
            role: "پشتیبان خریداران",
            buyersAccess: true,
            sellersAccess: false,
            categoriesAccess: true,
            canApproveContent: true,
            canHandleComplaints: true,
        },
        {
            id: 3,
            supporter: "نگار موسوی",
            role: "پشتیبان خریداران",
            buyersAccess: true,
            sellersAccess: false,
            categoriesAccess: false,
            canApproveContent: false,
            canHandleComplaints: true,
        },
    ]);

    const handleToggle = (rowId: number, field: keyof SupporterPermission) => {
        setRowData(prev =>
            prev.map(row =>
                row.id === rowId ? { ...row, [field]: !row[field] } : row
            )
        );
    };

    const [columnDefs] = useState<ColDef<SupporterPermission>[]>([
        { field: "id", headerName: "شناسه", width: 90 },
        { field: "supporter", headerName: "پشتیبان", flex: 1 },
        { field: "role", headerName: "نقش", flex: 1 },
        {
            field: "buyersAccess",
            headerName: "خریداران",
            width: 120,
            cellRenderer: (params: any) => (
                <Switch
                    checked={params.value}
                    onChange={() => handleToggle(params.data.id, "buyersAccess")}
                    color="primary"
                />
            ),
        },
        {
            field: "sellersAccess",
            headerName: "فروشندگان",
            width: 120,
            cellRenderer: (params: any) => (
                <Switch
                    checked={params.value}
                    onChange={() => handleToggle(params.data.id, "sellersAccess")}
                    color="primary"
                />
            ),
        },
        {
            field: "categoriesAccess",
            headerName: "دسته‌بندی‌ها",
            width: 140,
            cellRenderer: (params: any) => (
                <Switch
                    checked={params.value}
                    onChange={() => handleToggle(params.data.id, "categoriesAccess")}
                    color="primary"
                />
            ),
        },
        {
            field: "canApproveContent",
            headerName: "تایید محتوا",
            width: 140,
            cellRenderer: (params: any) => (
                <Switch
                    checked={params.value}
                    onChange={() => handleToggle(params.data.id, "canApproveContent")}
                    color="primary"
                />
            ),
        },
        {
            field: "canHandleComplaints",
            headerName: "پیگیری شکایات",
            width: 160,
            cellRenderer: (params: any) => (
                <Switch
                    checked={params.value}
                    onChange={() => handleToggle(params.data.id, "canHandleComplaints")}
                    color="primary"
                />
            ),
        },
    ]);

    return <DataGrid<SupporterPermission> rowData={rowData} columnDefs={columnDefs} />;
};

export default PermissionsTable;
