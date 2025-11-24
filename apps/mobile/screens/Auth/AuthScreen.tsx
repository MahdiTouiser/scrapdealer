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

export const AuthScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const { mode, theme } = useThemeContext();
    const { myColors } = theme;

    const [currentStep, setCurrentStep] = React.useState<'phone' | 'otp'>('phone');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [otpCode, setOTPCode] = React.useState('');
    const [phoneFocused, setPhoneFocused] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

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
        setLoading(true);
        try {
            await apiSendOTP(clean);
            setCurrentStep('otp');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        const clean = phoneNumber.replace(/\D/g, '');
        setLoading(true);
        try {
            const result = await apiVerifyOTP(clean, otpCode);
            handleLoginSuccess(result.token, result.role);
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        const clean = phoneNumber.replace(/\D/g, '');
        await apiResendOTP(clean);
    };

    const handleLoginSuccess = (token: string, role: string) => {
        console.log('login success', token, role);
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
                                        loading={loading}
                                        phoneFocused={phoneFocused}
                                        setPhoneFocused={setPhoneFocused}
                                        stepTransition={stepTransition}
                                    />
                                ) : (
                                    <OTPStep
                                        phoneNumber={phoneNumber}
                                        onVerifySuccess={handleLoginSuccess}
                                        onResendOTP={handleResendOTP}
                                        stepTransition={stepTransition}
                                        handleBackToPhone={() => setCurrentStep('phone')}
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

const apiSendOTP = async (phone: string) => {
    return new Promise(resolve => setTimeout(resolve, 600));
};

const apiVerifyOTP = async (phone: string, otp: string) => {
    return {
        token: 'token123',
        role: 'User',
    };
};

const apiResendOTP = async (phone: string) => {
    return new Promise(resolve => setTimeout(resolve, 600));
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#ffffff' },
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
    brandContainer: { alignItems: 'center', marginTop: spacing.xl },
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
    logo: { width: '100%', height: '100%' },
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
    formContainer: { marginTop: spacing['3xl'] },
});
