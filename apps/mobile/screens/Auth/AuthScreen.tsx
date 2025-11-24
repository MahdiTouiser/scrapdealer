import React from 'react';

import {
    Animated,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { spacing } from '@scrapdealer/tokens';

import { AuthHeader } from '../../components/Auth/AuthHeader';
import { OTPStep } from '../../components/Auth/OTPStep';
import { PhoneStep } from '../../components/Auth/PhoneStep';
import { useThemeContext } from '../../theme/ThemeProvider';
import { AuthScreenProps } from './Auth.types';

export const AuthScreen: React.FC<AuthScreenProps> = (props) => {
    const insets = useSafeAreaInsets();
    const { mode, theme } = useThemeContext();

    const [currentStep, setCurrentStep] = React.useState<'phone' | 'otp'>('phone');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [otpCode, setOTPCode] = React.useState('');
    const [phoneFocused, setPhoneFocused] = React.useState(false);

    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const slideAnim = React.useRef(new Animated.Value(40)).current;
    const stepTransition = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
            Animated.timing(slideAnim, { toValue: 0, duration: 800, delay: 100, useNativeDriver: true }),
        ]).start();
    }, []);

    React.useEffect(() => {
        Animated.timing(stepTransition, {
            toValue: currentStep === 'otp' ? 1 : 0,
            duration: 450,
            useNativeDriver: true,
        }).start();
    }, [currentStep]);

    const handleSendOTP = async () => {
        const clean = phoneNumber.replace(/\D/g, '');
        await props.onSendOTP(clean);
        setCurrentStep('otp');
    };

    const handleVerifyOTP = async () => {
        const clean = phoneNumber.replace(/\D/g, '');
        await props.onVerifyOTP(clean, otpCode);
    };

    const handleResendOTP = async () => {
        if (!props.onResendOTP) return;
        const clean = phoneNumber.replace(/\D/g, '');
        await props.onResendOTP(clean);
    };

    const handleBack = () => {
        setCurrentStep('phone');
        setOTPCode('');
    };

    return (
        <>
            <StatusBar
                barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
                backgroundColor={theme.colors.background}
            />

            <View style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={insets.top + 20}
                >
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        bounces={false}
                    >
                        <Animated.View
                            style={[
                                styles.contentWrapper,
                                {
                                    opacity: fadeAnim,
                                    transform: [{ translateY: slideAnim }],
                                },
                            ]}
                        >
                            <AuthHeader
                                step={currentStep}
                                phoneNumber={phoneNumber}
                                stepTransition={stepTransition}
                            />

                            <View style={styles.formContainer}>
                                {currentStep === 'phone' ? (
                                    <PhoneStep
                                        phoneNumber={phoneNumber}
                                        onChangePhone={setPhoneNumber}
                                        onSendOTP={handleSendOTP}
                                        loading={props.loading}
                                        error={props.error}
                                        phoneFocused={phoneFocused}
                                        setPhoneFocused={setPhoneFocused}
                                        stepTransition={stepTransition}
                                    />
                                ) : (
                                    <OTPStep
                                        otpCode={otpCode}
                                        setOTPCode={setOTPCode}
                                        onVerifyOTP={handleVerifyOTP}
                                        onResendOTP={handleResendOTP}
                                        loading={props.loading}
                                        error={props.error}
                                        stepTransition={stepTransition}
                                        handleBackToPhone={handleBack}
                                    />
                                )}
                            </View>
                        </Animated.View>

                        <View style={{ height: insets.bottom }} />
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.xl,
        paddingBottom: spacing['3xl'],
    },
    contentWrapper: {
        width: '100%',
        maxWidth: 420,
        alignSelf: 'center',
        paddingHorizontal: spacing.lg,
    },
    formContainer: {
        marginTop: spacing['3xl'],
    },
});