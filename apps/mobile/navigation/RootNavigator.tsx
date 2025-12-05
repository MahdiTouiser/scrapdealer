// navigation/RootNavigator.tsx
import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../contexts/AuthContext';
import { AuthWrapperScreen } from '../screens/Auth/AuthWrapperScreen';
import { HomeScreen } from '../screens/Home/HomeScreen';

const Stack = createNativeStackNavigator();

function AppStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
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

    if (authenticated === null) return null;

    return authenticated ? <AppStack /> : <AuthStack />;
};