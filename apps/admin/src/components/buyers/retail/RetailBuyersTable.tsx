'use client';

import React, {
    useCallback,
    useState,
} from 'react';

import type {
    ColDef,
    ICellRendererParams,
} from 'ag-grid-community';

import DataGrid from '@/components/DataGrid';
import {
    Box,
    Chip,
    Switch,
} from '@mui/material';

interface RetailBuyer {
    id: number;
    fullName: string;
    company: string;
    phone: string;
    nationalId: string;
    wasteType: string;
    region: "شمال" | "جنوب" | "شرق" | "غرب" | "تهران";
    rating: number;
    active: boolean;
    plateNumber: string;
}

const RetailBuyersTable: React.FC = () => {
    const [rowData, setRowData] = useState<RetailBuyer[]>([
        { id: 1, fullName: "امیر حسینی", company: "شرکت آهن پارس", phone: "09125554433", nationalId: "1234567890", region: "تهران", rating: 4.5, active: true, wasteType: "فلز", plateNumber: "۱۲ ط ۴۵۶ ایران ۵۰" },
        { id: 2, fullName: "مریم عباسی", company: "ضایعات مرکزی", phone: "09351231234", nationalId: "0987654321", region: "شرق", rating: 4.2, active: true, wasteType: "پلاستیک", plateNumber: "۴۳ ب ۱۲۳ ایران ۲۴" },
        { id: 3, fullName: "محمد احمدی", company: "فلزات نوین", phone: "09138889977", nationalId: "1122334455", region: "غرب", rating: 3.9, active: false, wasteType: "کاغذ", plateNumber: "۷۸ ج ۹۸۷ ایران ۱۱" },
    ]);

    const WasteTypeRenderer = (params: ICellRendererParams<RetailBuyer>) => {
        const type = params.value as string;
        const colorMap: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
            'کاغذ': 'info',
            'پلاستیک': 'warning',
            'فلز': 'success',
            'شیشه': 'default',
        };
        return <Chip label={type} color={colorMap[type] || 'default'} size="small" />;
    };

    const handleStatusToggle = useCallback((id: number) => {
        setRowData(prev =>
            prev.map(item => item.id === id ? { ...item, active: !item.active } : item)
        );
    }, []);

    const [columnDefs] = useState<ColDef<RetailBuyer>[]>([
        { field: "id", headerName: "شناسه", maxWidth: 100 },
        { field: "fullName", headerName: "نام و نام خانوادگی", flex: 1 },
        { field: "company", headerName: "شرکت", flex: 1 },
        { field: "phone", headerName: "شماره تماس", flex: 1 },
        { field: "nationalId", headerName: "کد ملی", flex: 1 },
        { field: "plateNumber", headerName: "شماره پلاک", flex: 1 },
        { field: 'wasteType', headerName: 'نوع ضایعاتی که خریداری شده', flex: 1.5, cellRenderer: WasteTypeRenderer },
        { field: "region", headerName: "منطقه فعالیت", flex: 1, filter: true, sortable: true },
        { field: "rating", headerName: "امتیاز فروشندگان", flex: 1, sortable: true, valueFormatter: params => `${params.value} ⭐` },
        {
            field: "active",
            headerName: "وضعیت",
            cellRenderer: params => (
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Switch checked={params.value} onChange={() => handleStatusToggle(params.data.id)} color="success" />
                </Box>
            ),
            cellStyle: { textAlign: "center" },
            maxWidth: 150
        },
    ]);

    return <DataGrid<RetailBuyer> rowData={rowData} columnDefs={columnDefs} />;
};

export default RetailBuyersTable;
