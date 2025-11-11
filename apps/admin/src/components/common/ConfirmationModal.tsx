'use client';

import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material';

interface ConfirmationModalProps {
    open: boolean;
    title?: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
    loading?: boolean;
}

const ConfirmationModal = ({
    open,
    title = 'تأیید عملیات',
    message,
    confirmLabel = 'تأیید',
    cancelLabel = 'لغو',
    onConfirm,
    onCancel,
    loading = false,
}: ConfirmationModalProps) => {
    return (
        <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
            {title && <DialogTitle>{title}</DialogTitle>}
            <DialogContent>
                <Typography variant="body1" sx={{ py: 1 }}>
                    {message}
                </Typography>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onCancel} disabled={loading}>
                    {cancelLabel}
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={onConfirm}
                    disabled={loading}
                    sx={{
                        minWidth: 100,
                        position: 'relative',
                    }}
                >
                    {loading ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CircularProgress
                                size={18}
                                color="inherit"
                                thickness={5}
                            />
                            <Typography variant="body2">در حال حذف...</Typography>
                        </Box>
                    ) : (
                        confirmLabel
                    )}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationModal;
