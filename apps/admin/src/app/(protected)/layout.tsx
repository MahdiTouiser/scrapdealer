'use client';

import {
  ReactNode,
  useEffect,
} from 'react';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface Props {
    children: ReactNode;
}

export default function ProtectedLayout({ children }: Props) {
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('auth_token');
        if (!token) router.replace('/auth');
    }, [router]);

    return <>{children}</>;
}
