import React from 'react';

import { LinearGradient } from 'expo-linear-gradient';
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
    const [otpFocused, setOTPFocused] = React.useState(false);

    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const slideAnim = React.useRef(new Animated.Value(50)).current;
    const stepTransition = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
            Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
        ]).start();
    }, []);

    React.useEffect(() => {
        Animated.timing(stepTransition, {
            toValue: currentStep === 'phone' ? 0 : 1,
            duration: 400,
            useNativeDriver: true,
        }).start();
    }, [currentStep]);

    const handleSendOTP = async () => {
        try {
            const cleanPhone = phoneNumber.replace(/\D/g, '');
            await props.onSendOTP(cleanPhone);
            setCurrentStep('otp');
        } catch { }
    };

    const handleVerifyOTP = async () => {
        try {
            const cleanPhone = phoneNumber.replace(/\D/g, '');
            await props.onVerifyOTP(cleanPhone, otpCode);
        } catch { }
    };

    const handleResendOTP = async () => {
        if (!props.onResendOTP) return;
        const cleanPhone = phoneNumber.replace(/\D/g, '');
        await props.onResendOTP(cleanPhone);
    };

    const handleBackToPhone = () => {
        setCurrentStep('phone');
        setOTPCode('');
    };


    const primaryColor = theme.myColors.textPrimary;
    const primaryLight = theme.colors.primary;

    return (
        <>
            <StatusBar barStyle={mode === 'light' ? 'dark-content' : 'light-content'} backgroundColor={primaryColor} />
            <LinearGradient colors={[primaryColor, primaryLight]} style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1, paddingTop: insets.top }}
                >
                    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} showsVerticalScrollIndicator={false}>
                        <AuthHeader step={currentStep} phoneNumber={phoneNumber} stepTransition={stepTransition} />
                        {currentStep === 'phone' ? (
                            <PhoneStep
                                phoneNumber={phoneNumber}
                                onChangePhone={setPhoneNumber}
                                onSendOTP={handleSendOTP}
                                loading={props.loading}
                                error={props.error}
                                phoneFocused={phoneFocused}
                                setPhoneFocused={setPhoneFocused}
                                fadeAnim={fadeAnim}
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
                                otpFocused={otpFocused}
                                setOTPFocused={setOTPFocused}
                                stepTransition={stepTransition}
                                handleBackToPhone={handleBackToPhone}
                            />
                        )}
                    </ScrollView>
                </KeyboardAvoidingView>
            </LinearGradient>
        </>
    );
};
