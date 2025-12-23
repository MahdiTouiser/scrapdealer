import { useState } from 'react';

import { useApi } from '@/hooks/useApi';
import { useFileApi } from '@/hooks/useFileApi';
import AddCircleOutlineRoundedIcon
  from '@mui/icons-material/AddCircleOutlineRounded';
import CheckCircleOutlineRoundedIcon
  from '@mui/icons-material/CheckCircleOutlineRounded';
import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

interface Props {
    onSuccess: () => void
}

export default function AddCategoryForm({ onSuccess }: Props) {
    const [form, setForm] = useState({
        name: '',
        minPrice: '',
        maxPrice: '',
        imageId: null as string | null,
    })

    const { upload } = useFileApi()

    const createCat = useApi({
        key: ['createCat'],
        url: '/categories',
        method: 'POST',
        onSuccess: 'دسته جدید اضافه شد',
    })

    const formatNumber = (v: string) => {
        const n = v.replace(/\D/g, '')
        return n.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    const rawNumber = (v: string) => Number(v.replace(/,/g, ''))

    const handleImageSelect = async (file: File) => {
        const fd = new FormData()
        fd.append('file', file)
        fd.append('category', 'categories')

        const id = await upload.mutateAsync(fd)

        setForm((p) => ({
            ...p,
            imageId: id,
        }))
    }

    const handleSubmit = async () => {
        if (!form.name || !form.minPrice || !form.maxPrice) return

        await createCat.mutateAsync({
            name: form.name,
            minPrice: rawNumber(form.minPrice),
            maxPrice: rawNumber(form.maxPrice),
            images: form.imageId ? [form.imageId] : [],
        })

        setForm({
            name: '',
            minPrice: '',
            maxPrice: '',
            imageId: null,
        })

        onSuccess()
    }

    const imageSelected = Boolean(form.imageId)

    return (
        <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: 'grey.50', borderRadius: 2 }}>
            <Typography variant="subtitle2" mb={2} color="text.secondary">
                افزودن دسته جدید
            </Typography>

            <Grid container spacing={2} alignItems="center">
                <Grid size={{ xs: 12, sm: 3 }}>
                    <TextField
                        fullWidth
                        label="نام دسته"
                        size="small"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                </Grid>

                <Grid size={{ xs: 6, sm: 2.5 }}>
                    <TextField
                        fullWidth
                        label="قیمت حداقل"
                        size="small"
                        value={form.minPrice}
                        onChange={(e) =>
                            setForm({ ...form, minPrice: formatNumber(e.target.value) })
                        }
                    />
                </Grid>

                <Grid size={{ xs: 6, sm: 2.5 }}>
                    <TextField
                        fullWidth
                        label="قیمت حداکثر"
                        size="small"
                        value={form.maxPrice}
                        onChange={(e) =>
                            setForm({ ...form, maxPrice: formatNumber(e.target.value) })
                        }
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                    <Button
                        fullWidth
                        variant={imageSelected ? 'contained' : 'outlined'}
                        color={imageSelected ? 'success' : 'primary'}
                        component="label"
                        disabled={upload.loading}
                        startIcon={imageSelected ? <CheckCircleOutlineRoundedIcon /> : undefined}
                    >
                        {imageSelected ? 'تصویر انتخاب شد' : 'انتخاب تصویر'}
                        <input
                            hidden
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handleImageSelect(file)
                            }}
                        />
                    </Button>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<AddCircleOutlineRoundedIcon />}
                        onClick={handleSubmit}
                        disabled={
                            !form.name ||
                            !form.minPrice ||
                            !form.maxPrice ||
                            upload.loading
                        }
                    >
                        افزودن دسته
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    )
}
