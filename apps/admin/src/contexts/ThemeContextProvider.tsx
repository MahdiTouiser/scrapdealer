'use client';

import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

import rtlPlugin from 'stylis-plugin-rtl';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import {
    createTheme,
    CssBaseline,
    ThemeProvider,
} from '@mui/material';

const ThemeModeContext = createContext({
    mode: 'light',
    toggleMode: () => { },
});

export function useThemeMode() {
    return useContext(ThemeModeContext);
}

export default function ThemeContextProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedMode = localStorage.getItem('themeMode') as 'light' | 'dark';
        if (savedMode === 'light' || savedMode === 'dark') {
            setMode(savedMode);
        }
        setMounted(true);
    }, []);

    const toggleMode = () => {
        setMode((prev) => {
            const newMode = prev === 'light' ? 'dark' : 'light';
            localStorage.setItem('themeMode', newMode);
            return newMode;
        });
    };

    const theme = useMemo(
        () =>
            createTheme({
                direction: 'rtl',
                palette: {
                    mode,
                    primary: { main: '#0288d1' },
                    secondary: { main: '#01579b' },
                    background: {
                        default: mode === 'dark' ? '#121212' : '#fafafa',
                        paper: mode === 'dark' ? '#1e1e1e' : '#fff',
                    },
                    text: {
                        primary: mode === 'dark' ? '#ffffff' : '#111111',
                        secondary: mode === 'dark' ? '#aaaaaa' : '#555555',
                    },
                },
                typography: {
                    fontFamily: 'Vazirmatn, sans-serif',
                },
            }),
        [mode]
    );

    const cacheRtl = useMemo(
        () =>
            createCache({
                key: 'muirtl',
                stylisPlugins: [rtlPlugin],
            }),
        []
    );

    if (!mounted) return null;

    return (
        <ThemeModeContext.Provider value={{ mode, toggleMode }}>
            <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </CacheProvider>
        </ThemeModeContext.Provider>
    );
}
