"use client";

import React, { useState } from 'react';

import type { ColDef } from 'ag-grid-community';

import DataGrid from '@/components/DataGrid';

interface Seller {
    id: number;
    name: string;
    company: string;
    phone: string;
    status: "فعال" | "غیرفعال";
}

const SellerTable: React.FC = () => {
    const [rowData] = useState<Seller[]>([
        { id: 1, name: "رضا کریمی", company: "مس و آلومینیوم", phone: "09178889977", status: "غیرفعال" },
        { id: 2, name: "نگار موسوی", company: "آهن قراضه شرق", phone: "09221112233", status: "فعال" },
        { id: 3, name: "علی رضایی", company: "شرکت بازیافت", phone: "09135554433", status: "فعال" },
        { id: 4, name: "سارا محمدی", company: "شرکت فولاد", phone: "09351234567", status: "فعال" },
        { id: 5, name: "مهدی تویسرکانی", company: "ضایعات چی", phone: "09121234567", status: "غیرفعال" },
    ]);

    const [columnDefs] = useState<ColDef<Seller>[]>([
        { field: "id", headerName: "شناسه", sortable: true, filter: true, width: 100 },
        { field: "name", headerName: "نام فروشنده", sortable: true, filter: true, flex: 1 },
        { field: "company", headerName: "شرکت", sortable: true, filter: true, flex: 1 },
        { field: "phone", headerName: "شماره تماس", sortable: true, filter: true, flex: 1 },
        { field: "status", headerName: "وضعیت", sortable: true, filter: true, flex: 1 },
    ]);

    return <DataGrid<Seller> rowData={rowData} columnDefs={columnDefs} />;
};

export default SellerTable;
