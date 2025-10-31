'use client';

import React, {
  useMemo,
  useState,
} from 'react';

import {
  ColDef,
  ICellRendererParams,
} from 'ag-grid-community';

import DataGrid from '@/components/DataGrid';
import StarIcon from '@mui/icons-material/Star';
import {
  Box,
  Chip,
  Typography,
} from '@mui/material';

interface FixedBuyer {
    id: number;
    fullName: string;         
    shopName: string;       
    shopAddress: string;    
    phone: string;          
    wasteType: string;       
    rating: number;        
}

const initialData: FixedBuyer[] = [
    { id: 1, fullName: 'علی رضایی', shopName: 'مغازه الف', shopAddress: 'تهران، میدان آزادی', phone: '09123456789', wasteType: 'کاغذ', rating: 4.5 },
    { id: 2, fullName: 'مریم احمدی', shopName: 'مغازه ب', shopAddress: 'اصفهان، خیابان انقلاب', phone: '09129876543', wasteType: 'پلاستیک', rating: 3.8 },
    { id: 3, fullName: 'حسین کریمی', shopName: 'مغازه ج', shopAddress: 'مشهد، بلوار شهید', phone: '09121112222', wasteType: 'فلز', rating: 4.9 },
];

const FixedLocationBuyersTable: React.FC = () => {
    const [rowData] = useState<FixedBuyer[]>(initialData);

    const RatingRenderer = (params: ICellRendererParams<FixedBuyer>) => {
        const rating = params.value as number;
        return (
            <Box display="flex" alignItems="center" gap={0.5}>
                <StarIcon sx={{ color: '#FFD700', fontSize: 18 }} />
                <Typography variant="body2" fontWeight={600}>{rating.toFixed(1)}</Typography>
            </Box>
        );
    };

    const WasteTypeRenderer = (params: ICellRendererParams<FixedBuyer>) => {
        const type = params.value as string;
        const colorMap: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
            'کاغذ': 'info',
            'پلاستیک': 'warning',
            'فلز': 'success',
            'شیشه': 'default',
        };
        return <Chip label={type} color={colorMap[type] || 'default'} size="small" />;
    };

    const columnDefs = useMemo<ColDef<FixedBuyer>[]>(
        () => [
            { field: 'fullName', headerName: 'نام و نام خانوادگی', flex: 1.5 },
            { field: 'shopName', headerName: 'نام مغازه', flex: 1 },
            { field: 'shopAddress', headerName: 'آدرس مغازه', flex: 2 },
            { field: 'phone', headerName: 'شماره تماس', width: 140 },
            { field: 'wasteType', headerName: 'نوع ضایعاتی که خریداری شده', flex: 1.5, cellRenderer: WasteTypeRenderer },
            { field: 'rating', headerName: 'امتیاز', width: 100, cellRenderer: RatingRenderer },
        ],
        []
    );

    return (
        <Box sx={{ width: '100%', borderRadius: 3, overflow: 'hidden', boxShadow: 2 }}>
            <DataGrid<FixedBuyer>
                rowData={rowData}
                columnDefs={columnDefs}
                rtl
                width="100%"
            />
        </Box>
    );
};

export default FixedLocationBuyersTable;
