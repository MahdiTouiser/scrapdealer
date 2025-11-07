'use client';

import React, { useState } from 'react';

import type { ColDef } from 'ag-grid-community';

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

import BuyersDetailModal from './BuyersDetailModal';

interface BuyerVerification {
    id: number;
    name: string;
    company: string;
    phone: string;
    nationalId: string;
    registrationDate: string;
    documentsStatus: 'تأیید شده' | 'در انتظار بررسی' | 'رد شده';
    accountStatus: 'فعال' | 'غیرفعال';
}

const BuyersVerificationTable: React.FC = () => {
    const [rowData, setRowData] = useState<BuyerVerification[]>([
        {
            id: 1,
            name: 'مهدی تویسرکانی',
            company: 'ضایعات چی',
            phone: '09121234567',
            nationalId: '1234567890',
            registrationDate: '1403/07/15',
            documentsStatus: 'تأیید شده',
            accountStatus: 'فعال',
        },
        {
            id: 2,
            name: 'سارا محمدی',
            company: 'فولاد ایرانیان',
            phone: '09351234567',
            nationalId: '0098765432',
            registrationDate: '1403/06/20',
            documentsStatus: 'در انتظار بررسی',
            accountStatus: 'غیرفعال',
        },
        {
            id: 3,
            name: 'علی رضایی',
            company: 'شرکت بازیافت آذر',
            phone: '09135554433',
            nationalId: '1122334455',
            registrationDate: '1403/07/02',
            documentsStatus: 'رد شده',
            accountStatus: 'غیرفعال',
        },
        {
            id: 4,
            name: 'نگار موسوی',
            company: 'آهن قراضه شرق',
            phone: '09221112233',
            nationalId: '5544332211',
            registrationDate: '1403/07/10',
            documentsStatus: 'تأیید شده',
            accountStatus: 'فعال',
        },
    ]);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<BuyerVerification | null>(null);

    const handleOpenModal = (row: BuyerVerification) => {
        setSelectedRow(row);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedRow(null);
        setModalOpen(false);
    };


    const handleApprove = (id: number) => {
        setRowData((prev) =>
            prev.map((buyer) =>
                buyer.id === id
                    ? { ...buyer, documentsStatus: 'تأیید شده', accountStatus: 'فعال' }
                    : buyer
            )
        );
    };

    const handleReject = (id: number) => {
        setRowData((prev) =>
            prev.map((buyer) =>
                buyer.id === id
                    ? { ...buyer, documentsStatus: 'رد شده', accountStatus: 'غیرفعال' }
                    : buyer
            )
        );
    };

    const [columnDefs] = useState<ColDef<BuyerVerification>[]>([
        {
            field: 'id',
            headerName: 'شناسه',
            width: 90,
            cellStyle: { fontWeight: 600 },
        },
        {
            field: 'name',
            headerName: 'نام خریدار',
            sortable: true,
            filter: true,
            flex: 1,
            cellStyle: { fontWeight: 500 },
        },
        {
            field: 'company',
            headerName: 'شرکت',
            sortable: true,
            filter: true,
            flex: 1,
            cellStyle: { color: '#555' },
        },
        {
            field: 'phone',
            headerName: 'شماره تماس',
            sortable: true,
            filter: true,
            cellStyle: { fontFamily: 'monospace' },
        },
        {
            field: 'nationalId',
            headerName: 'کد ملی',
            sortable: true,
            filter: true,
            cellStyle: { fontFamily: 'monospace' },
        },
        {
            field: 'registrationDate',
            headerName: 'تاریخ ثبت‌نام',
            sortable: true,
            filter: true,
            cellStyle: { color: '#777' },
        },
        {
            field: 'documentsStatus',
            headerName: 'وضعیت مدارک',
            cellRenderer: (params: any) => {
                const value = params.value as BuyerVerification['documentsStatus'];
                const config = {
                    'تأیید شده': {
                        label: 'تأیید شده',
                        color: '#43a047',
                        bg: '#e8f5e9',
                        border: '#c8e6c9',
                    },
                    'رد شده': {
                        label: 'رد شده',
                        color: '#e53935',
                        bg: '#ffebee',
                        border: '#ffcdd2',
                    },
                    'در انتظار بررسی': {
                        label: 'در انتظار بررسی',
                        color: '#fb8c00',
                        bg: '#fff3e0',
                        border: '#ffe0b2',
                    },
                };
                const { color, bg, border, label } = config[value];
                return (
                    <Chip
                        label={label}
                        size="small"
                        sx={{
                            fontWeight: 600,
                            border: `1px solid ${border}`,
                            backgroundColor: bg,
                            color,
                            borderRadius: '8px',
                            minWidth: '110px',
                            justifyContent: 'center',
                        }}
                    />
                );
            },
        },
        {
            field: 'accountStatus',
            headerName: 'وضعیت حساب',
            cellRenderer: (params: any) => {
                const value = params.value as BuyerVerification['accountStatus'];
                const isActive = value === 'فعال';
                return (
                    <Chip
                        label={value}
                        size="small"
                        sx={{
                            fontWeight: 600,
                            borderRadius: '8px',
                            backgroundColor: isActive ? '#388e3c' : '#f5f5f5',
                            color: isActive ? '#fff' : '#777',
                            minWidth: '80px',
                            justifyContent: 'center',
                        }}
                    />
                );
            },
        },
        {
            headerName: 'اقدامات',
            minWidth: 180,
            cellRenderer: (params: any) => {
                const buyer = params.data as BuyerVerification;
                const isApproved = buyer.documentsStatus === 'تأیید شده';
                const isRejected = buyer.documentsStatus === 'رد شده';

                return (
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                        }}
                    >
                        <Tooltip title="مشاهده مدارک" arrow>
                            <Button
                                size="small"
                                variant="outlined"
                                color="primary"
                                onClick={() => handleOpenModal(buyer)}
                                sx={{
                                    minWidth: 0,
                                    p: 1,
                                    borderRadius: '8px',
                                    '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.08)' },
                                }}
                            >
                                <VisibilityIcon fontSize="small" />
                            </Button>
                        </Tooltip>


                        <Tooltip title="تأیید مدارک" arrow>
                            <Button
                                variant="contained"
                                color="success"
                                size="small"
                                onClick={() => handleApprove(buyer.id)}
                                disabled={isApproved}
                                sx={{
                                    minWidth: 0,
                                    p: 1,
                                    borderRadius: '8px',
                                    opacity: isApproved ? 0.6 : 1,
                                    '&:hover': { transform: 'translateY(-1px)' },
                                }}
                            >
                                <CheckCircleIcon fontSize="small" />
                            </Button>
                        </Tooltip>

                        <Tooltip title="رد مدارک" arrow>
                            <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={() => handleReject(buyer.id)}
                                disabled={isRejected}
                                sx={{
                                    minWidth: 0,
                                    p: 1,
                                    borderRadius: '8px',
                                    opacity: isRejected ? 0.6 : 1,
                                    '&:hover': { transform: 'translateY(-1px)' },
                                }}
                            >
                                <CancelIcon fontSize="small" />
                            </Button>
                        </Tooltip>
                    </Stack>
                );
            },
        },

    ]);

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    '& .ag-theme-alpine': {
                        '--ag-border-color': '#e0e0e0',
                        '--ag-header-background-color': '#fafafa',
                        '--ag-row-hover-color': '#f9f9f9',
                        '--ag-selected-row-background-color': '#e3f2fd',
                        '--ag-font-family': 'IRANSans, sans-serif',
                        borderRadius: '12px',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                    },
                }}
            >
                <DataGrid<BuyerVerification>
                    rowData={rowData}
                    columnDefs={columnDefs}
                />
            </Box>

            <BuyersDetailModal
                open={modalOpen}
                onClose={handleCloseModal}
                rowData={selectedRow}
            />
        </>
    );
};

export default BuyersVerificationTable;
