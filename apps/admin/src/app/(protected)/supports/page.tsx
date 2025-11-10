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

    const formFields: FormField[] = [
        { name: 'firstName', label: 'نام', fieldType: 'text', required: true },
        { name: 'lastName', label: 'نام خانوادگی', fieldType: 'text', required: true },
        { name: 'phoneNumber', label: 'شماره تماس', fieldType: 'text', required: true },
        { name: 'username', label: 'نام کاربری', fieldType: 'text', required: true },
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

            <SupportsTable data={supports?.data} loading={loading} />

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
