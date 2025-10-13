import { ReactNode } from 'react';

interface Props { children: ReactNode }

export default function SupportsActivityLayout({ children }: Props) {
    return <>{children}</>;
}
