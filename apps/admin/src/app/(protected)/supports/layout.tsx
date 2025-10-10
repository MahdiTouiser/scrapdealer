import { ReactNode } from 'react';

interface Props { children: ReactNode }

export default function SupportsLayout({ children }: Props) {
    return <>{children}</>;
}
