"use client";
import {
    createTheme,
    CssBaseline,
    ThemeProvider,
} from '@mui/material';
import {
    colors,
    radii,
    typography,
} from '@scrapdealer/tokens';

const theme = createTheme({
    palette: {
        primary: { main: colors.primary.main, contrastText: colors.primary.contrastText },
        secondary: { main: colors.secondary.main, contrastText: colors.secondary.contrastText },
        background: { default: colors.gray[50] }
    },
    shape: { borderRadius: radii.md },
    typography: {
        fontFamily: typography.fontFamily,
        h1: { fontSize: typography.h1.size, fontWeight: typography.h1.weight },
        body1: { fontSize: typography.body.size, fontWeight: typography.body.weight }
    }
});

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
