// screens/Auth/Auth/AuthScreen.tsx
import React from 'react';

import {
    Animated,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
    spacing,
    typography,
} from '@scrapdealer/tokens';

import { AuthHeader } from '../../components/Auth/AuthHeader';
import { OTPStep } from '../../components/Auth/OTPStep';
import { PhoneStep } from '../../components/Auth/PhoneStep';
import { Text } from '../../components/CustomText';
import { useThemeContext } from '../../theme/ThemeProvider';
import { AuthScreenProps } from './Auth.types';

export const AuthScreen: React.FC<AuthScreenProps> = (props) => {
    const insets = useSafeAreaInsets();
    const { mode, theme } = useThemeContext();
    const { myColors } = theme;

    const [currentStep, setCurrentStep] = React.useState<'phone' | 'otp'>('phone');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [otpCode, setOTPCode] = React.useState('');
    const [phoneFocused, setPhoneFocused] = React.useState(false);

    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const slideAnim = React.useRef(new Animated.Value(40)).current;
    const stepTransition = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
            Animated.timing(slideAnim, { toValue: 0, duration: 900, delay: 100, useNativeDriver: true }),
        ]).start();
    }, []);

    React.useEffect(() => {
        Animated.timing(stepTransition, {
            toValue: currentStep === 'otp' ? 1 : 0,
            duration: 500,
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
                    keyboardVerticalOffset={insets.top + 30}
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
                            {/* Logo + Title */}
                            <View style={styles.brandContainer}>
                                <View style={styles.logoWrapper}>
                                    <Image
                                        source={require('../../public/icons/logo.png')}
                                        style={styles.logo}
                                        resizeMode="contain"
                                    />
                                </View>

                                <Text style={[styles.appTitle, { color: myColors.textPrimary }]}>
                                    ضایعات چی
                                </Text>
                                <Text style={[styles.appSubtitle, { color: myColors.textSecondary }]}>
                                    خرید و فروش هوشمند ضایعات
                                </Text>
                            </View>

                            {/* Header */}
                            <AuthHeader
                                step={currentStep}
                                phoneNumber={phoneNumber}
                                stepTransition={stepTransition}
                            />

                            {/* Form */}
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
    },
    contentWrapper: {
        width: '100%',
        maxWidth: 440,
        alignSelf: 'center',
        paddingHorizontal: spacing.lg,
    },
    brandContainer: {
        alignItems: 'center',
        marginTop: spacing.xl,
    },
    logoWrapper: {
        width: 140,
        height: 140,
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 36,
        padding: 24,
        marginBottom: spacing.xl,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.18,
        shadowRadius: 32,
        elevation: 24,
    },
    logo: {
        width: '100%',
        height: '100%',
    },
    appTitle: {
        fontSize: 38,
        fontWeight: '800',
        letterSpacing: -0.8,
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    appSubtitle: {
        fontSize: typography.body1.size,
        textAlign: 'center',
        fontWeight: '500',
        opacity: 0.85,
    },
    formContainer: {
        marginTop: spacing['3xl'],
    },
});