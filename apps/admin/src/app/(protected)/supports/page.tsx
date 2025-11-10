'use client';
import { useState } from 'react';

import AddButton from '@/components/common/AddButton';
import CustomFormModal, { FormField } from '@/components/common/CustomModal';
import PageTitle from '@/components/common/PageTitle';
import SupportsTable, { Support } from '@/components/supports/SupportsTable';
import { useApi } from '@/hooks/useApi';
import fa from '@/i18n/fa';
import { Box } from '@mui/material';

const Supports = () => {
    const [open, setOpen] = useState(false);
    const { data: supports, loading } = useApi<{
        data: Support[];
        totalCount: number;
    }>({
        key: ['get-supports'],
        url: '/Supports',
    });

    const { mutate: addSupporter, loading: adding } = useApi<void, {
        Username: string;
        Password: string;
        FirstName: string;
        LastName: string;
        PhoneNumber: string;
    }>({
        key: ['get-supports'],
        url: '/Supports',
        method: 'POST',
        onError: 'افزودن پشتیبان با خطا مواجه شد',
        onSuccess: 'پشتیبان با موفقیت اضافه شد',
    });

    const formFields: FormField[] = [
        { name: 'firstName', label: 'نام', fieldType: 'text', required: true },
        { name: 'lastName', label: 'نام خانوادگی', fieldType: 'text', required: true },
        { name: 'phoneNumber', label: 'شماره تماس', fieldType: 'text', required: true },
        { name: 'username', label: 'نام کاربری', fieldType: 'text', required: true },
        { name: 'password', label: 'رمز عبور', fieldType: 'text', required: true },
    ];

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                console.log('Supporter added successfully!');
                handleClose();
            },
            onError: (err) => {
                console.log('Error adding supporter', err);
            },
        });
    };

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <PageTitle title={fa.supports} />
            <Box display="flex" justifyContent="flex-start" mb={2}>
                <AddButton label="افزودن پشتیبان جدید" onClick={handleOpen} />
            </Box>
            <SupportsTable data={supports?.data} loading={loading} />
            <CustomFormModal
                open={open}
                onClose={handleClose}
                title="افزودن پشتیبان جدید"
                onSubmit={handleAddSupporter}
                fields={formFields}
                submitLabel="افزودن"
                cancelLabel="لغو"
                submitLoading={adding}
            />
        </Box>
    );
};

export default Supports;