"use client";

import React, { useState } from 'react';

import type { ColDef } from 'ag-grid-community';

import DataGrid from '@/components/DataGrid';
import {
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
        { field: "id", headerName: "شناسه", width: 90 },
        { field: "name", headerName: "نام خریدار", sortable: true, filter: true, flex: 1 },
        { field: "company", headerName: "شرکت", sortable: true, filter: true },
        { field: "phone", headerName: "شماره تماس", sortable: true, filter: true },
        { field: "nationalId", headerName: "کد ملی", sortable: true, filter: true },
        { field: "registrationDate", headerName: "تاریخ ثبت‌نام", sortable: true, filter: true },
        {
            field: "documentsStatus",
            headerName: "وضعیت مدارک",
            cellRenderer: (params: any) => {
                const value = params.value as BuyerVerification["documentsStatus"];
                const color =
                    value === "تأیید شده"
                        ? "success"
                        : value === "رد شده"
                            ? "error"
                            : "warning";
                return <Chip label={value} color={color} variant="outlined" />;
            },
        },
        {
            field: "accountStatus",
            headerName: "وضعیت حساب",
            cellRenderer: (params: any) => {
                const value = params.value as BuyerVerification["accountStatus"];
                const color = value === "فعال" ? "success" : "default";
                return <Chip label={value} color={color} variant="filled" />;
            },
        },
        {
            headerName: "اقدامات",
            cellRenderer: (params: any) => {
                const buyer = params.data as BuyerVerification;
                return (
                    <Stack direction="row" spacing={1}>
                        <Button
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={() => handleApprove(buyer.id)}
                            disabled={buyer.documentsStatus === "تأیید شده"}
                        >
                            تأیید
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => handleReject(buyer.id)}
                            disabled={buyer.documentsStatus === "رد شده"}
                        >
                            رد
                        </Button>
                    </Stack>
                );
            },
        },
    ]);

    return <DataGrid<BuyerVerification> rowData={rowData} columnDefs={columnDefs} />;
};

export default VerificationTable;
