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

interface RetailSeller {
    id: number;
    fullName: string;
    company: string;
    phone: string;
    nationalId: string;
    region: "شمال" | "جنوب" | "شرق" | "غرب" | "تهران";
    rating: number;
    active: boolean;
}

const RetailSellersTable: React.FC = () => {
    const [rowData, setRowData] = useState<RetailSeller[]>([
        {
            id: 1,
            fullName: "سعید محمدی",
            company: "فروشگاه ضایعات پارس",
            phone: "09123334455",
            nationalId: "0098765432",
            region: "تهران",
            rating: 4.8,
            active: true,
        },
        {
            id: 2,
            fullName: "الهام کریمی",
            company: "ضایعات شرق",
            phone: "09351231234",
            nationalId: "1122446688",
            region: "شرق",
            rating: 4.4,
            active: true,
        },
        {
            id: 3,
            fullName: "حسین رستمی",
            company: "فروشگاه آهن غرب",
            phone: "09128889977",
            nationalId: "5566778899",
            region: "غرب",
            rating: 3.7,
            active: false,
        },
        {
            id: 4,
            fullName: "نرگس شریفی",
            company: "فلزات نوین جنوب",
            phone: "09176668899",
            nationalId: "7788996655",
            region: "جنوب",
            rating: 4.1,
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
        [setRowData]
    );

    const [columnDefs] = useState<ColDef<RetailSeller>[]>([
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

    return <DataGrid<RetailSeller> rowData={rowData} columnDefs={columnDefs} />;
};

export default RetailSellersTable;
