'use client';

import {
    useEffect,
    useState,
} from 'react';

import { SubCat } from '@/components/types';
import { useApi } from '@/hooks/useApi';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import {
    Button,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import SubcategoryItem from './SubcategoryItem';

interface Props {
    categoryId: string;
    onSuccess: () => void;
}

// Format number with thousand separators
const formatNumber = (value: string): string => {
    const num = value.replace(/[^\d]/g, '');
    if (!num) return '';
    return Number(num).toLocaleString('en-US');
};

// Remove formatting for API submission
const parseNumber = (value: string): number => {
    return Number(value.replace(/[^\d]/g, ''));
};

export default function SubcategoryList({ categoryId, onSuccess }: Props) {
    const [newSub, setNewSub] = useState({
        name: '',
        minPrice: '',
        maxPrice: '',
    });

    const { data: subRes, refetch: refetchSubs } = useApi<{ data: SubCat[] }>({
        key: ['subcategories', categoryId],
        url: `/subcategories?categoryId=${categoryId}`,
    });

    const subcategories = subRes?.data ?? [];

    const createSub = useApi<SubCat>({
        key: ['createSub'],
        url: '/subcategories',
        method: 'POST',
        onSuccess: 'زیر دسته اضافه شد',
    });

    const handleAdd = async () => {
        if (!newSub.name || !newSub.minPrice || !newSub.maxPrice) return;

        await createSub.mutate({
            name: newSub.name,
            minPrice: parseNumber(newSub.minPrice),
            maxPrice: parseNumber(newSub.maxPrice),
            categoryId,
        });

        setNewSub({ name: '', minPrice: '', maxPrice: '' });
        refetchSubs();
        onSuccess?.();
    };

    useEffect(() => {
        refetchSubs();
    }, [categoryId, refetchSubs]);

    return (
        <Stack spacing={2}>

            {subcategories.map((sub) => (
                <SubcategoryItem
                    key={sub.id}
                    subcategory={sub}
                    onSuccess={() => {
                        refetchSubs();
                        onSuccess?.();
                    }}
                />
            ))}

            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    border: '2px dashed',
                    borderColor: 'primary.main',
                }}
            >
                <Typography
                    variant="caption"
                    color="primary"
                    fontWeight={600}
                    mb={1}
                    display="block"
                >
                    افزودن زیر دسته جدید
                </Typography>

                <Stack direction="row" spacing={2} alignItems="center">
                    <TextField
                        label="نام زیر دسته"
                        size="small"
                        value={newSub.name}
                        onChange={(e) => {
                            console.log('Name field changed:', e.target.value);
                            setNewSub({ ...newSub, name: e.target.value });
                        }}
                        sx={{ minWidth: 180 }}
                    />
                    <TextField
                        label="حداقل"
                        size="small"
                        value={newSub.minPrice}
                        onChange={(e) => {
                            console.log('Min price field changed:', e.target.value);
                            const formatted = formatNumber(e.target.value);
                            console.log('Formatted to:', formatted);
                            setNewSub({ ...newSub, minPrice: formatted });
                        }}
                        sx={{ width: 110 }}
                        inputProps={{
                            inputMode: 'numeric',
                        }}
                    />
                    <TextField
                        label="حداکثر"
                        size="small"
                        value={newSub.maxPrice}
                        onChange={(e) => {
                            console.log('Max price field changed:', e.target.value);
                            const formatted = formatNumber(e.target.value);
                            console.log('Formatted to:', formatted);
                            setNewSub({ ...newSub, maxPrice: formatted });
                        }}
                        sx={{ width: 110 }}
                        inputProps={{
                            inputMode: 'numeric',
                        }}
                    />
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<AddCircleOutlineRoundedIcon />}
                        onClick={handleAdd}
                        disabled={!newSub.name || !newSub.minPrice || !newSub.maxPrice}
                    >
                        افزودن
                    </Button>
                </Stack>
            </Paper>
        </Stack>
    );
}