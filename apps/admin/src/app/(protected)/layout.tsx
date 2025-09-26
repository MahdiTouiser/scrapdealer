'use client';

import { ReactNode } from 'react';

import MainLayout from '@/components/layouts/MainLayout';
import ProtectedLayout from '@/components/layouts/ProtectedLayout';

interface Props { children: ReactNode }

export default function PersistentProtectedLayout({ children }: Props) {
    return (
        <ProtectedLayout>
            <MainLayout>
                {children}
            </MainLayout>
        </ProtectedLayout>
    );
}
