import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  direction: 'rtl',
  palette: {
    mode: 'light',
    primary: { main: '#0288d1' },
    secondary: { main: '#01579b' },
    background: {
      default: '#f5f6fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e1e1e',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: 'Vazirmatn, sans-serif',
  },
});
