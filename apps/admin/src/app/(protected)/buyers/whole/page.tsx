'use client';

import { useState } from 'react';

import WholeBuyersTable, {
    WholeBuyer,
} from '@/components/buyers/wholesale/WholeBuyersTable';
import AddButton from '@/components/common/AddButton';
import ConfirmationModal from '@/components/common/ConfirmationModal';
import CustomFormModal, {
    FormField,
} from '@/components/common/CustomFormModal';
import PageTitle from '@/components/common/PageTitle';
import { useApi } from '@/hooks/useApi';
import fa from '@/i18n/fa';
import { Box } from '@mui/material';

const WholeSaleBuyers = () => {
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [editingBuyer, setEditingBuyer] = useState<WholeBuyer | null>(null);

    const { data: buyers, loading, refetch: refetchBuyers } = useApi<{ data: WholeBuyer[]; totalCount: number }>({
        key: ['get-whole-buyers'],
        url: '/WholeBuyers',
    });

    const { mutate: addBuyer, loading: adding } = useApi<void, Partial<WholeBuyer>>({
        key: ['add-whole-buyer'],
        url: '/WholeBuyers',
        method: 'POST',
        onError: 'افزودن خریدار عمده با خطا مواجه شد',
        onSuccess: 'خریدار عمده با موفقیت اضافه شد',
    });

    const { mutate: updateBuyer, loading: updating } = useApi<void, Partial<WholeBuyer> & { id: string }>({
        key: ['update-whole-buyer'],
        url: (data) => `/WholeBuyers/${data?.id}`,
        method: 'PUT',
        onError: 'ویرایش خریدار عمده با خطا مواجه شد',
        onSuccess: 'خریدار عمده با موفقیت ویرایش شد',
    });

    const { mutate: deleteBuyer, loading: deleting } = useApi<void, string>({
        key: ['delete-whole-buyer'],
        url: (id) => `/WholeBuyers/${id}`,
        method: 'DELETE',
        onError: 'حذف خریدار عمده با خطا مواجه شد',
        onSuccess: 'خریدار عمده با موفقیت حذف شد',
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

    const handleEdit = (buyer: WholeBuyer) => {
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
        { name: 'companyName', label: 'نام شرکت', fieldType: 'text', required: true },
        { name: 'contactPerson', label: 'نام تماس', fieldType: 'text', required: true },
        { name: 'phoneNumber', label: 'شماره تماس', fieldType: 'phone', required: true },
        { name: 'email', label: 'ایمیل', fieldType: 'text' },
        { name: 'city', label: 'شهر', fieldType: 'text' },
        { name: 'province', label: 'استان', fieldType: 'text' },
        { name: 'addressDescription', label: 'آدرس', fieldType: 'text' },
        { name: 'typeOfWaste', label: 'نوع ضایعات', fieldType: 'text', required: true },
        { name: 'vehiclePlate', label: 'شماره پلاک', fieldType: 'text' }, // e.g., ۱۲ ط ۴۵۶ ایران ۵۰
    ];

    const getDefaultValues = () => {
        if (editMode && editingBuyer) {
            return {
                companyName: editingBuyer.companyName || '',
                contactPerson: editingBuyer.contactPerson || '',
                phoneNumber: editingBuyer.phoneNumber || '',
                email: editingBuyer.email || '',
                city: editingBuyer.city || '',
                province: editingBuyer.province || '',
                addressDescription: editingBuyer.addressDescription || '',
                typeOfWaste: editingBuyer.typeOfWaste || '',
                vehiclePlate: editingBuyer.vehiclePlate || '',
            };
        }
        return {};
    };

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <PageTitle title={fa.wholeBuyers} />
            <Box display="flex" justifyContent="flex-start" mb={2}>
                <AddButton label="افزودن خریدار عمده جدید" onClick={handleOpen} />
            </Box>

            <WholeBuyersTable
                data={buyers?.data || []}
                loading={loading}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />

            <CustomFormModal
                open={open}
                onClose={handleClose}
                title={editMode ? 'ویرایش خریدار عمده' : 'افزودن خریدار عمده جدید'}
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
                message="آیا از حذف این خریدار عمده اطمینان دارید؟"
                confirmLabel="حذف"
                cancelLabel="لغو"
                loading={deleting}
            />
        </Box>
    );
};

export default WholeSaleBuyers;
