'use client';

import './globals.css';

import { Toaster } from 'react-hot-toast';

import { cacheRtl } from '@/theme';
import { CustomThemeProvider } from '@/theme/ThemeProvider';
import { CacheProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <CacheProvider value={cacheRtl}>
          <CustomThemeProvider> 
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
          </CustomThemeProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
