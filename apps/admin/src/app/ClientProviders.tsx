'use client';

import { Toaster } from 'react-hot-toast';

import ThemeContextProvider from '@/contexts/ThemeContextProvider';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <ThemeContextProvider>
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
        </ThemeContextProvider>
    );
}
