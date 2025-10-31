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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PersonIcon from '@mui/icons-material/Person';
import {
  Box,
  Chip,
  Typography,
} from '@mui/material';

interface ReviewedRequest {
    id: number;
    requesterName: string;   // نام درخواست دهنده
    requestType: string;     // نوع درخواست
    reviewerName: string;    // بررسی کننده
    reviewDate: string;      // تاریخ بررسی
    status: 'تایید شده' | 'رد شده';
    comment: string;         // توضیحات بررسی
}

const mockReviewedData: ReviewedRequest[] = [
    {
        id: 1,
        requesterName: 'علی رضایی',
        requestType: 'تغییر اطلاعات فروشنده',
        reviewerName: 'ادمین ارشد',
        reviewDate: '1403/08/06',
        status: 'تایید شده',
        comment: 'اطلاعات با مدارک مطابقت داشت.',
    },
    {
        id: 2,
        requesterName: 'مریم احمدی',
        requestType: 'درخواست حذف حساب',
        reviewerName: 'پشتیبان شماره 2',
        reviewDate: '1403/08/05',
        status: 'رد شده',
        comment: 'حساب فعال است و حذف ممکن نیست.',
    },
    {
        id: 3,
        requesterName: 'حسین کریمی',
        requestType: 'درخواست بازیابی رمز عبور',
        reviewerName: 'ادمین ارشد',
        reviewDate: '1403/08/04',
        status: 'تایید شده',
        comment: 'رمز عبور با موفقیت بازنشانی شد.',
    },
];

const ReviewedAdminRequestsTable: React.FC = () => {
    const [rowData] = useState<ReviewedRequest[]>(mockReviewedData);

    // Custom renderer for status
    const StatusRenderer = (params: ICellRendererParams<ReviewedRequest>) => {
        const status = params.value as ReviewedRequest['status'];
        const isApproved = status === 'تایید شده';
        return (
            <Chip
                label={
                    <Box display="flex" alignItems="center" gap={0.5}>
                        {isApproved ? (
                            <CheckCircleIcon sx={{ fontSize: 18 }} />
                        ) : (
                            <HighlightOffIcon sx={{ fontSize: 18 }} />
                        )}
                        <Typography variant="body2" fontWeight={600}>
                            {status}
                        </Typography>
                    </Box>
                }
                color={isApproved ? 'success' : 'error'}
                size="small"
                variant="filled"
            />
        );
    };

    // Custom renderer for reviewer
    const ReviewerRenderer = (params: ICellRendererParams<ReviewedRequest>) => (
        <Box display="flex" alignItems="center" gap={0.5}>
            <PersonIcon sx={{ color: '#666', fontSize: 18 }} />
            <Typography variant="body2">{params.value}</Typography>
        </Box>
    );

    const columnDefs = useMemo<ColDef<ReviewedRequest>[]>(
        () => [
            { field: 'requesterName', headerName: 'نام درخواست‌دهنده', flex: 1.2 },
            { field: 'requestType', headerName: 'نوع درخواست', flex: 1.2 },
            { field: 'reviewerName', headerName: 'بررسی‌کننده', flex: 1, cellRenderer: ReviewerRenderer },
            { field: 'reviewDate', headerName: 'تاریخ بررسی', width: 130 },
            { field: 'status', headerName: 'وضعیت نهایی', width: 150, cellRenderer: StatusRenderer },
            { field: 'comment', headerName: 'توضیحات بررسی', flex: 2 },
        ],
        []
    );

    return (
        <DataGrid<ReviewedRequest>
            rowData={rowData}
            columnDefs={columnDefs}
            rtl
            width="100%"
        />
    );
};

export default ReviewedAdminRequestsTable;
