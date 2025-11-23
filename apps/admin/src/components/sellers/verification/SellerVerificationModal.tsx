'use client';

import React from 'react';

import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material';

interface VerificationModalProps {
    seller: {
        id: number;
        name: string;
        phone: string;
        company: string;
        status?: 'در انتظار' | 'تایید شده' | 'رد شده';
    };
    onClose: () => void;
    onApprove?: (id: number) => void;
    onReject?: (id: number) => void;
}

const SellerVerificationModal: React.FC<VerificationModalProps> = ({
    seller,
    onClose,
    onApprove,
    onReject,
}) => {
    const handleApprove = () => {
        if (onApprove) onApprove(seller.id);
        onClose();
    };

    const handleReject = () => {
        if (onReject) onReject(seller.id);
        onClose();
    };

    return (
        <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 700, fontSize: '1.25rem' }}>
                بررسی فروشنده
            </DialogTitle>

            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="h6" fontWeight={600}>
                        {seller.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        شرکت: {seller.company}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        شماره تماس: {seller.phone}
                    </Typography>
                    {seller.status && (
                        <Typography variant="body2" color="text.secondary">
                            وضعیت: {seller.status}
                        </Typography>
                    )}
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button color="error" variant="outlined" onClick={handleReject}>
                    رد
                </Button>
                <Button color="success" variant="contained" onClick={handleApprove}>
                    تایید
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SellerVerificationModal;
