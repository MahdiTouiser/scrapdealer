'use client';

import React from 'react';

import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Stack,
    Typography,
} from '@mui/material';

interface BuyerDetails {
    name: string;
    company: string;
    phone: string;
    nationalId: string;
    registrationDate: string;
    documentsStatus: string;
    accountStatus: string;
    idCard?: string;
    businessLicense?: string;
}

interface RowDetailsModalProps {
    open: boolean;
    onClose: () => void;
    rowData: BuyerDetails | null;
}

const BuyersDetailModal: React.FC<RowDetailsModalProps> = ({ open, onClose, rowData }) => {
    if (!rowData) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: { borderRadius: 3, p: 2, overflow: 'hidden', boxShadow: 8 },
            }}
        >
            <DialogTitle sx={{ fontWeight: 700, fontSize: '1.5rem', textAlign: 'center' }}>
                جزئیات حساب: {rowData.name}
            </DialogTitle>
            <Divider sx={{ mb: 2 }} />

            <DialogContent>
                <Stack spacing={2}>
                    {[
                        { label: 'نام شرکت', value: rowData.company },
                        { label: 'شماره تماس', value: rowData.phone },
                        { label: 'کد ملی', value: rowData.nationalId },
                        { label: 'تاریخ ثبت‌نام', value: rowData.registrationDate },
                        { label: 'وضعیت مدارک', value: rowData.documentsStatus },
                        { label: 'وضعیت حساب', value: rowData.accountStatus },
                    ].map((item) => (
                        <Stack key={item.label} direction="row" justifyContent="space-between">
                            <Typography variant="subtitle2" color="text.secondary">
                                {item.label}
                            </Typography>
                            <Typography variant="body1">{item.value}</Typography>
                        </Stack>
                    ))}

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={2} justifyContent="center">
                        <Card sx={{ flex: 1, boxShadow: 4 }}>
                            <CardContent>
                                <Typography
                                    variant="subtitle1"
                                    align="center"
                                    fontWeight={600}
                                    gutterBottom
                                >
                                    کارت ملی
                                </Typography>
                                <CardMedia
                                    component="img"
                                    image={rowData.idCard}
                                    alt="کارت ملی"
                                    sx={{
                                        borderRadius: 2,
                                        maxHeight: 250,
                                        objectFit: 'contain',
                                        transition: 'transform 0.3s',
                                        '&:hover': { transform: 'scale(1.05)' },
                                    }}
                                />
                            </CardContent>
                        </Card>

                        <Card sx={{ flex: 1, boxShadow: 4 }}>
                            <CardContent>
                                <Typography
                                    variant="subtitle1"
                                    align="center"
                                    fontWeight={600}
                                    gutterBottom
                                >
                                    جواز کسب
                                </Typography>
                                <CardMedia
                                    component="img"
                                    image={rowData.businessLicense}
                                    alt="جواز کسب"
                                    sx={{
                                        borderRadius: 2,
                                        maxHeight: 250,
                                        objectFit: 'contain',
                                        transition: 'transform 0.3s',
                                        '&:hover': { transform: 'scale(1.05)' },
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </Stack>
                </Stack>
            </DialogContent>

            <DialogActions sx={{ justifyContent: 'center', pt: 2 }}>
                <Button variant="contained" onClick={onClose}>
                    بستن
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BuyersDetailModal;
