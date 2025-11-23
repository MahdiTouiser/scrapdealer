'use client';

import { useState } from 'react';

import AddButton from '@/components/common/AddButton';
import ConfirmationModal from '@/components/common/ConfirmationModal';
import CustomFormModal, {
    FormField,
} from '@/components/common/CustomFormModal';
import PageTitle from '@/components/common/PageTitle';
import SellersTable, { Seller } from '@/components/sellers/SellersTable';
import { useApi } from '@/hooks/useApi';
import fa from '@/i18n/fa';
import { Box } from '@mui/material';

const Sellers = () => {
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editingSeller, setEditingSeller] = useState<Seller | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const { data: sellers, loading, refetch: refetchSellers } = useApi<{ data: Seller[]; totalCount: number }>({
        key: ['get-sellers'],
        url: '/Sellers/Admin/Get',
    });

    const { mutate: addSeller, loading: adding } = useApi<void, Omit<Seller, 'id'>>({
        key: ['add-seller'],
        url: '/Sellers',
        method: 'POST',
        onSuccess: 'فروشنده با موفقیت اضافه شد',
        onError: 'افزودن فروشنده با خطا مواجه شد',
    });

    const { mutate: updateSeller, loading: updating } = useApi<void, Seller>({
        key: ['update-seller'],
        url: (data) => `/Sellers/${data?.id}`,
        method: 'PUT',
        onSuccess: 'فروشنده با موفقیت ویرایش شد',
        onError: 'ویرایش فروشنده با خطا مواجه شد',
    });

    const { mutate: deleteSeller, loading: deleting } = useApi<void, string>({
        key: ['delete-seller'],
        url: (id) => `/Sellers/${id}`,
        method: 'DELETE',
        onSuccess: 'فروشنده با موفقیت حذف شد',
        onError: 'حذف فروشنده با خطا مواجه شد',
    });

    const { mutateAsync: fetchSellerById, loading: fetching } = useApi<Seller, string>({
        key: ['get-seller-by-id'],
        url: (id) => `/Sellers/${id}`,
        method: 'GET',
        enabled: false,
    });

    const formFields: FormField[] = [
        { name: 'firstName', label: 'نام', fieldType: 'text', required: true },
        { name: 'lastName', label: 'نام خانوادگی', fieldType: 'text', required: true },
        { name: 'nationalCode', label: 'کد ملی', fieldType: 'text', required: true },
        { name: 'city', label: 'شهر', fieldType: 'text', required: true },
        { name: 'province', label: 'استان', fieldType: 'text', required: true },
        { name: 'postalCode', label: 'کد پستی', fieldType: 'text', required: true },
        { name: 'addressDescription', label: 'آدرس', fieldType: 'text', required: true },
        { name: 'email', label: 'ایمیل', fieldType: 'text', required: true },
        {
            name: 'gender',
            label: 'جنسیت',
            fieldType: 'select',
            required: true,
            options: [
                { label: 'مرد', value: 'Male' },
                { label: 'زن', value: 'Female' },
            ],
        },
        {
            name: 'personType',
            label: 'نوع شخص',
            fieldType: 'select',
            required: true,
            options: [
                { label: 'حقیقی', value: 'real' },
                { label: 'حقوقی', value: 'legal' },
            ],
        },
    ];


    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setEditMode(false);
        setEditingSeller(null);
    };

    const handleAddSeller = async (data: Omit<Seller, 'id'>) => {
        await addSeller(data, {
            onSuccess: () => {
                handleClose();
                refetchSellers();
            },
        });
    };

    const handleEdit = async (id: string) => {
        try {
            setEditMode(true);
            const seller = await fetchSellerById(id);
            setEditingSeller(seller);
            handleOpen();
        } catch (err) {
            console.error('Failed to fetch seller:', err);
        }
    };

    const handleUpdateSeller = async (data: Omit<Seller, 'id'>) => {
        if (!editingSeller) return;
        const body: Seller = { ...editingSeller, ...data };
        await updateSeller(body, {
            onSuccess: () => {
                handleClose();
                refetchSellers();
            },
        });
    };

    const handleDelete = (id: string) => {
        setSelectedId(id);
        setConfirmOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedId) return;
        await deleteSeller(selectedId, {
            onSuccess: () => {
                setConfirmOpen(false);
                setSelectedId(null);
                refetchSellers();
            },
            onError: () => setConfirmOpen(false),
        });
    };

    const getDefaultValues = () => {
        if (editMode && editingSeller) {
            return {
                firstName: editingSeller.firstName || '',
                lastName: editingSeller.lastName || '',
                nationalCode: editingSeller.nationalCode || '',
                city: editingSeller.city || '',
                province: editingSeller.province || '',
                postalCode: editingSeller.postalCode || '',
                addressDescription: editingSeller.addressDescription || '',
                email: editingSeller.email || '',
                gender: editingSeller.gender || 'Male',
                personType: editingSeller.personType || 'real',
            };
        }
        return {};
    };

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <PageTitle title={fa.sellers} />
            <Box display="flex" justifyContent="flex-start" mb={2}>
                <AddButton label="افزودن فروشنده جدید" onClick={handleOpen} />
            </Box>

            <SellersTable
                data={sellers?.data || []}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <CustomFormModal
                open={open}
                onClose={handleClose}
                title={editMode ? 'ویرایش فروشنده' : 'افزودن فروشنده جدید'}
                defaultValues={getDefaultValues()}
                fields={formFields}
                onSubmit={editMode ? handleUpdateSeller : handleAddSeller}
                submitLabel={editMode ? 'ویرایش' : 'افزودن'}
                cancelLabel="لغو"
                submitLoading={adding || updating || fetching}
            />

            <ConfirmationModal
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={confirmDelete}
                message="آیا از حذف این فروشنده اطمینان دارید؟"
                confirmLabel="حذف"
                cancelLabel="لغو"
                loading={deleting}
            />
        </Box>
    );
};

export default Sellers;
