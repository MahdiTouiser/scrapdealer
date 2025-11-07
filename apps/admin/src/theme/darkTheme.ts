import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  direction: 'rtl',
  palette: {
    mode: 'dark',
    primary: { main: '#efefef' },
    secondary: { main: '#00c853' },
    background: { default: '#000000', paper: '#121212' },
    text: { primary: '#efefef', secondary: '#b0b0b0' },
  },
  typography: {
    fontFamily: 'Inter, Vazirmatn, sans-serif',
    button: { textTransform: 'none' },
  },
  shape: { borderRadius: 12 },
});
