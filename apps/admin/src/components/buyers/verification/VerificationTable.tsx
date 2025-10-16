"use client";

import React, { useState } from 'react';

import type { ColDef } from 'ag-grid-community';

import DataGrid from '@/components/DataGrid';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
    Box,
    Button,
    Chip,
    Stack,
} from '@mui/material';

interface BuyerVerification {
    id: number;
    name: string;
    company: string;
    phone: string;
    nationalId: string;
    registrationDate: string;
    documentsStatus: "تأیید شده" | "در انتظار بررسی" | "رد شده";
    accountStatus: "فعال" | "غیرفعال";
}

const VerificationTable: React.FC = () => {
    const [rowData, setRowData] = useState<BuyerVerification[]>([
        {
            id: 1,
            name: "مهدی تویسرکانی",
            company: "ضایعات چی",
            phone: "09121234567",
            nationalId: "1234567890",
            registrationDate: "1403/07/15",
            documentsStatus: "تأیید شده",
            accountStatus: "فعال",
        },
        {
            id: 2,
            name: "سارا محمدی",
            company: "فولاد ایرانیان",
            phone: "09351234567",
            nationalId: "0098765432",
            registrationDate: "1403/06/20",
            documentsStatus: "در انتظار بررسی",
            accountStatus: "غیرفعال",
        },
        {
            id: 3,
            name: "علی رضایی",
            company: "شرکت بازیافت آذر",
            phone: "09135554433",
            nationalId: "1122334455",
            registrationDate: "1403/07/02",
            documentsStatus: "رد شده",
            accountStatus: "غیرفعال",
        },
        {
            id: 4,
            name: "نگار موسوی",
            company: "آهن قراضه شرق",
            phone: "09221112233",
            nationalId: "5544332211",
            registrationDate: "1403/07/10",
            documentsStatus: "تأیید شده",
            accountStatus: "فعال",
        },
    ]);

    const handleApprove = (id: number) => {
        setRowData((prev) =>
            prev.map((buyer) =>
                buyer.id === id
                    ? { ...buyer, documentsStatus: "تأیید شده", accountStatus: "فعال" }
                    : buyer
            )
        );
    };

    const handleReject = (id: number) => {
        setRowData((prev) =>
            prev.map((buyer) =>
                buyer.id === id
                    ? { ...buyer, documentsStatus: "رد شده", accountStatus: "غیرفعال" }
                    : buyer
            )
        );
    };

    const [columnDefs] = useState<ColDef<BuyerVerification>[]>([
        {
            field: "id",
            headerName: "شناسه",
            width: 90,
            cellStyle: { fontWeight: 600, color: '#1976d2' }
        },
        {
            field: "name",
            headerName: "نام خریدار",
            sortable: true,
            filter: true,
            flex: 1,
            cellStyle: { fontWeight: 500 }
        },
        {
            field: "company",
            headerName: "شرکت",
            sortable: true,
            filter: true,
            flex: 1,
            cellStyle: { color: '#666' }
        },
        {
            field: "phone",
            headerName: "شماره تماس",
            sortable: true,
            filter: true,
            cellStyle: { fontFamily: 'monospace' }
        },
        {
            field: "nationalId",
            headerName: "کد ملی",
            sortable: true,
            filter: true,
            cellStyle: { fontFamily: 'monospace' }
        },
        {
            field: "registrationDate",
            headerName: "تاریخ ثبت‌نام",
            sortable: true,
            filter: true,
            cellStyle: { color: '#666' }
        },
        {
            field: "documentsStatus",
            headerName: "وضعیت مدارک",
            cellRenderer: (params: any) => {
                const value = params.value as BuyerVerification["documentsStatus"];
                const config = {
                    "تأیید شده": {
                        color: "success" as const,
                        sx: {
                            fontWeight: 600,
                            backgroundColor: '#e8f5e9',
                            borderColor: '#4caf50'
                        }
                    },
                    "رد شده": {
                        color: "error" as const,
                        sx: {
                            fontWeight: 600,
                            backgroundColor: '#ffebee',
                            borderColor: '#f44336'
                        }
                    },
                    "در انتظار بررسی": {
                        color: "warning" as const,
                        sx: {
                            fontWeight: 600,
                            backgroundColor: '#fff3e0',
                            borderColor: '#ff9800'
                        }
                    },
                };
                return (
                    <Chip
                        label={value}
                        color={config[value].color}
                        variant="outlined"
                        size="small"
                        sx={config[value].sx}
                    />
                );
            },
        },
        {
            field: "accountStatus",
            headerName: "وضعیت حساب",
            cellRenderer: (params: any) => {
                const value = params.value as BuyerVerification["accountStatus"];
                const isActive = value === "فعال";
                return (
                    <Chip
                        label={value}
                        color={isActive ? "success" : "default"}
                        variant="filled"
                        size="small"
                        sx={{
                            fontWeight: 600,
                            ...(isActive && {
                                backgroundColor: '#4caf50',
                                color: '#fff'
                            }),
                            ...(!isActive && {
                                backgroundColor: '#e0e0e0',
                                color: '#666'
                            })
                        }}
                    />
                );
            },
        },
        {
            headerName: "اقدامات",
            cellRenderer: (params: any) => {
                const buyer = params.data as BuyerVerification;
                const isApproved = buyer.documentsStatus === "تأیید شده";
                const isRejected = buyer.documentsStatus === "رد شده";

                return (
                    <Stack direction="row" spacing={1} sx={{ height: '100%', alignItems: 'center' }}>
                        <Button
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={() => handleApprove(buyer.id)}
                            disabled={isApproved}
                            startIcon={<CheckCircleIcon />}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 600,
                                boxShadow: isApproved ? 'none' : 2,
                                '&:hover': {
                                    boxShadow: isApproved ? 'none' : 4,
                                }
                            }}
                        >
                            تأیید
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => handleReject(buyer.id)}
                            disabled={isRejected}
                            startIcon={<CancelIcon />}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 600,
                                '&:hover': {
                                    backgroundColor: isRejected ? 'transparent' : 'rgba(244, 67, 54, 0.04)',
                                }
                            }}
                        >
                            رد
                        </Button>
                    </Stack>
                );
            },
            minWidth: 200,
        },
    ]);

    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            '& .ag-theme-alpine': {
                '--ag-border-color': '#e0e0e0',
                '--ag-header-background-color': '#f5f5f5',
                '--ag-row-hover-color': '#f9f9f9',
                '--ag-selected-row-background-color': '#e3f2fd',
            }
        }}>
            <DataGrid<BuyerVerification> rowData={rowData} columnDefs={columnDefs} />
        </Box>
    );
};

export default VerificationTable;