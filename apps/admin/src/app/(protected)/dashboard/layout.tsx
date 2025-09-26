'use client';

import Sidebar from '@/components/Sidebar';
import {
  Box,
  Toolbar,
} from '@mui/material';

import ProtectedLayout from '../layout';

interface Props {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
    return (
        <ProtectedLayout>
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    {children}
                </Box>
            </Box>
        </ProtectedLayout>
    );
}
