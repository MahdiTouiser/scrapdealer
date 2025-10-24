/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

interface RowDetailsModalProps {
    open: boolean;
    onClose: () => void;
    rowData: any;
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
                sx: { borderRadius: 3, p: 2, overflow: 'hidden', boxShadow: 6 },
            }}
        >
            <DialogTitle sx={{ fontWeight: 700, fontSize: '1.25rem' }}>
                جزئیات حساب: {rowData.name}
            </DialogTitle>
            <Divider />

            <DialogContent sx={{ mt: 2 }}>
                <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="subtitle2" color="text.secondary">
                            نام شرکت
                        </Typography>
                        <Typography variant="body1">{rowData.company}</Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="subtitle2" color="text.secondary">
                            شماره تماس
                        </Typography>
                        <Typography variant="body1">{rowData.phone}</Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="subtitle2" color="text.secondary">
                            کد ملی
                        </Typography>
                        <Typography variant="body1">{rowData.nationalId}</Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="subtitle2" color="text.secondary">
                            تاریخ ثبت‌نام
                        </Typography>
                        <Typography variant="body1">{rowData.registrationDate}</Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="subtitle2" color="text.secondary">
                            وضعیت مدارک
                        </Typography>
                        <Typography variant="body1">{rowData.documentsStatus}</Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="subtitle2" color="text.secondary">
                            وضعیت حساب
                        </Typography>
                        <Typography variant="body1">{rowData.accountStatus}</Typography>
                    </Stack>
                </Stack>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button variant="contained" onClick={onClose}>
                    بستن
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BuyersDetailModal;
