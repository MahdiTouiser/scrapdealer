'use client';

import React from 'react';

import PageTitle from '@/components/common/PageTitle';
import NotificationToggle from '@/components/settings/NotificationToggle';
import fa from '@/i18n/fa';
import {
  Box,
  Paper,
  Typography,
} from '@mui/material';

const SettingsPage: React.FC = () => {
    return (
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 4 }}>

            <PageTitle title={fa.settings}
            />

            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    🔔 اعلان‌ها
                </Typography>
                <NotificationToggle />
            </Paper>
        </Box>
    );
};

export default SettingsPage;
