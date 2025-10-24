'use client';

import {
    createContext,
    ReactNode,
    useContext,
    useMemo,
    useState,
} from 'react';

import {
    createTheme,
    CssBaseline,
    ThemeProvider as MuiThemeProvider,
} from '@mui/material';

interface ThemeContextType {
    mode: 'light' | 'dark';
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    mode: 'light',
    toggleTheme: () => { },
});

export const useThemeContext = () => useContext(ThemeContext);

interface Props {
    children: ReactNode;
}

export default function ThemeProvider({ children }: Props) {
    const [mode, setMode] = useState<'light' | 'dark'>(
        (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
    );

    const toggleTheme = () => {
        setMode(prev => {
            const next = prev === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', next);
            return next;
        });
    };

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === 'light'
                        ? { primary: { main: '#0288d1' }, secondary: { main: '#01579b' } }
                        : { primary: { main: '#90caf9' }, secondary: { main: '#f48fb1' } }),
                    background: { default: mode === 'light' ? '#f5f5f5' : '#121212' },
                },
                typography: { fontFamily: 'Vazirmatn, sans-serif' },
            }),
        [mode]
    );

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
}
