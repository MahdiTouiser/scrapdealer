import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  MD3DarkTheme,
  MD3LightTheme,
  MD3Theme,
  PaperProvider,
} from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  colors,
  radii,
} from '@scrapdealer/tokens';

export interface ExtendedTheme extends MD3Theme {
    myColors: {
        textPrimary: string;
        textSecondary: string;
        white: string;
        semanticError: string;
    };
}

interface ThemeContextType {
    mode: 'light' | 'dark';
    theme: ExtendedTheme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    mode: 'light',
    theme: {} as ExtendedTheme,
    toggleTheme: () => { },
});

export const useThemeContext = () => useContext(ThemeContext);

interface Props {
    children: ReactNode;
}

const getPaperTheme = (mode: 'light' | 'dark'): ExtendedTheme => {
    const baseTheme = mode === 'light' ? MD3LightTheme : MD3DarkTheme;
    const colorSet = colors[mode];

    return {
        ...baseTheme,
        roundness: radii.lg,
        colors: {
            ...baseTheme.colors,
            primary: colorSet.primary,
            onPrimary: colorSet.textPrimary,
            secondary: colorSet.secondary,
            onSecondary: colorSet.textPrimary,
            background: colorSet.background,
            surface: colorSet.surface,
            onSurface: colorSet.textPrimary,
            error: '#B00020',
            onError: colorSet.textSecondary,
        },
        myColors: {
            textPrimary: colorSet.textPrimary,
            textSecondary: colorSet.textSecondary,
            white: '#ffffff',
            semanticError: '#B00020',
        },
    };
};

export const ThemeProvider: React.FC<Props> = ({ children }) => {
    const [mode, setMode] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        AsyncStorage.getItem('theme').then(saved => {
            if (saved === 'light' || saved === 'dark') setMode(saved);
        });
    }, []);

    const toggleTheme = async () => {
        const next = mode === 'light' ? 'dark' : 'light';
        await AsyncStorage.setItem('theme', next);
        setMode(next);
    };

    const theme = useMemo(() => getPaperTheme(mode), [mode]);

    return (
        <ThemeContext.Provider value={{ mode, theme, toggleTheme }}>
            <PaperProvider theme={theme}>{children}</PaperProvider>
        </ThemeContext.Provider>
    );
};
