'use client'
import { useState } from 'react';

import BuyersTable, { Buyer } from '@/components/buyers/BuyersTable';
import AddButton from '@/components/common/AddButton';
import ConfirmationModal from '@/components/common/ConfirmationModal';
import CustomFormModal, {
  FormField,
} from '@/components/common/CustomFormModal';
import PageTitle from '@/components/common/PageTitle';
import { useApi } from '@/hooks/useApi';
import { useFileApi } from '@/hooks/useFileApi';
import fa from '@/i18n/fa';
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
} from '@mui/material';

const Buyers = () => {
    const [open, setOpen] = useState(false)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [editMode, setEditMode] = useState(false)
    const [editingBuyer, setEditingBuyer] = useState<Buyer | null>(null)

    const [isFixedLocation, setIsFixedLocation] = useState<boolean | null>(null)
    const [isWholeSale, setIsWholeSale] = useState<boolean | null>(null)

    const { upload } = useFileApi()

    const getQueryParams = () => {
        const params = new URLSearchParams()
        if (isFixedLocation !== null) params.append('IsFixedLocation', String(isFixedLocation))
        if (isWholeSale !== null) params.append('IsWholeSale', String(isWholeSale))
        return params.toString()
    }

    const { data: buyers, loading, refetch: refetchBuyers } =
        useApi<{ data: Buyer[]; totalCount: number }>({
            key: ['get-buyers', isFixedLocation, isWholeSale],
            url: `/Buyers/Admin/Get?${getQueryParams()}`,
        })

    const { mutateAsync: addBuyer, loading: adding } = useApi<void, any>({
        key: ['add-buyer'],
        url: '/Buyers',
        method: 'POST',
        onError: 'افزودن خریدار با خطا مواجه شد',
        onSuccess: 'خریدار با موفقیت اضافه شد',
    })

    const { mutateAsync: updateBuyer, loading: updating } = useApi<void, any>({
        key: ['update-buyer'],
        url: data => `/Buyers/${data?.id}`,
        method: 'PUT',
        onError: 'ویرایش خریدار با خطا مواجه شد',
        onSuccess: 'خریدار با موفقیت ویرایش شد',
    })

    const { mutate: deleteBuyer, loading: deleting } = useApi<void, string>({
        key: ['delete-buyer'],
        url: id => `/Buyers/${id}`,
        method: 'DELETE',
        onError: 'حذف خریدار با خطا مواجه شد',
        onSuccess: 'خریدار با موفقیت حذف شد',
    })

    const handleOpen = () => setOpen(true)

    const handleClose = () => {
        setOpen(false)
        setEditMode(false)
        setEditingBuyer(null)
    }

    const handleEdit = (buyer: Buyer) => {
        setEditMode(true)
        setEditingBuyer(buyer)
        setOpen(true)
    }

    const handleDelete = (id: string) => {
        setSelectedId(id)
        setConfirmOpen(true)
    }

    const confirmDelete = () => {
        if (!selectedId) return
        deleteBuyer(selectedId, {
            onSuccess: () => {
                setConfirmOpen(false)
                setSelectedId(null)
                refetchBuyers()
            },
            onError: () => setConfirmOpen(false),
        })
    }

    const uploadFile = async (file?: File) => {
        if (!file) return undefined
        const fd = new FormData()
        fd.append('file', file)
        return await upload.mutateAsync(fd)
    }

    const handleSubmit = async (data: any) => {
        const payload = { ...data }

        payload.businessLicenseFileId = await uploadFile(data.businessLicenseFile)
        payload.nationalCardFileId = await uploadFile(data.nationalCardFile)
        payload.profileFormFileId = await uploadFile(data.profileFormFile)

        delete payload.businessLicenseFile
        delete payload.nationalCardFile
        delete payload.profileFormFile

        if (editMode) {
            await updateBuyer({ ...payload, id: editingBuyer!.id })
        } else {
            await addBuyer(payload)
        }

        handleClose()
        refetchBuyers()
    }

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
        { name: 'businessLicenseFile', label: 'جواز کسب', fieldType: 'file' },
        { name: 'nationalCardFile', label: 'کارت ملی', fieldType: 'file' },
        { name: 'profileFormFile', label: 'فرم پروفایل', fieldType: 'file' },
        { name: 'isFixedLocation', label: 'مکان ثابت', fieldType: 'toggle' },
        { name: 'isWholeSaleBuyer', label: 'خریدار عمده', fieldType: 'toggle' },
    ]

    const getDefaultValues = () => {
        if (editMode && editingBuyer) return { ...editingBuyer }
        return {}
    }

    const clearFilters = () => {
        setIsFixedLocation(null)
        setIsWholeSale(null)
    }

    const activeFiltersCount = [isFixedLocation, isWholeSale].filter(v => v !== null).length

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
                onSubmit={handleSubmit}
                submitLabel={editMode ? 'ویرایش' : 'افزودن'}
                cancelLabel="لغو"
                submitLoading={adding || updating || upload.loading}
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
    )
}

export default Buyers
