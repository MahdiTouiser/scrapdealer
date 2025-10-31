'use client';

import React, { useState } from 'react';

import AddCircleOutlineRoundedIcon
  from '@mui/icons-material/AddCircleOutlineRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import SaveAltRoundedIcon from '@mui/icons-material/SaveAltRounded';
import {
  Box,
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
    price: number;
}

const ScrapPriceManager: React.FC = () => {
    const [scraps, setScraps] = useState<Scrap[]>([
        { id: 1, name: 'آهن', price: 25000 },
        { id: 2, name: 'مس', price: 120000 },
    ]);

    const [newScrap, setNewScrap] = useState({ name: '', price: '' });

    const handleAdd = () => {
        if (!newScrap.name || !newScrap.price) return;
        setScraps(prev => [
            ...prev,
            { id: Date.now(), name: newScrap.name, price: Number(newScrap.price) },
        ]);
        setNewScrap({ name: '', price: '' });
    };

    const handlePriceChange = (id: number, price: number) => {
        setScraps(scraps.map(s => (s.id === id ? { ...s, price } : s)));
    };

    const handleDelete = (id: number) => {
        setScraps(scraps.filter(s => s.id !== id));
    };

    return (
        <Paper
            elevation={3}
            sx={{
                p: 3,
                borderRadius: 4,
                background: theme =>
                    theme.palette.mode === 'dark'
                        ? theme.palette.grey[900]
                        : theme.palette.background.paper,
                boxShadow: theme =>
                    theme.palette.mode === 'dark'
                        ? '0 0 12px rgba(255,255,255,0.05)'
                        : '0 4px 20px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
            }}
        >
            <Box sx={{ mb: 3 }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        mb: 1,
                    }}
                >
                    مدیریت قیمت ضایعات
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    در این بخش می‌توانید نوع ضایعات و قیمت هر کدام را مدیریت کنید.
                </Typography>
            </Box>

            <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
                <Grid size={6}>
                    <TextField
                        fullWidth
                        label="نام ضایعه"
                        value={newScrap.name}
                        onChange={e => setNewScrap({ ...newScrap, name: e.target.value })}
                        size="small"
                        variant="outlined"
                    />
                </Grid>
                <Grid size={6}>
                    <TextField
                        fullWidth
                        label="قیمت (تومان)"
                        type="number"
                        value={newScrap.price}
                        onChange={e => setNewScrap({ ...newScrap, price: e.target.value })}
                        size="small"
                        variant="outlined"
                    />
                </Grid>
                <Grid size={2}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        startIcon={<AddCircleOutlineRoundedIcon />}
                        onClick={handleAdd}
                        sx={{
                            height: '40px',
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                        }}
                    >
                        افزودن
                    </Button>
                </Grid>
            </Grid>

            {/* Table */}
            <TableContainer
                component={Paper}
                sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: theme =>
                        theme.palette.mode === 'dark'
                            ? '0 0 10px rgba(255,255,255,0.05)'
                            : '0 2px 10px rgba(0,0,0,0.05)',
                }}
            >
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: theme => theme.palette.action.hover }}>
                            <TableCell sx={{ fontWeight: 600 }}>نام ضایعه</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>قیمت (تومان)</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 600 }}>
                                عملیات
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {scraps.map(scrap => (
                            <TableRow
                                key={scrap.id}
                                hover
                                sx={{
                                    transition: 'all 0.2s',
                                    '&:hover': {
                                        backgroundColor: theme =>
                                            theme.palette.mode === 'dark'
                                                ? 'rgba(255,255,255,0.05)'
                                                : 'rgba(0,0,0,0.02)',
                                    },
                                }}
                            >
                                <TableCell>{scrap.name}</TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        type="number"
                                        value={scrap.price}
                                        onChange={e => handlePriceChange(scrap.id, +e.target.value)}
                                        variant="outlined"
                                        sx={{ width: 140 }}
                                        InputProps={{
                                            endAdornment: <Typography sx={{ mr: 1 }}>تومان</Typography>,
                                        }}
                                    />
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
                                <TableCell colSpan={3} align="center">
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
