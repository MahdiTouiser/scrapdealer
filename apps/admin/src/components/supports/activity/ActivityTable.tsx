"use client";

import React, { useState } from 'react';

import type { ColDef } from 'ag-grid-community';

import DataGrid from '@/components/DataGrid';

interface SupporterActivity {
    id: number;
    supporter: string;
    role: "پشتیبان خریداران" | "پشتیبان فروشندگان" | "مدیر";
    activity: string;
    target: string;
    date: string;
    status: "موفق" | "ناموفق";
}

const ActivityTable: React.FC = () => {
    const [rowData] = useState<SupporterActivity[]>([
        {
            id: 1,
            supporter: "مهدی تویسرکانی",
            role: "پشتیبان فروشندگان",
            activity: "تایید فروشنده جدید",
            target: "فروشنده: رضا کریمی",
            date: "1403/07/18",
            status: "موفق",
        },
        {
            id: 2,
            supporter: "سارا محمدی",
            role: "پشتیبان خریداران",
            activity: "رفع مشکل ورود",
            target: "خریدار: علی رضایی",
            date: "1403/07/17",
            status: "موفق",
        },
        {
            id: 3,
            supporter: "نگار موسوی",
            role: "پشتیبان خریداران",
            activity: "بررسی تخفیف جدید",
            target: "فروشنده: نگار موسوی",
            date: "1403/07/16",
            status: "ناموفق",
        },
        {
            id: 4,
            supporter: "علی رضایی",
            role: "پشتیبان فروشندگان",
            activity: "بازبینی اجناس ثبت شده",
            target: "فروشنده: سارا محمدی",
            date: "1403/07/15",
            status: "موفق",
        },
    ]);

    const [columnDefs] = useState<ColDef<SupporterActivity>[]>([
        { field: "id", headerName: "شناسه", width: 90, sortable: true, filter: true },
        { field: "supporter", headerName: "پشتیبان", flex: 1, sortable: true, filter: true },
        { field: "role", headerName: "نقش", flex: 1, sortable: true, filter: true },
        { field: "activity", headerName: "فعالیت", flex: 2, sortable: true, filter: true },
        { field: "target", headerName: "هدف", flex: 2, sortable: true, filter: true },
        { field: "date", headerName: "تاریخ", width: 130, sortable: true, filter: true },
        {
            field: "status",
            headerName: "وضعیت",
            width: 120,
            sortable: true,
            filter: true,
            cellRenderer: (params: any) => (
                <span
                    style={{
                        color: params.value === "موفق" ? "#2e7d32" : "#c62828",
                        fontWeight: 600,
                    }}
                >
                    {params.value}
                </span>
            ),
        },
    ]);

    return <DataGrid<SupporterActivity> rowData={rowData} columnDefs={columnDefs} />;
};

export default ActivityTable;
