'use client';

import { useThemeMode } from '@/contexts/ThemeContextProvider';
import {
    Brightness4,
    Brightness7,
} from '@mui/icons-material';
import {
    IconButton,
    Tooltip,
} from '@mui/material';

export default function ThemeToggle({ open }: { open: boolean }) {
    const { mode, toggleMode } = useThemeMode();

    return (
        <Tooltip
            title={open ? (mode === 'light' ? 'تغییر به حالت تیره' : 'تغییر به حالت روشن') : ''}
            placement="right"
            arrow
        >
            <IconButton
                onClick={toggleMode}
                sx={{
                    color: mode === 'light' ? 'warning.main' : 'primary.light',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'rotate(15deg) scale(1.1)',
                        backgroundColor: 'action.hover',
                    },
                    width: 40,
                    height: 40,
                    alignSelf: 'center',
                    my: 1,
                }}
            >
                {mode === 'light' ? (
                    <Brightness4 sx={{ fontSize: 26 }} />
                ) : (
                    <Brightness7 sx={{ fontSize: 26 }} />
                )}
            </IconButton>
        </Tooltip>
    );
}
