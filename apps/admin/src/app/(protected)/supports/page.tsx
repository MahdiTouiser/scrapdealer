'use client';
import { useState } from 'react';

import AddButton from '@/components/common/AddButton';
import ConfirmationModal from '@/components/common/ConfirmationModal';
import CustomFormModal, {
  FormField,
} from '@/components/common/CustomFormModal';
import PageTitle from '@/components/common/PageTitle';
import SupportsTable, { Support } from '@/components/supports/SupportsTable';
import { useApi } from '@/hooks/useApi';
import fa from '@/i18n/fa';
import {
  Box,
  CircularProgress,
} from '@mui/material';

const Supports = () => {
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [editingSupport, setEditingSupport] = useState<Support | null>(null);
    const [fetchingEdit, setFetchingEdit] = useState(false);

    const {
        data: supports,
        loading,
        refetch: refetchSupports,
    } = useApi<{ data: Support[]; totalCount: number }>({
        key: ['get-supports'],
        url: '/Supports',
    });

    const { mutate: addSupporter, loading: adding } = useApi<
        void,
        {
            Username: string;
            Password: string;
            FirstName: string;
            LastName: string;
            PhoneNumber: string;
        }
    >({
        key: ['add-support'],
        url: '/Supports',
        method: 'POST',
        onError: 'افزودن پشتیبان با خطا مواجه شد',
        onSuccess: 'پشتیبان با موفقیت اضافه شد',
    });

    const { mutate: updateSupporter, loading: updating } = useApi<
        void,
        {
            id: string;
            Username: string;
            Password: string;
            FirstName: string;
            LastName: string;
            PhoneNumber: string;
        }
    >({
        key: ['update-support'],
        url: (data) => `/Supports/${data?.id}`,
        method: 'PUT',
        onError: 'ویرایش پشتیبان با خطا مواجه شد',
        onSuccess: 'پشتیبان با موفقیت ویرایش شد',
    });

    const { mutate: deleteSupporter, loading: deleting } = useApi<void, string>({
        key: ['supports'],
        url: (id) => `/Supports/${id}`,
        method: 'DELETE',
        onError: 'حذف پشتیبان با خطا مواجه شد',
        onSuccess: 'پشتیبان با موفقیت حذف شد',
    });

    const { fetchManually: fetchSupportById } = useApi<Support, string>({
        key: ['get-support-by-id'],
        url: (id) => `/Supports/${id}`,
        method: 'GET',
        enabled: false,
    });

    const formFields: FormField[] = [
        { name: 'firstName', label: 'نام', fieldType: 'text', required: true },
        { name: 'lastName', label: 'نام خانوادگی', fieldType: 'text', required: true },
        { name: 'phoneNumber', label: 'شماره تماس', fieldType: 'phone', required: true },
        { name: 'username', label: 'نام کاربری', fieldType: 'text', required: true },
        { name: 'password', label: 'رمز عبور', fieldType: 'password', required: !editMode },
    ];

    const handleOpenAdd = () => {
        setEditMode(false);
        setEditingSupport(null);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditMode(false);
        setEditingSupport(null);
        setFetchingEdit(false);
    };

    const handleAddSupporter = async (data: Record<string, any>) => {
        const body = {
            Username: data['username'],
            Password: data['password'],
            FirstName: data['firstName'],
            LastName: data['lastName'],
            PhoneNumber: data['phoneNumber'],
        };

        await addSupporter(body, {
            onSuccess: () => {
                handleClose();
                refetchSupports();
            },
        });
    };

    const handleEdit = async (id: string) => {
        setEditMode(true);
        setFetchingEdit(true);
        setOpen(true);
        try {
            const support = await fetchSupportById(id);
            setEditingSupport(support);
        } catch (err) {
            console.error('Failed to fetch support:', err);
        } finally {
            setFetchingEdit(false);
        }
    };

    const handleDelete = (id: string) => {
        setSelectedId(id);
        setConfirmOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedId) return;
        await deleteSupporter(selectedId, {
            onSuccess: () => {
                setConfirmOpen(false);
                setSelectedId(null);
                refetchSupports();
            },
            onError: () => setConfirmOpen(false),
        });
    };

    const getDefaultValues = () => {
        if (!editMode || !editingSupport) return {};
        return {
            firstName: editingSupport.firstName || '',
            lastName: editingSupport.lastName || '',
            phoneNumber: editingSupport.phoneNumber || '',
            username: editingSupport.username || '',
            password: '',
        };
    };

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <PageTitle title={fa.supports} />
            <Box display="flex" justifyContent="flex-start" mb={2}>
                <AddButton label="افزودن پشتیبان جدید" onClick={handleOpenAdd} />
            </Box>

            <SupportsTable
                data={supports?.data || []}
                loading={loading}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />

            <CustomFormModal
                open={open}
                onClose={handleClose}
                title={editMode ? 'ویرایش پشتیبان' : 'افزودن پشتیبان جدید'}
                defaultValues={getDefaultValues()}
                onSubmit={async (data) => {
                    if (editMode && editingSupport) {
                        const body = {
                            id: editingSupport.id,
                            Username: data['username'],
                            Password: data['password'] || undefined,
                            FirstName: data['firstName'],
                            LastName: data['lastName'],
                            PhoneNumber: data['phoneNumber'],
                        };

                        await updateSupporter(body, {
                            onSuccess: () => {
                                handleClose();
                                refetchSupports();
                            },
                        });
                    } else {
                        await handleAddSupporter(data);
                    }
                }}
                fields={formFields}
                submitLabel={editMode ? 'ویرایش' : 'افزودن'}
                cancelLabel="لغو"
                submitLoading={adding || updating}
            >
                {fetchingEdit && (
                    <Box display="flex" justifyContent="center" alignItems="center" p={3}>
                        <CircularProgress />
                    </Box>
                )}
            </CustomFormModal>

            <ConfirmationModal
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={confirmDelete}
                message="آیا از حذف این پشتیبان اطمینان دارید؟"
                confirmLabel="حذف"
                cancelLabel="لغو"
                loading={deleting}
            />
        </Box>
    );
};

export default Supports;