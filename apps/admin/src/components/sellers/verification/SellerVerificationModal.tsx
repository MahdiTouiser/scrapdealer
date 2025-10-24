'use client';

import React from 'react';

import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Typography,
} from '@mui/material';

interface VerificationModalProps {
    seller: {
        id: number;
        name: string;
        phone: string;
        company: string;
        documents: { idCard: string; businessLicense: string };
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
        <Dialog open onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ fontWeight: 700, fontSize: '1.25rem' }}>
                بررسی مدارک فروشنده
            </DialogTitle>

            <DialogContent>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" fontWeight={600}>
                        {seller.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        شرکت: {seller.company}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        شماره تماس: {seller.phone}
                    </Typography>
                </Box>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
                    <Card sx={{ flex: 1, boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="subtitle1" align="center" fontWeight={600} gutterBottom>
                                کارت ملی
                            </Typography>
                            <CardMedia
                                component="img"
                                image={seller.documents.idCard}
                                alt="کارت ملی"
                                sx={{ borderRadius: 2, maxHeight: 250, objectFit: 'contain' }}
                            />
                        </CardContent>
                    </Card>

                    <Card sx={{ flex: 1, boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="subtitle1" align="center" fontWeight={600} gutterBottom>
                                جواز کسب
                            </Typography>
                            <CardMedia
                                component="img"
                                image={seller.documents.businessLicense}
                                alt="جواز کسب"
                                sx={{ borderRadius: 2, maxHeight: 250, objectFit: 'contain' }}
                            />
                        </CardContent>
                    </Card>
                </Stack>
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
