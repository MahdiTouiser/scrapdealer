'use client';

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
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

const getAppTheme = (mode: 'light' | 'dark') =>
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
                    primary: { main: '#efefef' },
                    secondary: { main: '#00c853' },
                    background: { default: '#000000', paper: '#121212' },
                    text: { primary: '#efefef', secondary: '#b0b0b0' },
                }),
        },
        typography: {
            fontFamily: 'Vazirmatn, Inter, sans-serif',
            button: { textTransform: 'none' },
        },
        shape: { borderRadius: 12 },
    });

export default function ThemeProvider({ children }: Props) {
    const [mode, setMode] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if (saved) setMode(saved);
    }, []);

    const toggleTheme = () => {
        setMode(prev => {
            const next = prev === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', next);
            return next;
        });
    };

    const theme = useMemo(() => getAppTheme(mode), [mode]);

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
}
