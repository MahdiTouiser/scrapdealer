'use client';

import { useState } from 'react';

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

import { SubCat } from './types';

interface Props {
    subcategory: SubCat;
    onSuccess: () => void;
}

export default function SubcategoryItem({ subcategory, onSuccess }: Props) {
    const [buffer, setBuffer] = useState<Partial<SubCat>>({});

    const updateSub = useApi<SubCat>({
        key: ['updateSub', subcategory.id],
        url: `/subcategories/${subcategory.id}`,
        method: 'PUT',
        onSuccess: 'ذخیره شد',
    });

    const deleteSub = useApi({
        key: ['deleteSub', subcategory.id],
        url: `/subcategories/${subcategory.id}`,
        method: 'DELETE',
        onSuccess: 'حذف شد',
    });

    const hasChanges = Object.keys(buffer).length > 0;

    const save = async () => {
        if (!hasChanges) return;
        await updateSub.mutate({ ...subcategory, ...buffer } as any);
        setBuffer({});
        onSuccess();
    };

    const remove = async () => {
        if (!confirm('آیا از حذف این زیر دسته مطمئن هستید؟')) return;
        await deleteSub.mutate({});
        onSuccess();
    };

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Stack direction="row" spacing={2} alignItems="center">
                <Typography sx={{ minWidth: 150, fontWeight: 500 }}>
                    {subcategory.name}
                </Typography>

                <TextField
                    type="number"
                    size="small"
                    value={buffer.minPrice ?? subcategory.minPrice}
                    onChange={(e) =>
                        setBuffer({ ...buffer, minPrice: Number(e.target.value) })
                    }
                    sx={{ width: 100 }}
                />
                <Typography color="text.secondary">—</Typography>
                <TextField
                    type="number"
                    size="small"
                    value={buffer.maxPrice ?? subcategory.maxPrice}
                    onChange={(e) =>
                        setBuffer({ ...buffer, maxPrice: Number(e.target.value) })
                    }
                    sx={{ width: 100 }}
                />
                <Typography variant="body2" color="text.secondary">
                    تومان
                </Typography>

                <Stack direction="row" spacing={1} ml="auto">
                    <Tooltip title="ذخیره تغییرات">
                        <span>
                            <IconButton
                                onClick={save}
                                color="success"
                                size="small"
                                disabled={!hasChanges}
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