'use client';

import {
    ReactNode,
    useEffect,
} from 'react';

import { useRouter } from 'next/navigation';

interface Props {
    children: ReactNode;
}

export default function ProtectedLayout({ children }: Props) {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (!token) router.replace('/auth');
    }, [router]);

    return <>{children}</>;
}
