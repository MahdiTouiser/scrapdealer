import { useState } from 'react';

import { useApi } from '@/hooks/useApi';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
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
    const [form, setForm] = useState({ name: '', minPrice: '', maxPrice: '' })

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

    const rawNumber = (v: string) => v.replace(/,/g, '')

    const handleSubmit = async () => {
        if (!form.name || !form.minPrice || !form.maxPrice) return

        await createCat.mutate({
            name: form.name,
            minPrice: Number(rawNumber(form.minPrice)),
            maxPrice: Number(rawNumber(form.maxPrice)),
        })

        setForm({ name: '', minPrice: '', maxPrice: '' })
        onSuccess()
    }

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
                        slotProps={{
                            input: {
                                inputMode: 'numeric',
                                endAdornment: (
                                    <Typography variant="caption" color="text.secondary">
                                        تومان
                                    </Typography>
                                ),
                            },
                        }}
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
                        slotProps={{
                            input: {
                                inputMode: 'numeric',
                                endAdornment: (
                                    <Typography variant="caption" color="text.secondary">
                                        تومان
                                    </Typography>
                                ),
                            },
                        }}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<AddCircleOutlineRoundedIcon />}
                        onClick={handleSubmit}
                        disabled={!form.name || !form.minPrice || !form.maxPrice}
                    >
                        افزودن دسته
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    )
}
