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
        setMode(prev => {
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
                    ...(mode === 'light'
                        ? {
                            primary: { main: '#00c853' },
                            secondary: { main: '#efefef' },
                            background: { default: '#efefef', paper: '#ffffff' },
                            text: { primary: '#000000', secondary: '#333333' },
                        }
                        : {
                            primary: { main: '#00c853' },
                            secondary: { main: '#efefef' },
                            background: { default: '#000000', paper: '#121212' },
                            text: { primary: '#efefef', secondary: '#b0b0b0' },
                        }),
                },
                typography: {
                    fontFamily: 'Vazirmatn, Inter, sans-serif',
                },
                shape: { borderRadius: 12 },
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
