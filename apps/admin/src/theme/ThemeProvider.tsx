'use client';

import React, {
    createContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

import {
    CssBaseline,
    ThemeProvider as MuiThemeProvider,
} from '@mui/material';

import { darkTheme } from './darkTheme';
import { lightTheme } from './lightTheme';

type ThemeMode = 'light' | 'dark';

interface ThemeContextProps {
    mode: ThemeMode;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
    mode: 'light',
    toggleTheme: () => { },
});

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<ThemeMode>('light');

    useEffect(() => {
        const stored = localStorage.getItem('theme');
        if (stored === 'light' || stored === 'dark') {
            setMode(stored);
        } else {
            const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setMode(systemDark ? 'dark' : 'light');
        }
    }, []);

    const toggleTheme = () => {
        setMode((prev) => {
            const newMode = prev === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newMode);
            return newMode;
        });
    };

    const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <div
                    style={{
                        transition: 'background-color 0.3s ease, color 0.3s ease',
                        minHeight: '100vh',
                    }}
                >
                    {children}
                </div>
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};
