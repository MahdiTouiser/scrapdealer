'use client';
import { useState } from 'react';

import BuyersTable, { Buyer } from '@/components/buyers/BuyersTable';
import AddButton from '@/components/common/AddButton';
import ConfirmationModal from '@/components/common/ConfirmationModal';
import CustomFormModal, {
    FormField,
} from '@/components/common/CustomFormModal';
import PageTitle from '@/components/common/PageTitle';
import { useApi } from '@/hooks/useApi';
import fa from '@/i18n/fa';
import {
    Box,
    Button,
    ButtonGroup,
    Chip,
} from '@mui/material';

const Buyers = () => {
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [editingBuyer, setEditingBuyer] = useState<Buyer | null>(null);

    // Filter states
    const [isFixedLocation, setIsFixedLocation] = useState<boolean | null>(null);
    const [isWholeSale, setIsWholeSale] = useState<boolean | null>(null);

    // Build query params based on filters
    const getQueryParams = () => {
        const params = new URLSearchParams();
        if (isFixedLocation !== null) {
            params.append('IsFixedLocation', String(isFixedLocation));
        }
        if (isWholeSale !== null) {
            params.append('IsWholeSale', String(isWholeSale));
        }
        return params.toString();
    };

    const { data: buyers, loading, refetch: refetchBuyers } =
        useApi<{ data: Buyer[]; totalCount: number }>({
            key: ['get-buyers', isFixedLocation, isWholeSale],
            url: `/Buyers/Admin/Get?${getQueryParams()}`,
        });

    const { mutate: addBuyer, loading: adding } = useApi<void, Partial<Buyer>>({
        key: ['add-buyer'],
        url: '/Buyers',
        method: 'POST',
        onError: 'افزودن خریدار با خطا مواجه شد',
        onSuccess: 'خریدار با موفقیت اضافه شد',
    });

    const { mutate: updateBuyer, loading: updating } = useApi<
        void,
        Partial<Buyer> & { id: string }
    >({
        key: ['update-buyer'],
        url: data => `/Buyers/${data?.id}`,
        method: 'PUT',
        onError: 'ویرایش خریدار با خطا مواجه شد',
        onSuccess: 'خریدار با موفقیت ویرایش شد',
    });

    const { mutate: deleteBuyer, loading: deleting } = useApi<void, string>({
        key: ['delete-buyer'],
        url: id => `/Buyers/${id}`,
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

    const handleAddBuyer = async (data: Partial<Buyer>) => {
        await addBuyer(data, {
            onSuccess: () => {
                handleClose();
                refetchBuyers();
            },
        });
    };

    const handleEdit = (buyer: Buyer) => {
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
        { name: 'companyName', label: 'نام شرکت', fieldType: 'text' },
        { name: 'city', label: 'شهر', fieldType: 'text' },
        { name: 'province', label: 'استان', fieldType: 'text' },
        { name: 'addressDescription', label: 'آدرس', fieldType: 'text' },
        { name: 'numberPlate', label: 'پلاک خودرو', fieldType: 'text' },
        {
            name: 'gender',
            label: 'جنسیت',
            fieldType: 'select',
            options: [
                { label: 'زن', value: 'Female' },
                { label: 'مرد', value: 'Male' },
            ],
        },
        {
            name: 'activityArea',
            label: 'منطقه فعالیت',
            fieldType: 'select',
            options: [
                { label: 'شمال', value: 'North' },
                { label: 'جنوب', value: 'South' },
                { label: 'شرق', value: 'East' },
                { label: 'غرب', value: 'West' },
                { label: 'تهران', value: 'Tehran' },
            ],
        },
        {
            name: 'isFixedLocation',
            label: 'مکان ثابت',
            fieldType: 'toggle',
        },
        {
            name: 'isWholeSaleBuyer',
            label: 'خریدار عمده',
            fieldType: 'toggle',
        },
    ];

    const getDefaultValues = () => {
        if (editMode && editingBuyer) {
            return { ...editingBuyer };
        }
        return {};
    };

    const clearFilters = () => {
        setIsFixedLocation(null);
        setIsWholeSale(null);
    };

    const activeFiltersCount = [isFixedLocation, isWholeSale].filter(f => f !== null).length;

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <PageTitle title={fa.buyers} />

            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
                <AddButton label="افزودن خریدار جدید" onClick={handleOpen} />

                <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
                    <Box>
                        <Box mb={0.5} fontSize="0.875rem" fontWeight={500}>
                            مکان ثابت:
                        </Box>
                        <ButtonGroup variant="outlined" size="small">

                            <Button
                                variant={isFixedLocation === true ? 'contained' : 'outlined'}
                                onClick={() => setIsFixedLocation(true)}
                            >
                                بله
                            </Button>
                            <Button
                                variant={isFixedLocation === false ? 'contained' : 'outlined'}
                                onClick={() => setIsFixedLocation(false)}
                            >
                                خیر
                            </Button>
                        </ButtonGroup>
                    </Box>

                    <Box>
                        <Box mb={0.5} fontSize="0.875rem" fontWeight={500}>
                            خریدار عمده:
                        </Box>
                        <ButtonGroup variant="outlined" size="small">

                            <Button
                                variant={isWholeSale === true ? 'contained' : 'outlined'}
                                onClick={() => setIsWholeSale(true)}
                            >
                                بله
                            </Button>
                            <Button
                                variant={isWholeSale === false ? 'contained' : 'outlined'}
                                onClick={() => setIsWholeSale(false)}
                            >
                                خیر
                            </Button>
                        </ButtonGroup>
                    </Box>

                    {activeFiltersCount > 0 && (
                        <Button
                            variant="text"
                            color="error"
                            size="small"
                            onClick={clearFilters}
                            sx={{ mt: 2.5 }}
                        >
                            پاک کردن فیلترها ({activeFiltersCount})
                        </Button>
                    )}
                </Box>
            </Box>

            {activeFiltersCount > 0 && (
                <Box display="flex" gap={1} mb={2} flexWrap="wrap">
                    {isFixedLocation !== null && (
                        <Chip
                            label={`مکان ثابت: ${isFixedLocation ? 'بله' : 'خیر'}`}
                            onDelete={() => setIsFixedLocation(null)}
                            size="small"
                            color="primary"
                            variant="outlined"
                        />
                    )}
                    {isWholeSale !== null && (
                        <Chip
                            label={`خریدار عمده: ${isWholeSale ? 'بله' : 'خیر'}`}
                            onDelete={() => setIsWholeSale(null)}
                            size="small"
                            color="primary"
                            variant="outlined"
                        />
                    )}
                </Box>
            )}

            <BuyersTable
                data={buyers?.data || []}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <CustomFormModal
                open={open}
                onClose={handleClose}
                title={editMode ? 'ویرایش خریدار' : 'افزودن خریدار جدید'}
                defaultValues={getDefaultValues()}
                fields={formFields}
                onSubmit={
                    editMode
                        ? data =>
                            updateBuyer(
                                { ...data, id: editingBuyer?.id! },
                                { onSuccess: () => { handleClose(); refetchBuyers(); } }
                            )
                        : handleAddBuyer
                }
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

export default Buyers;