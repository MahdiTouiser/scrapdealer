import React, { useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../contexts/AuthContext';
import { AuthWrapperScreen } from '../screens/Auth/AuthWrapperScreen';
import {
    RoleSelectionScreen,
} from '../screens/RoleSelection/RoleSelectionScreen';
import { MainTabNavigator } from './MainTabNavigator';

const Stack = createNativeStackNavigator();

function AppStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        </Stack.Navigator>
    );
}

function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AuthFlow" component={AuthWrapperScreen} />
        </Stack.Navigator>
    );
}

export const RootNavigator: React.FC = () => {
    const { authenticated } = useAuth();
    const [roleSelected, setRoleSelected] = useState<boolean | null>(null);

    if (authenticated === null) return null;

    if (!authenticated) return <AuthStack />;

    if (roleSelected === null) {
        return (
            <RoleSelectionScreen
                onSelect={(role) => {
                    setRoleSelected(true);
                    AsyncStorage.setItem('user_role', role);
                }}
            />
        );
    }


    return <AppStack />;
};
