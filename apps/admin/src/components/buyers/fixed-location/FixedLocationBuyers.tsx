'use client';

import React, {
    useMemo,
    useState,
} from 'react';

import {
    ColDef,
    ICellRendererParams,
} from 'ag-grid-community';

import AddButton from '@/components/common/AddButton';
import ConfirmationModal from '@/components/common/ConfirmationModal';
import CustomFormModal, {
    FormField,
} from '@/components/common/CustomFormModal';
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
    vehiclePlate: string;
    rating: number;
}

const initialData: FixedBuyer[] = [
    { id: 1, fullName: 'علی رضایی', shopName: 'مغازه الف', shopAddress: 'تهران، میدان آزادی', phone: '09123456789', wasteType: 'کاغذ', vehiclePlate: '۱۲ ط ۴۵۶ ایران ۵۰', rating: 4.5 },
    { id: 2, fullName: 'مریم احمدی', shopName: 'مغازه ب', shopAddress: 'تهران، خیابان انقلاب', phone: '09129876543', wasteType: 'پلاستیک', vehiclePlate: '۲۳ ب ۱۲۳ ایران ۶۵', rating: 3.8 },
    { id: 3, fullName: 'حسین کریمی', shopName: 'مغازه ج', shopAddress: 'تهران، بلوار کشاورز', phone: '09121112222', wasteType: 'فلز', vehiclePlate: '۵۴ ط ۷۸۹ ایران ۳۲', rating: 4.9 },
];

const FixedLocationBuyersTable: React.FC = () => {
    const [rowData, setRowData] = useState<FixedBuyer[]>(initialData);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editingBuyer, setEditingBuyer] = useState<FixedBuyer | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

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

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setEditMode(false);
        setEditingBuyer(null);
    };

    const handleAddBuyer = (data: Omit<FixedBuyer, 'id' | 'rating'>) => {
        const newBuyer: FixedBuyer = {
            ...data,
            id: rowData.length ? Math.max(...rowData.map(b => b.id)) + 1 : 1,
            rating: 0,
        };
        setRowData(prev => [...prev, newBuyer]);
        handleClose();
    };

    const handleEdit = (buyer: FixedBuyer) => {
        setEditMode(true);
        setEditingBuyer(buyer);
        handleOpen();
    };

    const handleUpdateBuyer = (data: Omit<FixedBuyer, 'id' | 'rating'>) => {
        if (!editingBuyer) return;
        setRowData(prev => prev.map(b => b.id === editingBuyer.id ? { ...b, ...data } : b));
        handleClose();
    };

    const handleDelete = (id: number) => {
        setSelectedId(id);
        setConfirmOpen(true);
    };

    const confirmDelete = () => {
        if (!selectedId) return;
        setRowData(prev => prev.filter(b => b.id !== selectedId));
        setConfirmOpen(false);
        setSelectedId(null);
    };

    const formFields: FormField[] = [
        { name: 'fullName', label: 'نام و نام خانوادگی', fieldType: 'text', required: true },
        { name: 'shopName', label: 'نام مغازه', fieldType: 'text', required: true },
        { name: 'shopAddress', label: 'آدرس مغازه', fieldType: 'text', required: true },
        { name: 'phone', label: 'شماره تماس', fieldType: 'phone', required: true },
        { name: 'wasteType', label: 'نوع ضایعاتی که خریداری شده', fieldType: 'text', required: true },
        { name: 'vehiclePlate', label: 'شماره پلاک', fieldType: 'text', required: true },
    ];

    const getDefaultValues = () => {
        if (editMode && editingBuyer) {
            return {
                fullName: editingBuyer.fullName,
                shopName: editingBuyer.shopName,
                shopAddress: editingBuyer.shopAddress,
                phone: editingBuyer.phone,
                wasteType: editingBuyer.wasteType,
                vehiclePlate: editingBuyer.vehiclePlate,
            };
        }
        return {};
    };

    const columnDefs = useMemo<ColDef<FixedBuyer>[]>(
        () => [
            { field: 'fullName', headerName: 'نام و نام خانوادگی', flex: 1.5 },
            { field: 'shopName', headerName: 'نام مغازه', flex: 1 },
            { field: 'shopAddress', headerName: 'آدرس مغازه', flex: 2 },
            { field: 'phone', headerName: 'شماره تماس', width: 140 },
            { field: 'wasteType', headerName: 'نوع ضایعاتی که خریداری شده', flex: 1.5, cellRenderer: WasteTypeRenderer },
            { field: 'vehiclePlate', headerName: 'شماره پلاک', width: 140 },
            { field: 'rating', headerName: 'امتیاز', width: 100, cellRenderer: RatingRenderer },
            {
                headerName: 'عملیات',
                field: 'actions',
                width: 120,
                cellRenderer: (params: ICellRendererParams<FixedBuyer>) => (
                    <Box display="flex" gap={1}>
                        <Chip label="ویرایش" color="primary" size="small" onClick={() => handleEdit(params.data!)} />
                        <Chip label="حذف" color="error" size="small" onClick={() => handleDelete(params.data!.id)} />
                    </Box>
                ),
            },
        ],
        [rowData]
    );

    return (
        <>
            <Box display="flex" justifyContent="flex-start" mb={2}>
                <AddButton label="افزودن خریدار مکان ثابت" onClick={handleOpen} />
            </Box>
            <Box sx={{ width: '100%', borderRadius: 1, overflow: 'hidden', boxShadow: 2 }}>
                <DataGrid<FixedBuyer> rowData={rowData} columnDefs={columnDefs} rtl width="100%" />
            </Box>
            <CustomFormModal
                open={open}
                onClose={handleClose}
                title={editMode ? 'ویرایش خریدار' : 'افزودن خریدار مکان ثابت'}
                defaultValues={getDefaultValues()}
                fields={formFields}
                onSubmit={editMode ? handleUpdateBuyer : handleAddBuyer}
                submitLabel={editMode ? 'ویرایش' : 'افزودن'}
                cancelLabel="لغو" /><ConfirmationModal
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={confirmDelete}
                message="آیا از حذف این خریدار اطمینان دارید؟"
                confirmLabel="حذف"
                cancelLabel="لغو" />
        </>
    );
};

export default FixedLocationBuyersTable;
