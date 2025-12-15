'use client';

import { useState } from 'react';

import { SubCat } from '@/components/types';
import { useApi } from '@/hooks/useApi';
import {
    DeleteOutlineRounded,
    Save,
} from '@mui/icons-material';
import {
    IconButton,
    Paper,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';

interface Props {
    subcategory: SubCat;
    onSuccess: () => void;
}

const formatNumber = (value: string | number): string => {
    const num = String(value).replace(/[^\d]/g, '');
    if (!num) return '';
    return Number(num).toLocaleString('en-US');
};

const parseNumber = (value: string): number => {
    return Number(value.replace(/[^\d]/g, ''));
};

export default function SubcategoryItem({ subcategory, onSuccess }: Props) {
    const [buffer, setBuffer] = useState<Partial<SubCat>>({});

    const updateSub = useApi<SubCat>({
        key: ['updateSubcategory', subcategory.id],
        url: `/subcategories/${subcategory.id}`,
        method: 'PUT',
        onSuccess: 'ذخیره شد',
    });

    const deleteSub = useApi({
        key: ['deleteSubcategory', subcategory.id],
        url: `/subcategories/${subcategory.id}`,
        method: 'DELETE',
        onSuccess: 'حذف شد',
    });

    const hasChanges = Object.keys(buffer).length > 0;

    const getDisplayValue = (field: 'minPrice' | 'maxPrice') => {
        const value = buffer[field] ?? subcategory[field];
        return formatNumber(value);
    };

    const handleMinChange = (value: string) => {
        const formatted = formatNumber(value);
        setBuffer({ ...buffer, minPrice: parseNumber(formatted) });
    };

    const handleMaxChange = (value: string) => {
        const formatted = formatNumber(value);
        setBuffer({ ...buffer, maxPrice: parseNumber(formatted) });
    };

    const save = async () => {
        if (!hasChanges) return;

        await updateSub.mutateAsync({
            ...subcategory,
            minPrice: buffer.minPrice ?? subcategory.minPrice,
            maxPrice: buffer.maxPrice ?? subcategory.maxPrice,
        } as any);

        setBuffer({});
        onSuccess();
    };

    const remove = async () => {
        if (!confirm(`آیا از حذف زیر دسته "${subcategory.name}" مطمئن هستید؟`)) return;

        console.log('Deleting subcategory:', subcategory.id, subcategory.name);
        await deleteSub.mutateAsync({});
        onSuccess();
    };

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: 'grey.100',
                border: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="body2" fontWeight={500} sx={{ minWidth: 150 }}>
                    {subcategory.name}
                </Typography>

                <Stack direction="row" spacing={1} alignItems="center" flexGrow={1}>
                    <TextField
                        size="small"
                        value={getDisplayValue('minPrice')}
                        onChange={(e) => handleMinChange(e.target.value)}
                        sx={{ width: 130 }}
                        inputProps={{
                            inputMode: 'numeric',
                        }}
                    />
                    <Typography color="text.secondary">—</Typography>
                    <TextField
                        size="small"
                        value={getDisplayValue('maxPrice')}
                        onChange={(e) => handleMaxChange(e.target.value)}
                        sx={{ width: 130 }}
                        inputProps={{
                            inputMode: 'numeric',
                        }}
                    />
                    <Typography variant="body2" color="text.secondary">
                        تومان
                    </Typography>
                </Stack>

                <Stack direction="row" spacing={1}>
                    <Tooltip title="ذخیره تغییرات">
                        <span>
                            <IconButton
                                onClick={save}
                                color="success"
                                disabled={!hasChanges}
                                size="small"
                            >
                                <Save fontSize="small" />
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip title="حذف زیر دسته">
                        <span>
                            <IconButton onClick={remove} color="error" size="small">
                                <DeleteOutlineRounded fontSize="small" />
                            </IconButton>
                        </span>
                    </Tooltip>
                </Stack>
            </Stack>
        </Paper>
    );
}