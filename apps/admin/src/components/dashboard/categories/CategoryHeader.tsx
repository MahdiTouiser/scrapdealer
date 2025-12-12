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
    category: Cat
    onSuccess: () => void
}

export default function CategoryHeader({ category, onSuccess }: Props) {
    const [buffer, setBuffer] = useState<Partial<Cat>>({})

    const updateCat = useApi({ key: ['updateCat'], url: `/categories/${category.id}`, method: 'PUT' })
    const deleteCat = useApi({ key: ['deleteCat'], url: `/categories/${category.id}`, method: 'DELETE' })

    const hasChanges = Object.keys(buffer).length > 0

    const formatNumber = (v: string) => {
        const n = v.replace(/\D/g, '')
        return n.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    const raw = (v: string) => v.replace(/,/g, '')

    const save = async () => {
        if (!hasChanges) return
        await updateCat.mutateAsync({
            ...category,
            minPrice: Number(raw(String(buffer.minPrice ?? category.minPrice))),
            maxPrice: Number(raw(String(buffer.maxPrice ?? category.maxPrice)))
        })
        setBuffer({})
        onSuccess()
    }

    const remove = async () => {
        if (!confirm('آیا از حذف این دسته مطمئن هستید؟')) return
        await deleteCat.mutateAsync({})
        onSuccess()
    }

    const getDisplay = (val: number | string | undefined) => {
        const base = val === undefined ? '' : String(val)
        return formatNumber(base)
    }

    const handleMin = (v: string) => {
        const formatted = formatNumber(v)
        setBuffer({ ...buffer, minPrice: Number(raw(formatted)) })
    }

    const handleMax = (v: string) => {
        const formatted = formatNumber(v)
        setBuffer({ ...buffer, maxPrice: Number(raw(formatted)) })
    }

    return (
        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
            <Stack direction="row" spacing={1} alignItems="center" flexGrow={1}>
                <TextField
                    size="small"
                    value={getDisplay(buffer.minPrice ?? category.minPrice)}
                    onChange={(e) => handleMin(e.target.value)}
                    sx={{ width: 120 }}
                />

                <Typography color="text.secondary">—</Typography>

                <TextField
                    size="small"
                    value={getDisplay(buffer.maxPrice ?? category.maxPrice)}
                    onChange={(e) => handleMax(e.target.value)}
                    sx={{ width: 120 }}
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
    )
}
