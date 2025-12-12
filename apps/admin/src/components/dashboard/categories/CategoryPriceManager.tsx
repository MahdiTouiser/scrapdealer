'use client';

import { Cat } from '@/components/types';
import { useApi } from '@/hooks/useApi';
import {
    Box,
    CircularProgress,
    Divider,
    Paper,
    Typography,
} from '@mui/material';

import AddCategoryForm from './AddCategoryForm';
import CategoryList from './CategoryList';

export default function CategoryPriceManager() {
    const { data: res, loading, refetch } = useApi<{ data: Cat[] }>({
        key: ['categories'],
        url: '/categories',
    });

    const categories = res?.data ?? [];

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>

            <AddCategoryForm onSuccess={refetch} />

            <Divider sx={{ my: 4 }} />

            <CategoryList categories={categories} onSuccess={refetch} />

            {categories.length === 0 && (
                <Box textAlign="center" py={8}>
                    <Typography color="text.secondary">هنوز دسته‌ای اضافه نشده است</Typography>
                </Box>
            )}
        </Paper>
    );
}