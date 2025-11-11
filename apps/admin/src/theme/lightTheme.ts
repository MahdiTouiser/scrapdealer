import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  direction: 'rtl',
  palette: {
    mode: 'light',
    primary: { main: '#00c853' },
    secondary: { main: '#efefef' },
    background: {
      default: '#efefef',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#333333',
    },
  },
  typography: {
    fontFamily: 'Vazirmatn, sans-serif',
  },
  shape: { borderRadius: 12 },
});
