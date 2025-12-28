'use client'

import {
  useMemo,
  useState,
} from 'react';

import { useApi } from '@/hooks/useApi';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';

interface Reward {
    id: string;
    amount: number;
    userId: string;
    userFullName: string;
    description: string;
}

interface RewardsModalProps {
    open: boolean;
    onClose: () => void;
    buyerId: string | null;
    allRewards: Reward[];
    refetchRewards: () => void;
}

const RewardsModal = ({
    open,
    onClose,
    buyerId,
    allRewards,
    refetchRewards,
}: RewardsModalProps) => {
    const [amountInput, setAmountInput] = useState(''); // Raw input (what user sees/types)
    const [description, setDescription] = useState('');

    // Convert Persian/Arabic digits to English
    const persianToEnglish = (str: string): string =>
        str.replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776));

    // Clean and validate amount: only digits allowed after conversion
    const normalizeAmount = (value: string): string => {
        const english = persianToEnglish(value);
        const digitsOnly = english.replace(/[^\d]/g, ''); // Remove ANY non-digit
        return digitsOnly;
    };

    // Get final numeric value safely
    const getAmountNumber = (): number | null => {
        const cleaned = normalizeAmount(amountInput);
        if (!cleaned) return null;
        const num = Number(cleaned);
        return isNaN(num) ? null : num;
    };

    const buyerRewards = useMemo(() => {
        if (!buyerId) return [];
        return allRewards.filter((r) => r.userId === buyerId);
    }, [allRewards, buyerId]);

    const { mutate: deleteReward, isPending: deleting } = useApi<void, string>({
        key: ['delete-reward'],
        url: (id) => `/Rewards/${id}`,
        method: 'DELETE',
        onSuccess: 'پاداش با موفقیت حذف شد',
    });

    const { mutateAsync: assignReward, isPending: assigning } = useApi<void, any>({
        key: ['assign-reward'],
        url: '/Rewards',
        method: 'POST',
        onSuccess: 'پاداش با موفقیت تخصیص یافت',
    });

    const handleAddReward = async () => {
        if (!buyerId) return;

        const amountNum = getAmountNumber();
        if (!amountNum || amountNum <= 0) {
            // You can add a toast/error here if needed
            return;
        }

        try {
            await assignReward({
                userId: buyerId,
                amount: amountNum,
                description: description.trim() || 'بدون توضیح',
            });
            setAmountInput('');
            setDescription('');
            refetchRewards();
        } catch (err) {
            // Error toast already handled by useApi
        }
    };

    const handleDelete = (id: string) => {
        deleteReward(id, {
            onSuccess: () => {
                refetchRewards();
            },
        });
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const normalized = normalizeAmount(e.target.value);
        setAmountInput(normalized);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>پاداش‌های خریدار</DialogTitle>
            <DialogContent dividers>
                <Box mb={4}>
                    <Typography variant="subtitle1" gutterBottom>
                        تخصیص پاداش جدید
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            label="مقدار پاداش"
                            value={amountInput}
                            onChange={handleAmountChange}
                            size="small"
                            fullWidth
                            disabled={assigning}
                            placeholder="مثلاً ۱۲۳۰۰۰"
                            inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                            }}
                            helperText="فقط عدد وارد کنید (فارسی یا انگلیسی)"
                        />
                        <TextField
                            label="توضیحات (اختیاری)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            size="small"
                            fullWidth
                            multiline
                            rows={2}
                            disabled={assigning}
                        />
                        <Button
                            variant="contained"
                            onClick={handleAddReward}
                            disabled={assigning || !getAmountNumber()}
                        >
                            {assigning ? <CircularProgress size={20} /> : 'تخصیص پاداش'}
                        </Button>
                    </Box>
                </Box>

                <Typography variant="subtitle1" gutterBottom>
                    پاداش‌های قبلی ({buyerRewards.length})
                </Typography>

                {buyerRewards.length === 0 ? (
                    <Box py={3} textAlign="center" color="text.secondary">
                        هیچ پاداشی ثبت نشده است
                    </Box>
                ) : (
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>مقدار</TableCell>
                                <TableCell>توضیحات</TableCell>
                                <TableCell align="center">عملیات</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {buyerRewards.map((r) => (
                                <TableRow key={r.id}>
                                    <TableCell>{r.amount.toLocaleString('fa-IR')}</TableCell>
                                    <TableCell>{r.description || '-'}</TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            onClick={() => handleDelete(r.id)}
                                            disabled={deleting}
                                            size="small"
                                            color="error"
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>بستن</Button>
            </DialogActions>
        </Dialog>
    );
};

export default RewardsModal;