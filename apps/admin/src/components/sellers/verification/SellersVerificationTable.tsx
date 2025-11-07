'use client';

import { useState } from 'react';

import { ColDef } from 'ag-grid-community';

import DataGrid from '@/components/DataGrid';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
    Box,
    Button,
    Chip,
    Stack,
    Tooltip,
} from '@mui/material';

import SellerVerificationModal from './SellerVerificationModal';

interface Seller {
    id: number;
    name: string;
    phone: string;
    company: string;
    status: 'در انتظار' | 'تایید شده' | 'رد شده';
    documents: {
        idCard: string;
        businessLicense: string;
    };
}

const SellersVerificationTable = () => {
    const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
    const [rowData, setRowData] = useState<Seller[]>([
        {
            id: 1,
            name: 'علی رضایی',
            phone: '09121234567',
            company: 'آهن آلات رضایی',
            status: 'در انتظار',
            documents: {
                idCard: '/uploads/idcard1.jpg',
                businessLicense: '/uploads/license1.jpg',
            },
        },
        {
            id: 2,
            name: 'مهدی کریمی',
            phone: '09129876543',
            company: 'قراضه متال',
            status: 'تایید شده',
            documents: {
                idCard: '/uploads/idcard2.jpg',
                businessLicense: '/uploads/license2.jpg',
            },
        },
    ]);

    const handleApprove = (id: number) => {
        setRowData(prev =>
            prev.map(seller =>
                seller.id === id ? { ...seller, status: 'تایید شده' } : seller
            )
        );
    };

    const handleReject = (id: number) => {
        setRowData(prev =>
            prev.map(seller =>
                seller.id === id ? { ...seller, status: 'رد شده' } : seller
            )
        );
    };

    const columns: ColDef<Seller>[] = [
        { field: 'id', headerName: 'شناسه', width: 90, cellStyle: { fontWeight: 600 } },
        { field: 'name', headerName: 'نام فروشنده', flex: 1 },
        { field: 'company', headerName: 'شرکت', flex: 1, cellStyle: { color: '#555' } },
        { field: 'phone', headerName: 'شماره تماس', flex: 1, cellStyle: { fontFamily: 'monospace' } },
        {
            field: 'status',
            headerName: 'وضعیت',
            flex: 1,
            cellRenderer: (params: any) => {
                const value = params.value as Seller['status'];
                const config = {
                    'تایید شده': { color: '#43a047', bg: '#e8f5e9', border: '#c8e6c9' },
                    'رد شده': { color: '#e53935', bg: '#ffebee', border: '#ffcdd2' },
                    'در انتظار': { color: '#fb8c00', bg: '#fff3e0', border: '#ffe0b2' },
                };
                const { color, bg, border } = config[value];
                return (
                    <Chip
                        label={value}
                        size="small"
                        sx={{
                            fontWeight: 600,
                            border: `1px solid ${border}`,
                            backgroundColor: bg,
                            color,
                            borderRadius: '8px',
                            minWidth: '100px',
                            justifyContent: 'center',
                        }}
                    />
                );
            },
        },
        {
            headerName: 'عملیات',
            minWidth: 160,
            cellRenderer: (params: any) => {
                const seller = params.data as Seller;
                const isApproved = seller.status === 'تایید شده';
                const isRejected = seller.status === 'رد شده';

                return (
                    <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Tooltip title="مشاهده مدارک" arrow>
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={() => setSelectedSeller(seller)}
                                sx={{ minWidth: 0, p: 1, borderRadius: '8px', '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.08)' } }}
                            >
                                <VisibilityIcon fontSize="small" />
                            </Button>
                        </Tooltip>

                        <Tooltip title="تأیید فروشنده" arrow>
                            <Button
                                variant="contained"
                                color="success"
                                size="small"
                                onClick={() => handleApprove(seller.id)}
                                disabled={isApproved}
                                sx={{ minWidth: 0, p: 1, borderRadius: '8px', opacity: isApproved ? 0.6 : 1 }}
                            >
                                <CheckCircleIcon fontSize="small" />
                            </Button>
                        </Tooltip>

                        <Tooltip title="رد فروشنده" arrow>
                            <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={() => handleReject(seller.id)}
                                disabled={isRejected}
                                sx={{ minWidth: 0, p: 1, borderRadius: '8px', opacity: isRejected ? 0.6 : 1 }}
                            >
                                <CancelIcon fontSize="small" />
                            </Button>
                        </Tooltip>
                    </Stack>
                );
            },
        },
    ];

    return (
        <Box sx={{ width: '100%', height: '100%', '& .ag-theme-alpine': { '--ag-border-color': '#e0e0e0', '--ag-header-background-color': '#fafafa', '--ag-row-hover-color': '#f9f9f9', '--ag-selected-row-background-color': '#e3f2fd', '--ag-font-family': 'IRANSans, sans-serif', borderRadius: 2, boxShadow: 3 } }}>
            <DataGrid rowData={rowData} columnDefs={columns} />

            {selectedSeller && <SellerVerificationModal seller={selectedSeller} onClose={() => setSelectedSeller(null)} />}
        </Box>
    );
};

export default SellersVerificationTable;
