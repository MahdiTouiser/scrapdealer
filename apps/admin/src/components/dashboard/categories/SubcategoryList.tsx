'use client';

import {
  useEffect,
  useState,
} from 'react';

import { useApi } from '@/hooks/useApi';
import AddCircleOutlineRoundedIcon
  from '@mui/icons-material/AddCircleOutlineRounded';
import {
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import SubcategoryItem from './SubcategoryItem';
import { SubCat } from './types';

interface Props {
    categoryId: string;
    onSuccess: () => void;
}

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
            minPrice: Number(newSub.minPrice),
            maxPrice: Number(newSub.maxPrice),
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
                        onChange={(e) => setNewSub({ ...newSub, name: e.target.value })}
                        sx={{ minWidth: 180 }}
                    />
                    <TextField
                        label="حداقل"
                        type="number"
                        size="small"
                        value={newSub.minPrice}
                        onChange={(e) => setNewSub({ ...newSub, minPrice: e.target.value })}
                        sx={{ width: 110 }}
                    />
                    <TextField
                        label="حداکثر"
                        type="number"
                        size="small"
                        value={newSub.maxPrice}
                        onChange={(e) => setNewSub({ ...newSub, maxPrice: e.target.value })}
                        sx={{ width: 110 }}
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