"use client";

import React, {
  useCallback,
  useState,
} from 'react';

import type { ColDef } from 'ag-grid-community';

import DataGrid from '@/components/DataGrid';
import {
  Box,
  Switch,
} from '@mui/material';

interface WholeSeller {
    id: number;
    fullName: string;
    company: string;
    phone: string;
    nationalId: string;
    region: "شمال" | "جنوب" | "شرق" | "غرب" | "تهران";
    rating: number;
    active: boolean;
}

const WholeSellersTable: React.FC = () => {
    const [rowData, setRowData] = useState<WholeSeller[]>([
        {
            id: 1,
            fullName: "رضا کریمی",
            company: "بازرگانی فلزات ایران",
            phone: "09125553322",
            nationalId: "1234567890",
            region: "تهران",
            rating: 4.9,
            active: true,
        },
        {
            id: 2,
            fullName: "احمد نصیری",
            company: "عمده فروشی شرق فلز",
            phone: "09351230099",
            nationalId: "2233445566",
            region: "شرق",
            rating: 4.6,
            active: true,
        },
        {
            id: 3,
            fullName: "سحر موسوی",
            company: "تجارت فلز پارس",
            phone: "09123334455",
            nationalId: "6677889900",
            region: "غرب",
            rating: 4.3,
            active: false,
        },
        {
            id: 4,
            fullName: "مجتبی رادمنش",
            company: "فروشگاه ضایعات جنوب",
            phone: "09187778899",
            nationalId: "3344556677",
            region: "جنوب",
            rating: 4.2,
            active: true,
        },
        {
            id: 5,
            fullName: "الهام نادری",
            company: "آهن آلات شمال",
            phone: "09225554433",
            nationalId: "9988776655",
            region: "شمال",
            rating: 4.8,
            active: true,
        },
    ]);

    const handleStatusToggle = useCallback(
        (id: number) => {
            setRowData((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, active: !item.active } : item
                )
            );
        },
        []
    );

    const [columnDefs] = useState<ColDef<WholeSeller>[]>([
        { field: "id", headerName: "شناسه", maxWidth: 100 },
        { field: "fullName", headerName: "نام و نام خانوادگی", flex: 1 },
        { field: "company", headerName: "شرکت", flex: 1 },
        { field: "phone", headerName: "شماره تماس", flex: 1 },
        { field: "nationalId", headerName: "کد ملی", flex: 1 },
        {
            field: "region",
            headerName: "منطقه فعالیت",
            flex: 1,
            filter: true,
            sortable: true,
        },
        {
            field: "rating",
            headerName: "امتیاز فروشندگان",
            flex: 1,
            sortable: true,
            valueFormatter: (params) => `${params.value} ⭐`,
        },
        {
            field: "active",
            headerName: "وضعیت",
            cellRenderer: (params) => (
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Switch
                        checked={params.value}
                        onChange={() => handleStatusToggle(params.data.id)}
                        color="success"
                    />
                </Box>
            ),
            cellStyle: { textAlign: "center" },
            maxWidth: 150,
        },
    ]);

    return <DataGrid<WholeSeller> rowData={rowData} columnDefs={columnDefs} />;
};

export default WholeSellersTable;
