'use client';

import { useState } from 'react';

import AddButton from '@/components/common/AddButton';
import ConfirmationModal from '@/components/common/ConfirmationModal';
import CustomFormModal, {
  FormField,
} from '@/components/common/CustomFormModal';
import PageTitle from '@/components/common/PageTitle';
import WholeSellersTable, {
  WholeSeller,
} from '@/components/sellers/whole/WholeSellersTable';
import fa from '@/i18n/fa';
import { Box } from '@mui/material';

const WholeSellers = () => {
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editingSeller, setEditingSeller] = useState<WholeSeller | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [rowData, setRowData] = useState<WholeSeller[]>([]); 

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setEditMode(false);
        setEditingSeller(null);
    };

    const handleAddSeller = (data: Omit<WholeSeller, 'id'>) => {
        const newSeller: WholeSeller = {
            ...data,
            id: rowData.length ? (Math.max(...rowData.map(s => parseInt(s.id))) + 1).toString() : '1',
        };
        setRowData(prev => [...prev, newSeller]);
        handleClose();
    };

    const handleEdit = (seller: WholeSeller) => {
        setEditMode(true);
        setEditingSeller(seller);
        handleOpen();
    };

    const handleUpdateSeller = (data: Omit<WholeSeller, 'id'>) => {
        if (!editingSeller) return;
        setRowData(prev => prev.map(s => s.id === editingSeller.id ? { ...s, ...data } : s));
        handleClose();
    };

    const handleDelete = (id: string) => {
        setSelectedId(id);
        setConfirmOpen(true);
    };

    const confirmDelete = () => {
        if (!selectedId) return;
        setRowData(prev => prev.filter(s => s.id !== selectedId));
        setConfirmOpen(false);
        setSelectedId(null);
    };

    const formFields: FormField[] = [
        { name: 'firstName', label: 'نام', fieldType: 'text', required: true },
        { name: 'lastName', label: 'نام خانوادگی', fieldType: 'text', required: true },
        { name: 'nationalCode', label: 'کد ملی', fieldType: 'text', required: true },
        { name: 'phone', label: 'شماره تماس', fieldType: 'phone', required: true },
        { name: 'email', label: 'ایمیل', fieldType: 'text', required: true },
        { name: 'shopName', label: 'نام مغازه', fieldType: 'text', required: true },
        { name: 'city', label: 'شهر', fieldType: 'text', required: true },
        { name: 'province', label: 'استان', fieldType: 'text', required: true },
    ];

    const getDefaultValues = () => {
        if (editMode && editingSeller) {
            return {
                firstName: editingSeller.firstName || '',
                lastName: editingSeller.lastName || '',
                nationalCode: editingSeller.nationalCode || '',
                phone: editingSeller.phone || '',
                email: editingSeller.email || '',
                shopName: editingSeller.shopName || '',
                city: editingSeller.city || '',
                province: editingSeller.province || '',
            };
        }
        return {};
    };

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <PageTitle title={fa.wholeSellers} />

            <Box display="flex" justifyContent="flex-start" mb={2}>
                <AddButton label="افزودن فروشنده عمده جدید" onClick={handleOpen} />
            </Box>

            <WholeSellersTable
                data={rowData}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <CustomFormModal
                open={open}
                onClose={handleClose}
                title={editMode ? 'ویرایش فروشنده عمده' : 'افزودن فروشنده عمده جدید'}
                defaultValues={getDefaultValues()}
                fields={formFields}
                onSubmit={editMode ? handleUpdateSeller : handleAddSeller}
                submitLabel={editMode ? 'ویرایش' : 'افزودن'}
                cancelLabel="لغو"
            />

            <ConfirmationModal
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={confirmDelete}
                message="آیا از حذف این فروشنده اطمینان دارید؟"
                confirmLabel="حذف"
                cancelLabel="لغو"
            />
        </Box>
    );
};

export default WholeSellers;
