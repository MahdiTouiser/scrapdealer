'use client';

import React, {
  useEffect,
  useState,
} from 'react';

import { Settings } from '@/app/(protected)/settings/page';
import { useApi } from '@/hooks/useApi';
import {
  Box,
  Button,
  Slider,
  Typography,
} from '@mui/material';

const CommissionControl: React.FC = () => {
    const { data } = useApi<Settings>({
        key: ['Settings'],
        url: '/Settings',
    });

    const { mutate, loading } = useApi<unknown, Settings>({
        key: ['Settings'],
        url: '/Settings',
        method: 'PUT',
    });

    const [commission, setCommission] = useState<number>(0);

    useEffect(() => {
        if (data?.buyerCommissionRate != null) {
            setCommission(data.buyerCommissionRate);
        }
    }, [data]);

    const onChange = (_: Event, value: number | number[]) => {
        setCommission(value as number);
    };

    const onSave = () => {
        mutate({
            buyerCommissionRate: commission,
            buyerCommissionFixedAmount: null,
        });
    };

    return (
        <Box>
            <Typography gutterBottom>
                درصد فعلی: {commission}%
            </Typography>

            <Slider
                value={commission}
                onChange={onChange}
                step={0.5}
                min={0}
                max={10}
                valueLabelDisplay="auto"
            />

            <Button
                variant="contained"
                onClick={onSave}
                disabled={loading}
            >
                ذخیره تغییرات
            </Button>
        </Box>
    );
};

export default CommissionControl;
