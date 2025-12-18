import { Button } from 'react-native';

import { clearAuthToken } from './devUtils';

export default function ClearAuthButton() {
    return (
        <Button
            title="Clear Auth Token (Dev Only)"
            onPress={clearAuthToken}
        />
    );
}
