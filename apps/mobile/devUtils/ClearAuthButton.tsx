import { Button } from 'react-native';

import { useAuth } from '../contexts/AuthContext';

export default function ClearAuthButton() {
    const { signOut } = useAuth();

    return (
        <Button
            title="خروج از حساب کاربری"
            onPress={signOut}
        />
    );
}
