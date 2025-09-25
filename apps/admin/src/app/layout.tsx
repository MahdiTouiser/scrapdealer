'use client';

import './globals.css';

import { Toaster } from 'react-hot-toast';

import {
  cacheRtl,
  theme,
} from '@/theme';
import { CacheProvider } from '@emotion/react';
import {
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <title>ScrapDealer Admin</title>
      </head>
      <body>
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <QueryClientProvider client={queryClient}>
              {children}
              <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                  style: { fontFamily: 'Vazirmatn', textAlign: 'right' },
                }}
              />
            </QueryClientProvider>
          </ThemeProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
