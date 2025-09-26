import rtlPlugin from 'stylis-plugin-rtl';

import createCache from '@emotion/cache';
import { createTheme } from '@mui/material/styles';

export const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});

export const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Vazirmatn, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: 'Vazirmatn, sans-serif',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#0288d1',
    },
    secondary: {
      main: '#01579b',
    },
  },
});
