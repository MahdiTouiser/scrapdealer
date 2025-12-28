'use client';

import React, {
  useEffect,
  useState,
} from 'react';

import PageTitle from '@/components/common/PageTitle';
import { useApi } from '@/hooks/useApi';
import fa from '@/i18n/fa';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';

export interface Settings {
    buyerCommissionRate: number | null
    buyerCommissionFixedAmount: number | null
}

interface ChangePasswordPayload {
    password: string
    oldPassword: string
}

const SettingsPage: React.FC = () => {
    const { data } = useApi<Settings>({
        key: ['Settings'],
        url: '/Settings',
    });

    const { mutate: saveSettings, loading: saving } = useApi<unknown, Settings>({
        key: ['Settings'],
        url: '/Settings',
        method: 'PUT',
    });

    const { mutate: changePassword, loading: changingPassword } =
        useApi<unknown, ChangePasswordPayload>({
            key: ['ChangePassword'],
            url: '/Users/ChangePassword',
            method: 'PUT',
            onSuccess: 'رمز عبور با موفقیت ویرایش شد',
        });

    const [form, setForm] = useState<Settings>({
        buyerCommissionRate: null,
        buyerCommissionFixedAmount: null,
    });

    const [passwordForm, setPasswordForm] = useState<ChangePasswordPayload>({
        oldPassword: '',
        password: '',
    });

    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);

    useEffect(() => {
        if (data) setForm(data);
    }, [data]);

    return (
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <PageTitle title={fa.settings} />

            <Typography variant="h6">
                {fa.commissionSettings}
            </Typography>

            <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                    label={fa.buyerCommissionRate}
                    type="number"
                    value={form.buyerCommissionRate ?? ''}
                    onChange={e =>
                        setForm({
                            ...form,
                            buyerCommissionRate:
                                e.target.value === '' ? null : Number(e.target.value),
                        })
                    }
                    fullWidth
                />

                <TextField
                    label={fa.buyerCommissionFixedAmount}
                    type="number"
                    value={form.buyerCommissionFixedAmount ?? ''}
                    onChange={e =>
                        setForm({
                            ...form,
                            buyerCommissionFixedAmount:
                                e.target.value === '' ? null : Number(e.target.value),
                        })
                    }
                    fullWidth
                />
            </Box>

            <Button
                variant="contained"
                onClick={() => saveSettings(form)}
                disabled={saving}
            >
                {fa.save}
            </Button>

            <Typography variant="h6">
                {fa.changePassword}
            </Typography>

            <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                    label={fa.oldPassword}
                    type={showOld ? 'text' : 'password'}
                    value={passwordForm.oldPassword}
                    onChange={e =>
                        setPasswordForm({
                            ...passwordForm,
                            oldPassword: e.target.value,
                        })
                    }
                    fullWidth
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowOld(v => !v)}>
                                        {showOld ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                <TextField
                    label={fa.newPassword}
                    type={showNew ? 'text' : 'password'}
                    value={passwordForm.password}
                    onChange={e =>
                        setPasswordForm({
                            ...passwordForm,
                            password: e.target.value,
                        })
                    }
                    fullWidth
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowNew(v => !v)}>
                                        {showNew ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </Box>

            <Button
                variant="contained"
                onClick={() => changePassword(passwordForm)}
                disabled={changingPassword}
            >
                {fa.save}
            </Button>
        </Box>
    );
};

export default SettingsPage;
