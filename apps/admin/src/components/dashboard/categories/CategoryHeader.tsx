import { useState } from 'react';

import { Cat } from '@/components/types';
import { useApi } from '@/hooks/useApi';
import {
    DeleteOutlineRounded,
    Save,
} from '@mui/icons-material';
import {
    IconButton,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';

interface Props {
    category: Cat;
    onSuccess: () => void;
}

const formatNumber = (value: string): string => {
    const num = value.replace(/[^\d]/g, '');
    if (!num) return '';
    return Number(num).toLocaleString('en-US');
};

const parseNumber = (value: string): number => {
    return Number(value.replace(/[^\d]/g, ''));
};

export default function CategoryHeader({ category, onSuccess }: Props) {
    const [buffer, setBuffer] = useState<Partial<Cat>>({});

    const updateCat = useApi({
        key: ['updateCat'],
        url: `/categories/${category.id}`,
        method: 'PUT',
        onSuccess: 'دسته بروزرسانی شد',
    });

    const deleteCat = useApi({
        key: ['deleteCat'],
        url: `/categories/${category.id}`,
        method: 'DELETE',
        onSuccess: 'دسته حذف شد',
    });

    const hasChanges = Object.keys(buffer).length > 0;

    const getDisplayValue = (field: 'minPrice' | 'maxPrice') => {
        const value = buffer[field] ?? category[field];
        return formatNumber(String(value));
    };

    const save = async () => {
        if (!hasChanges) return;

        await updateCat.mutateAsync({
            ...category,
            minPrice: buffer.minPrice ?? category.minPrice,
            maxPrice: buffer.maxPrice ?? category.maxPrice,
        });

        setBuffer({});
        onSuccess();
    };

    const remove = async () => {
        if (!confirm('آیا از حذف این دسته مطمئن هستید؟')) return;
        await deleteCat.mutateAsync({});
        onSuccess();
    };

    const handleMinChange = (value: string) => {
        const formatted = formatNumber(value);
        setBuffer({ ...buffer, minPrice: parseNumber(formatted) });
    };

    const handleMaxChange = (value: string) => {
        const formatted = formatNumber(value);
        setBuffer({ ...buffer, maxPrice: parseNumber(formatted) });
    };

    return (
        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
            <Stack direction="row" spacing={1} alignItems="center" flexGrow={1}>
                <TextField
                    size="small"
                    value={getDisplayValue('minPrice')}
                    onChange={(e) => handleMinChange(e.target.value)}
                    sx={{ width: 130 }}
                    inputProps={{
                        inputMode: 'numeric',
                    }}
                    placeholder="حداقل"
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
                    placeholder="حداکثر"
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
                <Tooltip title="حذف دسته">
                    <span>
                        <IconButton onClick={remove} color="error" size="small">
                            <DeleteOutlineRounded fontSize="small" />
                        </IconButton>
                    </span>
                </Tooltip>
            </Stack>
        </Stack>
    );
}