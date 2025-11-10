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
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import {
    Box,
    Button,
    Chip,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material';

interface AdminRequest {
    id: number;
    requesterName: string;
    requestType: string;
    date: string;
    status: 'در انتظار' | 'در حال بررسی' | 'تایید شده' | 'رد شده';
    details: string;
}

const mockData: AdminRequest[] = [
    {
        id: 1,
        requesterName: 'علی رضایی',
        requestType: 'تایید حساب کاربری',
        date: '1403/08/08',
        status: 'در انتظار',
        details: 'درخواست فعال‌سازی حساب فروشنده',
    },
    {
        id: 2,
        requesterName: 'مریم احمدی',
        requestType: 'ویرایش اطلاعات فروشگاه',
        date: '1403/08/07',
        status: 'تایید شده',
        details: 'اصلاح آدرس فروشگاه در پروفایل',
    },
    {
        id: 3,
        requesterName: 'حسین کریمی',
        requestType: 'بازیابی رمز عبور',
        date: '1403/08/06',
        status: 'در حال بررسی',
        details: 'کاربر چندبار رمز اشتباه وارد کرده است',
    },
    {
        id: 4,
        requesterName: 'زهرا حسینی',
        requestType: 'حذف حساب کاربری',
        date: '1403/08/05',
        status: 'رد شده',
        details: 'حساب در حال استفاده است',
    },
];

const NewAdminRequestsTable: React.FC = () => {
    const [rowData, setRowData] = useState<AdminRequest[]>(mockData);

    const StatusRenderer = (params: ICellRendererParams<AdminRequest>) => {
        const status = params.value as AdminRequest['status'];
        const statusStyles: Record<
            AdminRequest['status'],
            { color: 'default' | 'success' | 'warning' | 'error' | 'info'; icon: React.ReactNode }
        > = {
            'در انتظار': { color: 'info', icon: <HourglassBottomIcon sx={{ fontSize: 18 }} /> },
            'در حال بررسی': { color: 'warning', icon: <AccessTimeIcon sx={{ fontSize: 18 }} /> },
            'تایید شده': { color: 'success', icon: <CheckCircleIcon sx={{ fontSize: 18 }} /> },
            'رد شده': { color: 'error', icon: <HighlightOffIcon sx={{ fontSize: 18 }} /> },
        };

        const { color, icon } = statusStyles[status];

        return (
            <Chip
                label={
                    <Box display="flex" alignItems="center" gap={0.5}>
                        {icon}
                        <Typography variant="body2" fontWeight={600}>
                            {status}
                        </Typography>
                    </Box>
                }
                color={color}
                size="small"
                variant="filled"
            />
        );
    };


    const handleApprove = (id: number) => {
        setRowData(prev =>
            prev.map(r =>
                r.id === id ? { ...r, status: 'تایید شده' } : r
            )
        );
    };

    const handleReject = (id: number) => {
        setRowData(prev =>
            prev.map(r =>
                r.id === id ? { ...r, status: 'رد شده' } : r
            )
        );
    };

    const columnDefs = useMemo<ColDef<AdminRequest>[]>(
        () => [
            { field: 'requesterName', headerName: 'نام درخواست‌دهنده', flex: 1.2 },
            { field: 'requestType', headerName: 'نوع درخواست', flex: 1.2 },
            { field: 'date', headerName: 'تاریخ ارسال', width: 130 },
            { field: 'status', headerName: 'وضعیت', width: 160, cellRenderer: StatusRenderer },
            { field: 'details', headerName: 'توضیحات', flex: 2 },
            {
                headerName: 'اقدامات',
                minWidth: 180,
                cellRenderer: (params: ICellRendererParams<AdminRequest>) => {
                    const request = params.data;
                    const isApproved = request.status === 'تایید شده';
                    const isRejected = request.status === 'رد شده';

                    return (
                        <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="center"
                            alignItems="center"
                            height="100%"
                        >


                            <Tooltip title="تأیید درخواست" arrow>
                                <Button
                                    variant="contained"
                                    color="success"
                                    size="small"
                                    onClick={() => handleApprove(request.id)}
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

                            <Tooltip title="رد درخواست" arrow>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    onClick={() => handleReject(request.id)}
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
        ],
        []
    );

    return <DataGrid<AdminRequest> rowData={rowData} columnDefs={columnDefs} rtl width="100%" />;
};

export default NewAdminRequestsTable;
