"use client";

import React, { useState } from 'react';

import type { ColDef } from 'ag-grid-community';

import DataGrid from '@/components/DataGrid';

interface Supporter {
    id: number;
    name: string;
    role: "پشتیبان خریداران" | "پشتیبان فروشندگان" | "مدیر";
    email: string;
    phone: string;
    status: "فعال" | "غیرفعال";
}

const SupportersTable: React.FC = () => {
    const [rowData] = useState<Supporter[]>([
        { id: 1, name: "مهدی تویسرکانی", role: "پشتیبان فروشندگان", email: "mehdi@example.com", phone: "09121234567", status: "فعال" },
        { id: 2, name: "سارا محمدی", role: "پشتیبان خریداران", email: "sara@example.com", phone: "09351234567", status: "فعال" },
        { id: 3, name: "علی رضایی", role: "پشتیبان فروشندگان", email: "ali@example.com", phone: "09135554433", status: "غیرفعال" },
        { id: 4, name: "نگار موسوی", role: "پشتیبان خریداران", email: "negar@example.com", phone: "09221112233", status: "فعال" },
        { id: 5, name: "رضا کریمی", role: "مدیر", email: "reza@example.com", phone: "09178889977", status: "فعال" },
    ]);

    const [columnDefs] = useState<ColDef<Supporter>[]>([
        { field: "id", headerName: "شناسه", sortable: true, filter: true, width: 100 },
        { field: "name", headerName: "نام پشتیبان", sortable: true, filter: true, flex: 1 },
        { field: "role", headerName: "نقش", sortable: true, filter: true, flex: 1 },
        { field: "email", headerName: "ایمیل", sortable: true, filter: true, flex: 1 },
        { field: "phone", headerName: "شماره تماس", sortable: true, filter: true, flex: 1 },
        { field: "status", headerName: "وضعیت", sortable: true, filter: true, flex: 1 },
    ]);

    return <DataGrid<Supporter> rowData={rowData} columnDefs={columnDefs} />;
};

export default SupportersTable;
