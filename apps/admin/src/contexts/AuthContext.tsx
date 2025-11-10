'use client';

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';

interface Permission {
    id: string;
    name: string;
}

interface AuthContextType {
    token: string | null;
    role: string | null;
    permissions: Permission[];
    setAuth: (token: string, role: string) => void;
    setPermissions: (permissions: Permission[]) => void;
    clearAuth: () => void;
    hasPermission: (permissionName: string) => boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [permissions, setPermissionsState] = useState<Permission[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem('auth_token');
            const storedRole = localStorage.getItem('user_role');
            const storedPermissions = localStorage.getItem('permissions');

            if (storedToken) setToken(storedToken);
            if (storedRole) setRole(storedRole);
            if (storedPermissions) {
                try {
                    setPermissionsState(JSON.parse(storedPermissions));
                } catch (error) {
                    console.error('Error parsing permissions:', error);
                }
            }
        }
    }, []);

    const setAuth = (newToken: string, newRole: string) => {
        setToken(newToken);
        setRole(newRole);
        if (typeof window !== 'undefined') {
            localStorage.setItem('auth_token', newToken);
            localStorage.setItem('user_role', newRole);
        }
    };

    const setPermissions = (newPermissions: Permission[]) => {
        setPermissionsState(newPermissions);
        if (typeof window !== 'undefined') {
            localStorage.setItem('permissions', JSON.stringify(newPermissions));
        }
    };

    const clearAuth = () => {
        setToken(null);
        setRole(null);
        setPermissionsState([]);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_role');
            localStorage.removeItem('permissions');
        }
    };

    const hasPermission = (permissionName: string) => {
        return permissions.some(p => p.name === permissionName);
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider
            value={{
                token,
                role,
                permissions,
                setAuth,
                setPermissions,
                clearAuth,
                hasPermission,
                isAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}