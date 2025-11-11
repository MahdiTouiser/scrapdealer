'use client';

import { useState } from 'react';

import RetailBuyersTable, {
    RetailBuyer,
} from '@/components/buyers/retail/RetailBuyersTable';
import AddButton from '@/components/common/AddButton';
import ConfirmationModal from '@/components/common/ConfirmationModal';
import CustomFormModal, {
    FormField,
} from '@/components/common/CustomFormModal';
import PageTitle from '@/components/common/PageTitle';
import { useApi } from '@/hooks/useApi';
import fa from '@/i18n/fa';
import { Box } from '@mui/material';

const RetailBuyers = () => {
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [editingBuyer, setEditingBuyer] = useState<RetailBuyer | null>(null);

    const { data: buyers, loading, refetch: refetchBuyers } = useApi<{ data: RetailBuyer[]; totalCount: number }>({
        key: ['get-retail-buyers'],
        url: '/RetailBuyers',
    });

    const { mutate: addBuyer, loading: adding } = useApi<void, Partial<RetailBuyer>>({
        key: ['add-retail-buyer'],
        url: '/RetailBuyers',
        method: 'POST',
        onError: 'افزودن خریدار با خطا مواجه شد',
        onSuccess: 'خریدار با موفقیت اضافه شد',
    });

    const { mutate: updateBuyer, loading: updating } = useApi<void, Partial<RetailBuyer> & { id: string }>({
        key: ['update-retail-buyer'],
        url: (data) => `/RetailBuyers/${data?.id}`,
        method: 'PUT',
        onError: 'ویرایش خریدار با خطا مواجه شد',
        onSuccess: 'خریدار با موفقیت ویرایش شد',
    });

    const { mutate: deleteBuyer, loading: deleting } = useApi<void, string>({
        key: ['delete-retail-buyer'],
        url: (id) => `/RetailBuyers/${id}`,
        method: 'DELETE',
        onError: 'حذف خریدار با خطا مواجه شد',
        onSuccess: 'خریدار با موفقیت حذف شد',
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setEditMode(false);
        setEditingBuyer(null);
    };

    const handleAddBuyer = async (data: Record<string, any>) => {
        await addBuyer(data, {
            onSuccess: () => {
                handleClose();
                refetchBuyers();
            },
        });
    };

    const handleEdit = (buyer: RetailBuyer) => {
        setEditMode(true);
        setEditingBuyer(buyer);
        handleOpen();
    };

    const handleDelete = (id: string) => {
        setSelectedId(id);
        setConfirmOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedId) return;
        await deleteBuyer(selectedId, {
            onSuccess: () => {
                setConfirmOpen(false);
                setSelectedId(null);
                refetchBuyers();
            },
            onError: () => setConfirmOpen(false),
        });
    };

    const formFields: FormField[] = [
        { name: 'firstName', label: 'نام', fieldType: 'text', required: true },
        { name: 'lastName', label: 'نام خانوادگی', fieldType: 'text', required: true },
        { name: 'nationalCode', label: 'کد ملی', fieldType: 'text', required: true },
        { name: 'city', label: 'شهر', fieldType: 'text', required: true },
        { name: 'province', label: 'استان', fieldType: 'text', required: true },
        { name: 'postalCode', label: 'کد پستی', fieldType: 'text', required: true },
        { name: 'addressDescription', label: 'آدرس', fieldType: 'text', required: true },
        { name: 'email', label: 'ایمیل', fieldType: 'text', required: true },
        { name: 'gender', label: 'جنسیت', fieldType: 'select', options: ['Male', 'Female'], required: true },
    ];

    const getDefaultValues = () => {
        if (editMode && editingBuyer) {
            return {
                firstName: editingBuyer.firstName || '',
                lastName: editingBuyer.lastName || '',
                nationalCode: editingBuyer.nationalCode || '',
                city: editingBuyer.city || '',
                province: editingBuyer.province || '',
                postalCode: editingBuyer.postalCode || '',
                addressDescription: editingBuyer.addressDescription || '',
                email: editingBuyer.email || '',
                gender: editingBuyer.gender || 'Male',
            };
        }
        return {};
    };

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <PageTitle title={fa.retailBuyers} />
            <Box display="flex" justifyContent="flex-start" mb={2}>
                <AddButton label="افزودن خریدار جدید" onClick={handleOpen} />
            </Box>

            <RetailBuyersTable
                data={buyers?.data || []}
                loading={loading}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />

            <CustomFormModal
                open={open}
                onClose={handleClose}
                title={editMode ? 'ویرایش خریدار' : 'افزودن خریدار خرد جدید'}
                defaultValues={getDefaultValues()}
                fields={formFields}
                onSubmit={async (data) => {
                    if (editMode && editingBuyer) {
                        await updateBuyer({ id: editingBuyer.id, ...data }, {
                            onSuccess: () => {
                                handleClose();
                                refetchBuyers();
                            },
                        });
                    } else {
                        await handleAddBuyer(data);
                    }
                }}
                submitLabel={editMode ? 'ویرایش' : 'افزودن'}
                cancelLabel="لغو"
                submitLoading={adding || updating}
            />

            <ConfirmationModal
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={confirmDelete}
                message="آیا از حذف این خریدار اطمینان دارید؟"
                confirmLabel="حذف"
                cancelLabel="لغو"
                loading={deleting}
            />
        </Box>
    );
};

export default RetailBuyers;
