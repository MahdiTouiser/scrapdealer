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
    fontFamily: `'Vazirmatn', 'Tahoma', 'sans-serif'`,
  },
});
