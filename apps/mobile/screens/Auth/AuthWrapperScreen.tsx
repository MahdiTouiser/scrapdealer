import React, {
  useEffect,
  useState,
} from 'react';

import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { OnboardingScreen } from '../../components/Auth/OnBoardingScreen';
import { AuthScreen } from './AuthScreen';

export const AuthWrapperScreen: React.FC = () => {
    const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);

    useEffect(() => {
        const checkOnboarding = async () => {
            try {
                const value = await AsyncStorage.getItem('hasSeenOnboarding');
                setHasSeenOnboarding(value === 'true');
            } catch (error) {
                setHasSeenOnboarding(false);
            }
        };
        checkOnboarding();
    }, []);

    const handleOnboardingComplete = async () => {
        try {
            await AsyncStorage.setItem('hasSeenOnboarding', 'true');
        } catch (error) {
            console.warn('Failed to save onboarding state');
        }
        setHasSeenOnboarding(true);
    };

    if (hasSeenOnboarding === null) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3b82f6" />
            </View>
        );
    }

    return hasSeenOnboarding ? (
        <AuthScreen />
    ) : (
        <OnboardingScreen onComplete={handleOnboardingComplete} />
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
});