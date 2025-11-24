import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../contexts/AuthContext';
import { AuthScreen } from '../screens/Auth/AuthScreen';
import { HomeScreen } from '../screens/Home/HomeScreen';

const Stack = createNativeStackNavigator()

function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Auth" component={AuthScreen} />
        </Stack.Navigator>
    )
}

function AppStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    )
}

export const RootNavigator: React.FC = () => {
    const { authenticated } = useAuth()

    if (authenticated === null) return null

    return authenticated ? <AppStack /> : <AuthStack />
}
