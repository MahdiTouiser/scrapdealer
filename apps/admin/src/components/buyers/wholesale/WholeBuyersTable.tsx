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

interface WholeSaleBuyer {
    id: number;
    fullName: string;
    company: string;
    phone: string;
    nationalId: string;
    purchaseVolume: string;
    wasteType: string;
    region: "شمال" | "جنوب" | "شرق" | "غرب" | "تهران";
    rating: number;
    active: boolean;
    plateNumber: string;
}

const WholeBuyersTable: React.FC = () => {
    const [rowData, setRowData] = useState<WholeSaleBuyer[]>([
        { id: 1, fullName: "مهدی تویسرکانی", company: "ضایعات چی", phone: "09121234567", nationalId: "1234567890", purchaseVolume: "بیش از ۵۰۰ تن", wasteType: "فلز", region: "تهران", rating: 4.9, active: true, plateNumber: "۱۲ ط ۴۵۶ ایران ۵۰" },
        { id: 2, fullName: "سارا محمدی", company: "فولاد ایرانیان", phone: "09351234567", nationalId: "0987654321", purchaseVolume: "۳۰۰ تن", wasteType: "پلاستیک", region: "شرق", rating: 4.5, active: true, plateNumber: "۴۳ ب ۱۲۳ ایران ۲۴" },
        { id: 3, fullName: "علی رضایی", company: "شرکت بازیافت آذر", phone: "09135554433", nationalId: "4455667788", purchaseVolume: "۲۵۰ تن", wasteType: "کاغذ", region: "غرب", rating: 4.2, active: false, plateNumber: "۷۸ ج ۹۸۷ ایران ۱۱" },
        { id: 4, fullName: "نگار موسوی", company: "آهن قراضه شرق", phone: "09221112233", nationalId: "2233445566", purchaseVolume: "۴۰۰ تن", wasteType: "فلز", region: "شرق", rating: 4.6, active: true, plateNumber: "۲۵ ط ۷۸۹ ایران ۳۳" },
        { id: 5, fullName: "رضا کریمی", company: "مس و آلومینیوم غرب", phone: "09178889977", nationalId: "7788996655", purchaseVolume: "۳۵۰ تن", wasteType: "مس", region: "جنوب", rating: 4.3, active: false, plateNumber: "۳۴ ب ۴۵۶ ایران ۴۰" },
    ]);

    const WasteTypeRenderer = (params: ICellRendererParams<WholeSaleBuyer>) => {
        const type = params.value as string;
        const colorMap: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
            'کاغذ': 'info',
            'پلاستیک': 'warning',
            'فلز': 'success',
            'مس': 'error',
            'شیشه': 'default',
        };
        return <Chip label={type} color={colorMap[type] || 'default'} size="small" />;
    };

    const handleStatusToggle = useCallback((id: number) => {
        setRowData(prev =>
            prev.map(buyer => buyer.id === id ? { ...buyer, active: !buyer.active } : buyer)
        );
    }, []);

    const [columnDefs] = useState<ColDef<WholeSaleBuyer>[]>([
        { field: "id", headerName: "شناسه", maxWidth: 100 },
        { field: "fullName", headerName: "نام و نام خانوادگی", flex: 1 },
        { field: "company", headerName: "شرکت", flex: 1 },
        { field: "phone", headerName: "شماره تماس", flex: 1 },
        { field: "nationalId", headerName: "کد ملی", flex: 1 },
        { field: "plateNumber", headerName: "شماره پلاک", flex: 1 },
        { field: "purchaseVolume", headerName: "حجم خرید", flex: 1 },
        { field: "wasteType", headerName: "نوع ضایعاتی که خریداری شده", flex: 1.5, cellRenderer: WasteTypeRenderer },
        { field: "region", headerName: "منطقه فعالیت", flex: 1, sortable: true, filter: true },
        { field: "rating", headerName: "امتیاز خریداران عمده", flex: 1, sortable: true, valueFormatter: params => `${params.value} ⭐` },
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

    return <DataGrid<WholeSaleBuyer> rowData={rowData} columnDefs={columnDefs} />;
};

export default WholeBuyersTable;
