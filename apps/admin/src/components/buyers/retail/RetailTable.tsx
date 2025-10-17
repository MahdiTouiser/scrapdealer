"use client";

import React, { useState } from 'react';

import type { ColDef } from 'ag-grid-community';

import DataGrid from '@/components/DataGrid';

interface RetailBuyer {
    id: number;
    name: string;
    shopName: string;
    phone: string;
    city: string;
    averageMonthlyPurchase: string;
    status: "فعال" | "غیرفعال";
}

const RetailTable: React.FC = () => {
    const [rowData] = useState<RetailBuyer[]>([
        { id: 1, name: "امیر حسینی", shopName: "فروشگاه آهن آلات پارس", phone: "09125554433", city: "تهران", averageMonthlyPurchase: "۵ تن", status: "فعال" },
        { id: 2, name: "مریم عباسی", shopName: "ضایعات مرکزی", phone: "09351231234", city: "کرج", averageMonthlyPurchase: "۳ تن", status: "فعال" },
        { id: 3, name: "محمد احمدی", shopName: "فروشگاه فلزات نوین", phone: "09138889977", city: "اصفهان", averageMonthlyPurchase: "۲ تن", status: "غیرفعال" },
        { id: 4, name: "الهام کریمی", shopName: "آهن آلات شرق", phone: "09225551122", city: "مشهد", averageMonthlyPurchase: "۴ تن", status: "فعال" },
        { id: 5, name: "رضا شریفی", shopName: "فروشگاه ضایعات غرب", phone: "09176668899", city: "اهواز", averageMonthlyPurchase: "۲.۵ تن", status: "غیرفعال" },
    ]);

    const [columnDefs] = useState<ColDef<RetailBuyer>[]>([
        { field: "id", headerName: "شناسه", sortable: true, filter: true },
        { field: "name", headerName: "نام خریدار خرد", sortable: true, filter: true, flex: 1 },
        { field: "shopName", headerName: "نام فروشگاه", sortable: true, filter: true },
        { field: "phone", headerName: "شماره تماس", sortable: true, filter: true },
        { field: "city", headerName: "شهر", sortable: true, filter: true },
        { field: "averageMonthlyPurchase", headerName: "میانگین خرید ماهانه", sortable: true, filter: true },
        { field: "status", headerName: "وضعیت", sortable: true, filter: true },
    ]);

    return <DataGrid<RetailBuyer> rowData={rowData} columnDefs={columnDefs} />;
};

export default RetailTable;
