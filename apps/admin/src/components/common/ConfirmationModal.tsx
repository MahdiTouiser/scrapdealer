'use client';

import {
  alpha,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useTheme,
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
    const theme = useTheme();

    return (
        <Dialog
            open={open}
            onClose={onCancel}
            maxWidth="xs"
            fullWidth
            slotProps={{
                paper: {
                    elevation: 0,
                    sx: {
                        borderRadius: 3,
                        overflow: 'hidden',
                        background:
                            theme.palette.mode === 'dark'
                                ? alpha(theme.palette.background.paper, 0.9)
                                : theme.palette.background.paper,
                        backdropFilter: 'blur(10px)',
                    },
                },
            }}
        >
            <Box
                sx={{
                    background: `linear-gradient(135deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
                    p: 2,
                }}
            >
                <DialogTitle
                    sx={{
                        m: 0,
                        p: 0,
                        color: theme.palette.common.white,
                        fontWeight: 700,
                        fontSize: '1.25rem',
                        textAlign: 'center',
                    }}
                >
                    {title}
                </DialogTitle>
            </Box>

            <DialogContent
                sx={{
                    py: 3,
                    px: 3,
                    textAlign: 'center',
                }}
            >
                <Typography
                    variant="body1"
                    sx={{
                        lineHeight: 1.8,
                        fontSize: '1rem',
                        color: theme.palette.text.primary,
                    }}
                >
                    {message}
                </Typography>
            </DialogContent>

            <DialogActions
                sx={{
                    px: 3,
                    pb: 3,
                    gap: 1.5,
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                <Button
                    onClick={onCancel}
                    disabled={loading}
                    fullWidth
                    variant="outlined"
                    sx={{
                        borderRadius: 2,
                        height: 44,
                    }}
                >
                    {cancelLabel}
                </Button>

                <Button
                    onClick={onConfirm}
                    disabled={loading}
                    fullWidth
                    variant="contained"
                    color="error"
                    sx={{
                        borderRadius: 2,
                        height: 44,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    {loading ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CircularProgress size={18} color="inherit" thickness={5} />
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
