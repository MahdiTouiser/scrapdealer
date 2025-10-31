'use client';

import React, {
  useCallback,
  useState,
} from 'react';

import type { ColDef } from 'ag-grid-community';

import DataGrid from '@/components/DataGrid';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import StarIcon from '@mui/icons-material/Star';
import {
  Box,
  Chip,
  Switch,
  Tooltip,
} from '@mui/material';

interface Supporter {
    id: number;
    fullName: string;
    gender: "مرد" | "زن";
    status: "فعال" | "غیرفعال";
    score: number;
    username: string;
    password: string;
}

const SupportersTable: React.FC = () => {
    const [rowData, setRowData] = useState<Supporter[]>([
        { id: 1, fullName: "مهدی تویسرکانی", gender: "مرد", status: "فعال", score: 4, username: "mehdi123", password: "123456" },
        { id: 2, fullName: "سارا محمدی", gender: "زن", status: "فعال", score: 5, username: "sara_m", password: "abcdef" },
        { id: 3, fullName: "علی رضایی", gender: "مرد", status: "غیرفعال", score: 3, username: "ali_r", password: "password123" },
        { id: 4, fullName: "نگار موسوی", gender: "زن", status: "فعال", score: 4, username: "negar_m", password: "negar2025" },
    ]);

    const handleStatusToggle = useCallback((id: number) => {
        setRowData((prev) =>
            prev.map((supporter) =>
                supporter.id === id
                    ? {
                        ...supporter,
                        status: supporter.status === "فعال" ? "غیرفعال" : "فعال",
                    }
                    : supporter
            )
        );
    }, []);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        alert("پسورد کپی شد: " + text);
    };

    const [columnDefs] = useState<ColDef<Supporter>[]>([
        { field: "fullName", headerName: "نام و نام خانوادگی", flex: 1, sortable: true, filter: true },
        {
            field: "gender",
            headerName: "جنسیت",
            sortable: true,
            filter: true,
            cellRenderer: (params) =>
                params.value === "مرد" ? "♂ مرد" : "♀ زن",
        },
        {
            field: "score",
            headerName: "امتیاز",
            width: 150,
            sortable: true,
            filter: true,
            cellRenderer: (params) => (
                <Box display="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                        <StarIcon
                            key={i}
                            style={{
                                color: i < params.value ? "#FFD700" : "#E0E0E0",
                                fontSize: 18,
                            }}
                        />
                    ))}
                </Box>
            ),
        },
        { field: "username", headerName: "نام کاربری ", flex: 1, sortable: true, filter: true },
        {
            field: "password",
            headerName: "رمز عبور",
            flex: 1,
            cellRenderer: (params) => (
                <Tooltip title="کلیک کنید برای کپی">
                    <Box
                        display="flex"
                        alignItems="center"
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleCopy(params.value)}
                    >
                        {params.value} <ContentCopyIcon fontSize="small" sx={{ ml: 0.5 }} />
                    </Box>
                </Tooltip>
            ),
        },
        {
            field: "status",
            headerName: "وضعیت",
            width: 150,
            sortable: true,
            filter: true,
            cellRenderer: (params) => (
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Switch
                        checked={params.value === "فعال"}
                        onChange={() => handleStatusToggle(params.data.id)}
                        color="success"
                    />
                    <Chip
                        label={params.value}
                        color={params.value === "فعال" ? "success" : "error"}
                        size="small"
                        sx={{ ml: 1 }}
                    />
                </Box>
            ),
            cellStyle: { textAlign: "center" },
        },
    ]);

    return <DataGrid<Supporter> rowData={rowData} columnDefs={columnDefs} />;
};

export default SupportersTable;
