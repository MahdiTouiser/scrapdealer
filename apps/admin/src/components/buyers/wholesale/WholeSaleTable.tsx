"use client";

import React, { useState } from 'react';

import type { ColDef } from 'ag-grid-community';

import DataGrid from '@/components/DataGrid';

interface WholeSaleBuyer {
    id: number;
    name: string;
    company: string;
    purchaseVolume: string; // حجم خرید
    phone: string;
    region: string; // منطقه فعالیت
    status: "فعال" | "غیرفعال";
}

const WholeSaleTable: React.FC = () => {
    const [rowData] = useState<WholeSaleBuyer[]>([
        { id: 1, name: "مهدی تویسرکانی", company: "ضایعات چی", purchaseVolume: "بیش از ۵۰۰ تن", phone: "09121234567", region: "تهران", status: "فعال" },
        { id: 2, name: "سارا محمدی", company: "فولاد ایرانیان", purchaseVolume: "۳۰۰ تن", phone: "09351234567", region: "اصفهان", status: "فعال" },
        { id: 3, name: "علی رضایی", company: "شرکت بازیافت آذر", purchaseVolume: "۲۵۰ تن", phone: "09135554433", region: "تبریز", status: "غیرفعال" },
        { id: 4, name: "نگار موسوی", company: "آهن قراضه شرق", purchaseVolume: "۴۰۰ تن", phone: "09221112233", region: "مشهد", status: "فعال" },
        { id: 5, name: "رضا کریمی", company: "مس و آلومینیوم غرب", purchaseVolume: "۳۵۰ تن", phone: "09178889977", region: "اهواز", status: "غیرفعال" },
    ]);

    const [columnDefs] = useState<ColDef<WholeSaleBuyer>[]>([
        { field: "id", headerName: "شناسه", sortable: true, filter: true },
        { field: "name", headerName: "نام خریدار عمده", sortable: true, filter: true, flex: 1 },
        { field: "company", headerName: "شرکت", sortable: true, filter: true },
        { field: "purchaseVolume", headerName: "حجم خرید", sortable: true, filter: true },
        { field: "phone", headerName: "شماره تماس", sortable: true, filter: true },
        { field: "region", headerName: "منطقه فعالیت", sortable: true, filter: true },
        { field: "status", headerName: "وضعیت", sortable: true, filter: true },
    ]);

    return <DataGrid<WholeSaleBuyer> rowData={rowData} columnDefs={columnDefs} />;
};

export default WholeSaleTable;
