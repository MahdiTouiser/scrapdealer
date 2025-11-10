'use client';

import { Toaster } from 'react-hot-toast';

import { AuthProvider } from '@/contexts/AuthContext';
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
                <AuthProvider>
                    {children}
                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                        toastOptions={{
                            style: { fontFamily: 'Vazirmatn', textAlign: 'right' },
                        }}
                    />
                </AuthProvider>
            </QueryClientProvider>
        </ThemeContextProvider>
    );
}