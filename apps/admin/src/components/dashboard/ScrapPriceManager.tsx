'use client';

import React, { useState } from 'react';

import AddCircleOutlineRoundedIcon
  from '@mui/icons-material/AddCircleOutlineRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import SaveAltRoundedIcon from '@mui/icons-material/SaveAltRounded';
import {
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';

interface Scrap {
    id: number;
    name: string;
    priceMin: number;
    priceMax: number;
    image?: string;
}

const ScrapPriceManager: React.FC = () => {
    const [scraps, setScraps] = useState<Scrap[]>([
        { id: 1, name: 'آهن', priceMin: 24000, priceMax: 26000 },
        { id: 2, name: 'مس', priceMin: 115000, priceMax: 125000 },
    ]);

    const [newScrap, setNewScrap] = useState({
        name: '',
        priceMin: '',
        priceMax: '',
        image: null as File | null,
    });

    const handleAdd = () => {
        if (!newScrap.name || !newScrap.priceMin || !newScrap.priceMax) return;

        const reader = new FileReader();
        reader.onload = () => {
            setScraps(prev => [
                ...prev,
                {
                    id: Date.now(),
                    name: newScrap.name,
                    priceMin: Number(newScrap.priceMin),
                    priceMax: Number(newScrap.priceMax),
                    image: reader.result as string,
                },
            ]);
        };
        if (newScrap.image) {
            reader.readAsDataURL(newScrap.image);
        } else {
            setScraps(prev => [
                ...prev,
                {
                    id: Date.now(),
                    name: newScrap.name,
                    priceMin: Number(newScrap.priceMin),
                    priceMax: Number(newScrap.priceMax),
                },
            ]);
        }

        setNewScrap({ name: '', priceMin: '', priceMax: '', image: null });
    };

    const handlePriceChange = (id: number, field: 'priceMin' | 'priceMax', value: number) => {
        setScraps(scraps.map(s => (s.id === id ? { ...s, [field]: value } : s)));
    };

    const handleDelete = (id: number) => {
        setScraps(scraps.filter(s => s.id !== id));
    };

    const handleImageChange = (file: File | null) => {
        setNewScrap(prev => ({ ...prev, image: file }));
    };

    return (
        <Paper
            elevation={3}
            sx={{
                p: 3,
                borderRadius: 4,
                background: theme => (theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.background.paper),
                boxShadow: theme =>
                    theme.palette.mode === 'dark' ? '0 0 12px rgba(255,255,255,0.05)' : '0 4px 20px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
            }}
        >
            <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
                <Grid size={3}>
                    <TextField
                        fullWidth
                        label="نام ضایعه"
                        value={newScrap.name}
                        onChange={e => setNewScrap({ ...newScrap, name: e.target.value })}
                        size="small"
                        variant="outlined"
                    />
                </Grid>
                <Grid size={2}>
                    <TextField
                        fullWidth
                        label="قیمت حداقل"
                        type="number"
                        value={newScrap.priceMin}
                        onChange={e => setNewScrap({ ...newScrap, priceMin: e.target.value })}
                        size="small"
                        variant="outlined"
                    />
                </Grid>
                <Grid size={2}>
                    <TextField
                        fullWidth
                        label="قیمت حداکثر"
                        type="number"
                        value={newScrap.priceMax}
                        onChange={e => setNewScrap({ ...newScrap, priceMax: e.target.value })}
                        size="small"
                        variant="outlined"
                    />
                </Grid>
                <Grid size={3}>
                    <Button
                        component="label"
                        fullWidth
                        variant="outlined"
                        sx={{ height: '40px', textTransform: 'none' }}
                    >
                        آپلود تصویر
                        <input type="file" hidden accept="image/*" onChange={e => handleImageChange(e.target.files?.[0] ?? null)} />
                    </Button>
                </Grid>
                <Grid size={2}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        startIcon={<AddCircleOutlineRoundedIcon />}
                        onClick={handleAdd}
                        sx={{ height: '40px', borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
                    >
                        افزودن
                    </Button>
                </Grid>
            </Grid>

            <TableContainer
                component={Paper}
                sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: theme =>
                        theme.palette.mode === 'dark' ? '0 0 10px rgba(255,255,255,0.05)' : '0 2px 10px rgba(0,0,0,0.05)',
                }}
            >
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: theme => theme.palette.action.hover }}>
                            <TableCell sx={{ fontWeight: 600 }}>تصویر</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>نام ضایعه</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>محدوده قیمت (تومان)</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 600 }}>
                                عملیات
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {scraps.map((scrap, index) => (
                            <TableRow
                                key={scrap.id}
                                hover
                                sx={{
                                    transition: 'all 0.2s',
                                    '&:hover': {
                                        backgroundColor: theme =>
                                            theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                                    },
                                }}
                            >
                                <TableCell>{index + 1}</TableCell>

                                <TableCell>{scrap.name}</TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <TextField
                                            size="small"
                                            type="number"
                                            value={scrap.priceMin}
                                            onChange={e => handlePriceChange(scrap.id, 'priceMin', +e.target.value)}
                                            variant="outlined"
                                            sx={{ width: 80 }}
                                        />
                                        <Typography>-</Typography>
                                        <TextField
                                            size="small"
                                            type="number"
                                            value={scrap.priceMax}
                                            onChange={e => handlePriceChange(scrap.id, 'priceMax', +e.target.value)}
                                            variant="outlined"
                                            sx={{ width: 80 }}
                                        />
                                        <Typography>تومان</Typography>
                                    </Stack>
                                </TableCell>
                                <TableCell align="center">
                                    <Stack direction="row" justifyContent="center" spacing={1}>
                                        <Tooltip title="ذخیره تغییرات">
                                            <IconButton color="success">
                                                <SaveAltRoundedIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="حذف">
                                            <IconButton color="error" onClick={() => handleDelete(scrap.id)}>
                                                <DeleteOutlineRoundedIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}

                        {scraps.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    <Typography color="text.secondary">هیچ ضایعه‌ای ثبت نشده است.</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default ScrapPriceManager;
