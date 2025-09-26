'use client';
import Sidebar from '@/components/Sidebar';
import {
  Box,
  Toolbar,
} from '@mui/material';

interface Props { children: React.ReactNode; }

export default function MainLayout({ children }: Props) {
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}
