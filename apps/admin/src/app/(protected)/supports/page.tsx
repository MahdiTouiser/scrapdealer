'use client';
import { useState } from 'react';

import AddButton from '@/components/common/AddButton';
import CustomFormModal, { FormField } from '@/components/common/CustomModal';
import PageTitle from '@/components/common/PageTitle';
import SupportsTable from '@/components/supports/SupportsTable';
import fa from '@/i18n/fa';
import { Box } from '@mui/material';

const Supports = () => {
    const [open, setOpen] = useState(false);

    const formFields: FormField[] = [
        { name: 'name', label: 'نام و نام خانوادگی', fieldType: 'text', required: true },
        {
            name: 'gender',
            label: 'جنسیت',
            fieldType: 'select',
            required: true,
            options: [
                { label: 'مرد', value: 'male' },
                { label: 'زن', value: 'female' },
            ],
        },
        { name: 'username', label: 'نام کاربری', fieldType: 'text', required: true },
        { name: 'password', label: 'رمز عبور', fieldType: 'text', required: true },
    ];

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleAddSupporter = (data: Record<string, any>) => {
        console.log('New supporter:', data);
        handleClose();
    };

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <PageTitle title={fa.supports} />
            <Box display="flex" justifyContent="flex-start" mb={2}>
                <AddButton label="افزودن پشتیبان جدید" onClick={handleOpen} />
            </Box>

            <SupportsTable />

            <CustomFormModal
                open={open}
                onClose={handleClose}
                title="افزودن پشتیبان جدید"
                onSubmit={handleAddSupporter}
                fields={formFields}
                submitLabel="افزودن"
                cancelLabel="لغو"
            />
        </Box>
    );
};

export default Supports;
