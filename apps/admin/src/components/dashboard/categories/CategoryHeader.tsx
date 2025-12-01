import { useState } from 'react';

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

import { Cat } from './types';

interface Props {
    category: Cat;
    onSuccess: () => void;
}

export default function CategoryHeader({ category, onSuccess }: Props) {
    const [buffer, setBuffer] = useState<Partial<Cat>>({});
    const updateCat = useApi({ key: ['updateCat'], url: `/categories/${category.id}`, method: 'PUT' });
    const deleteCat = useApi({ key: ['deleteCat'], url: `/categories/${category.id}`, method: 'DELETE' });
    const hasChanges = Object.keys(buffer).length > 0;

    const save = async () => {
        if (!hasChanges) return;
        await updateCat.mutateAsync({ ...category, ...buffer });
        setBuffer({});
        onSuccess();
    };

    const remove = async () => {
        if (!confirm('آیا از حذف این دسته مطمئن هستید؟')) return;
        await deleteCat.mutateAsync({});
        onSuccess();
    };

    return (
        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
            <Stack direction="row" spacing={1} alignItems="center" flexGrow={1}>
                <TextField
                    type="number"
                    size="small"
                    value={buffer.minPrice ?? category.minPrice}
                    onChange={(e) => setBuffer({ ...buffer, minPrice: Number(e.target.value) })}
                    sx={{ width: 100 }}
                />
                <Typography color="text.secondary">—</Typography>
                <TextField
                    type="number"
                    size="small"
                    value={buffer.maxPrice ?? category.maxPrice}
                    onChange={(e) => setBuffer({ ...buffer, maxPrice: Number(e.target.value) })}
                    sx={{ width: 100 }}
                />
                <Typography variant="body2" color="text.secondary">تومان</Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
                <Tooltip title="ذخیره تغییرات">
                    <span>
                        <IconButton onClick={save} color="success" disabled={!hasChanges} size="small">
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
