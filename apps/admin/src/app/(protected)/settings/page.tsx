'use client';

import React, {
  useEffect,
  useState,
} from 'react';

import PageTitle from '@/components/common/PageTitle';
import { useApi } from '@/hooks/useApi';
import fa from '@/i18n/fa';
import {
  Box,
  Button,
  TextField,
} from '@mui/material';

export interface Settings {
    buyerCommissionRate: number | null
    buyerCommissionFixedAmount: number | null
}

const SettingsPage: React.FC = () => {
    const { data, loading } = useApi<Settings>({
        key: ['Settings'],
        url: '/Settings',
    });

    const { mutate, loading: saving } = useApi<unknown, Settings>({
        key: ['Settings'],
        url: '/Settings',
        method: 'PUT',
        onSuccess: fa.savedSuccessfully,
    });

    const [form, setForm] = useState<Settings>({
        buyerCommissionRate: null,
        buyerCommissionFixedAmount: null,
    });

    useEffect(() => {
        if (data) setForm(data);
    }, [data]);

    const update =
        (key: keyof Settings) =>
            (e: React.ChangeEvent<HTMLInputElement>) => {
                const v = e.target.value;
                setForm({
                    ...form,
                    [key]: v === '' ? null : Number(v),
                });
            };

    const submit = () => {
        mutate(form);
    };

    return (
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <PageTitle title={fa.settings} />

            <TextField
                label={fa.buyerCommissionRate}
                type="number"
                value={form.buyerCommissionRate ?? ''}
                onChange={update('buyerCommissionRate')}
                disabled={loading}
            />

            <TextField
                label={fa.buyerCommissionFixedAmount}
                type="number"
                value={form.buyerCommissionFixedAmount ?? ''}
                onChange={update('buyerCommissionFixedAmount')}
                disabled={loading}
            />

            <Button
                variant="contained"
                onClick={submit}
                disabled={saving}
            >
                {fa.save}
            </Button>
        </Box>
    );
};

export default SettingsPage;
