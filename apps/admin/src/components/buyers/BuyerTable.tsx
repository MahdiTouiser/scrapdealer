"use client";

import React, { useState } from 'react';

import type { ColDef } from 'ag-grid-community';

import DataGrid from '@/components/DataGrid';

interface Buyer {
    id: number;
    name: string;
    company: string;
    phone: string;
    status: "فعال" | "غیرفعال";
}

const BuyerTable: React.FC = () => {
    const [rowData] = useState<Buyer[]>([
        { id: 1, name: "مهدی توسیر", company: "ضایعات چی", phone: "09121234567", status: "فعال" },
        { id: 2, name: "سارا محمدی", company: "شرکت فولاد", phone: "09351234567", status: "فعال" },
        { id: 3, name: "علی رضایی", company: "شرکت بازیافت", phone: "09135554433", status: "غیرفعال" },
        { id: 4, name: "نگار موسوی", company: "آهن قراضه شرق", phone: "09221112233", status: "فعال" },
        { id: 5, name: "رضا کریمی", company: "مس و آلومینیوم", phone: "09178889977", status: "غیرفعال" },
    ]);

    const [columnDefs] = useState<ColDef<Buyer>[]>([
        { field: "id", headerName: "شناسه", sortable: true, filter: true },
        { field: "name", headerName: "نام خریدار", sortable: true, filter: true, flex: 1 },
        { field: "company", headerName: "شرکت", sortable: true, filter: true },
        { field: "phone", headerName: "شماره تماس", sortable: true, filter: true },
        { field: "status", headerName: "وضعیت", sortable: true, filter: true },
    ]);

    return <DataGrid<Buyer> rowData={rowData} columnDefs={columnDefs} />;
};

export default BuyerTable;
