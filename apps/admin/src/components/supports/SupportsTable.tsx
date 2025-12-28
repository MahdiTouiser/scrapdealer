'use client';

import React, { useState } from 'react';

import type { ColDef } from 'ag-grid-community';
import Image from 'next/image';

import Loading from '@/components/common/Loading';
import DataGrid from '@/components/DataGrid';
import ImageIcon from '@mui/icons-material/Image';
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Tooltip,
} from '@mui/material';

import ActionsCell from '../common/ActionCell';

export interface Support {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    imageUrl?: string;
}

interface Props {
    data: Support[];
    loading?: boolean;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onReward?: (userId: string) => void
}

const SupportsTable: React.FC<Props> = ({ data, loading, onEdit, onDelete, onReward }) => {
    const [openImage, setOpenImage] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleOpenImage = (url: string) => {
        setSelectedImage(url);
        setOpenImage(true);
    };

    const handleCloseImage = () => {
        setOpenImage(false);
        setSelectedImage(null);
    };

    const columnDefs: ColDef<Support>[] = [
        {
            headerName: 'ردیف',
            valueGetter: (params) => params.node.rowIndex + 1,
            width: 100,
            sortable: false,
            filter: false,
            cellStyle: { textAlign: 'center' },
        },
        { field: 'firstName', headerName: 'نام', flex: 1 },
        { field: 'lastName', headerName: 'نام خانوادگی', flex: 1 },
        { field: 'phoneNumber', headerName: 'شماره تماس', flex: 1 },
        { field: 'username', headerName: 'نام کاربری', flex: 1 },
        {
            headerName: 'عکس ثبت نام',
            field: 'imageUrl',
            width: 120,
            sortable: false,
            filter: false,
            cellRenderer: (params) => {
                // if (!params.value) return null;
                return (
                    <Tooltip title="عکس فرم ثبت نامی">
                        <IconButton size="small" onClick={() => handleOpenImage(params.value)}>
                            <ImageIcon />
                        </IconButton>
                    </Tooltip>
                );
            },
        },
        {
            headerName: 'عملیات',
            minWidth: 160,
            filter: false,
            cellRenderer: ActionsCell,
            cellRendererParams: { onEdit, onDelete, onReward },
        },
    ];

    if (loading) {
        return (
            <Box mt={6}>
                <Loading />
            </Box>
        );
    }

    return (
        <>
            <DataGrid<Support> rowData={data} columnDefs={columnDefs} />

            <Dialog open={openImage} onClose={handleCloseImage} maxWidth="sm" fullWidth>
                <DialogContent sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                    {selectedImage && (
                        <Box sx={{ position: 'relative', width: '100%', height: 400 }}>
                            <Image
                                src={selectedImage}
                                alt="فرم ثبت نام"
                                fill
                                style={{ objectFit: 'contain', borderRadius: 8 }}
                                priority
                            />
                        </Box>
                    )}
                </DialogContent>
            </Dialog>

        </>
    );
};

export default SupportsTable;
