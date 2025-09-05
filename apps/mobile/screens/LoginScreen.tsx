import * as React from 'react';

import { LinearGradient } from 'expo-linear-gradient';
import {
    Animated,
    Dimensions,
    I18nManager,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    Button,
    HelperText,
    IconButton,
    Text,
} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
    colors,
    radii,
    shadows,
    spacing,
    typography,
} from '@scrapdealer/tokens';

// Force RTL
I18nManager.forceRTL(true);

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type AuthStep = 'phone' | 'otp';

interface AuthScreenProps {
    onSendOTP: (phoneNumber: string) => Promise<void>;
    onVerifyOTP: (phoneNumber: string, otpCode: string) => Promise<void>;
    onResendOTP?: (phoneNumber: string) => Promise<void>;
    loading?: boolean;
    error?: string;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
    onSendOTP,
    onVerifyOTP,
    onResendOTP,
    loading = false,
    error,
}) => {
    const insets = useSafeAreaInsets();

    const [currentStep, setCurrentStep] = React.useState<AuthStep>('phone');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [otpCode, setOTPCode] = React.useState('');
    const [phoneFocused, setPhoneFocused] = React.useState(false);
    const [otpFocused, setOTPFocused] = React.useState(false);
    const [countdown, setCountdown] = React.useState(0);

    // Animation values
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const slideAnim = React.useRef(new Animated.Value(50)).current;
    const stepTransition = React.useRef(new Animated.Value(0)).current;
    const phoneLabelAnim = React.useRef(new Animated.Value(phoneNumber ? 1 : 0)).current;
    const otpLabelAnim = React.useRef(new Animated.Value(otpCode ? 1 : 0)).current;

    // Refs for inputs
    const phoneInputRef = React.useRef<TextInput>(null);
    const otpInputRefs = React.useRef<(TextInput | null)[]>([]);

    // Entrance animation
    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    // Step transition animation
    React.useEffect(() => {
        Animated.timing(stepTransition, {
            toValue: currentStep === 'phone' ? 0 : 1,
            duration: 400,
            useNativeDriver: true,
        }).start();
    }, [currentStep]);

    // Phone label animation
    React.useEffect(() => {
        Animated.timing(phoneLabelAnim, {
            toValue: phoneFocused || phoneNumber ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [phoneFocused, phoneNumber]);

    // OTP label animation
    React.useEffect(() => {
        Animated.timing(otpLabelAnim, {
            toValue: otpFocused || otpCode ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [otpFocused, otpCode]);

    // Countdown timer for resend OTP
    React.useEffect(() => {
        let interval: NodeJS.Timeout;
        if (countdown > 0) {
            interval = setInterval(() => {
                setCountdown(countdown - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [countdown]);

    // Auto-focus next OTP input
    const handleOTPChange = (value: string, index: number) => {
        const newOTP = otpCode.split('');
        newOTP[index] = value;
        const updatedOTP = newOTP.join('');
        setOTPCode(updatedOTP);

        // Auto focus next input or verify if complete
        if (value && index < 5) {
            otpInputRefs.current[index + 1]?.focus();
        } else if (updatedOTP.length === 6) {
            handleVerifyOTP(updatedOTP);
        }
    };

    // Handle backspace in OTP inputs
    const handleOTPKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !otpCode[index] && index > 0) {
            otpInputRefs.current[index - 1]?.focus();
        }
    };

    const formatPhoneNumber = (text: string) => {
        // Remove all non-digits
        const cleaned = text.replace(/\D/g, '');

        // Format as Iranian phone number: +98 XXX XXX XXXX
        if (cleaned.startsWith('98')) {
            const withoutCountry = cleaned.substring(2);
            if (withoutCountry.length <= 3) return `+98 ${withoutCountry}`;
            if (withoutCountry.length <= 6) return `+98 ${withoutCountry.substring(0, 3)} ${withoutCountry.substring(3)}`;
            return `+98 ${withoutCountry.substring(0, 3)} ${withoutCountry.substring(3, 6)} ${withoutCountry.substring(6, 10)}`;
        } else if (cleaned.startsWith('0')) {
            // Convert 09XX to +98 9XX
            const withoutZero = cleaned.substring(1);
            if (withoutZero.length <= 3) return `+98 ${withoutZero}`;
            if (withoutZero.length <= 6) return `+98 ${withoutZero.substring(0, 3)} ${withoutZero.substring(3)}`;
            return `+98 ${withoutZero.substring(0, 3)} ${withoutZero.substring(3, 6)} ${withoutZero.substring(6, 10)}`;
        } else {
            // Assume it's without country code
            if (cleaned.length <= 3) return `+98 ${cleaned}`;
            if (cleaned.length <= 6) return `+98 ${cleaned.substring(0, 3)} ${cleaned.substring(3)}`;
            return `+98 ${cleaned.substring(0, 3)} ${cleaned.substring(3, 6)} ${cleaned.substring(6, 10)}`;
        }
    };

    const handlePhoneChange = (text: string) => {
        const formatted = formatPhoneNumber(text);
        setPhoneNumber(formatted);
    };

    const handleSendOTP = async () => {
        try {
            const cleanPhone = phoneNumber.replace(/\D/g, '');
            await onSendOTP(cleanPhone);
            setCurrentStep('otp');
            setCountdown(120); // 2 minutes countdown
            setOTPCode('');
        } catch (error) {
            console.error('Failed to send OTP:', error);
        }
    };

    const handleVerifyOTP = async (code?: string) => {
        try {
            const cleanPhone = phoneNumber.replace(/\D/g, '');
            await onVerifyOTP(cleanPhone, code || otpCode);
        } catch (error) {
            console.error('Failed to verify OTP:', error);
        }
    };

    const handleResendOTP = async () => {
        if (countdown > 0 || !onResendOTP) return;

        try {
            const cleanPhone = phoneNumber.replace(/\D/g, '');
            await onResendOTP(cleanPhone);
            setCountdown(120);
            setOTPCode('');
        } catch (error) {
            console.error('Failed to resend OTP:', error);
        }
    };

    const handleBackToPhone = () => {
        setCurrentStep('phone');
        setOTPCode('');
        setCountdown(0);
    };

    const isPhoneValid = phoneNumber.replace(/\D/g, '').length >= 10;
    const isOTPValid = otpCode.length === 6;

    const gradientColors = [
        colors.primary.main,
        colors.primary.light,
        colors.secondary.main,
    ] as const;

    const formatCountdown = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={colors.primary.main} />
            <LinearGradient colors={gradientColors} style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={[styles.keyboardContainer, { paddingTop: insets.top }]}
                >
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <Animated.View
                            style={[
                                styles.content,
                                {
                                    opacity: fadeAnim,
                                    transform: [{ translateY: slideAnim }],
                                },
                            ]}
                        >
                            {/* Header */}
                            <View style={styles.header}>
                                <Animated.View style={{
                                    opacity: stepTransition.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [1, 0],
                                    })
                                }}>
                                    {currentStep === 'phone' && (
                                        <>
                                            <Text style={styles.welcomeText}>ورود به حساب</Text>
                                            <Text style={styles.subtitleText}>
                                                شماره موبایل خود را وارد کنید
                                            </Text>
                                        </>
                                    )}
                                </Animated.View>

                                <Animated.View style={{
                                    opacity: stepTransition.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 1],
                                    })
                                }}>
                                    {currentStep === 'otp' && (
                                        <>
                                            <Text style={styles.welcomeText}>تایید شماره موبایل</Text>
                                            <Text style={styles.subtitleText}>
                                                کد تایید ارسال شده به
                                            </Text>
                                            <Text style={styles.phoneDisplay}>{phoneNumber}</Text>
                                            <Text style={styles.subtitleText}>
                                                را وارد کنید
                                            </Text>
                                        </>
                                    )}
                                </Animated.View>
                            </View>

                            {/* Form */}
                            <View style={styles.form}>
                                {/* Phone Input Step */}
                                {currentStep === 'phone' && (
                                    <Animated.View
                                        style={[
                                            styles.stepContainer,
                                            {
                                                opacity: stepTransition.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [1, 0],
                                                }),
                                                transform: [{
                                                    translateX: stepTransition.interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: [0, -50],
                                                    })
                                                }]
                                            }
                                        ]}
                                    >
                                        <View style={styles.inputContainer}>
                                            <Animated.Text
                                                style={[
                                                    styles.inputLabel,
                                                    {
                                                        transform: [
                                                            {
                                                                translateY: phoneLabelAnim.interpolate({
                                                                    inputRange: [0, 1],
                                                                    outputRange: [0, -28],
                                                                }),
                                                            },
                                                        ],
                                                        fontSize: phoneLabelAnim.interpolate({
                                                            inputRange: [0, 1],
                                                            outputRange: [16, 12],
                                                        }),
                                                        color: phoneFocused
                                                            ? colors.white
                                                            : 'rgba(255, 255, 255, 0.7)',
                                                    },
                                                ]}
                                            >
                                                شماره موبایل
                                            </Animated.Text>
                                            <View style={styles.inputWrapper}>
                                                <TextInput
                                                    ref={phoneInputRef}
                                                    style={[
                                                        styles.textInput,
                                                        phoneFocused && styles.textInputFocused,
                                                    ]}
                                                    placeholder=""
                                                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                                    keyboardType="phone-pad"
                                                    textContentType="telephoneNumber"
                                                    value={phoneNumber}
                                                    onChangeText={handlePhoneChange}
                                                    onFocus={() => setPhoneFocused(true)}
                                                    onBlur={() => setPhoneFocused(false)}
                                                    editable={!loading}
                                                    maxLength={17} // +98 XXX XXX XXXX
                                                />
                                            </View>
                                            {error && (
                                                <HelperText type="error" visible={!!error} style={styles.errorText}>
                                                    {error}
                                                </HelperText>
                                            )}
                                        </View>

                                        <Button
                                            mode="contained"
                                            style={[
                                                styles.actionButton,
                                                !isPhoneValid && styles.actionButtonDisabled,
                                            ]}
                                            contentStyle={styles.actionButtonContent}
                                            labelStyle={styles.actionButtonLabel}
                                            onPress={handleSendOTP}
                                            disabled={!isPhoneValid || loading}
                                            loading={loading}
                                        >
                                            {loading ? 'در حال ارسال...' : 'ارسال کد تایید'}
                                        </Button>
                                    </Animated.View>
                                )}

                                {/* OTP Input Step */}
                                {currentStep === 'otp' && (
                                    <Animated.View
                                        style={[
                                            styles.stepContainer,
                                            {
                                                opacity: stepTransition.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [0, 1],
                                                }),
                                                transform: [{
                                                    translateX: stepTransition.interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: [50, 0],
                                                    })
                                                }]
                                            }
                                        ]}
                                    >
                                        {/* Back Button */}
                                        <TouchableOpacity
                                            style={styles.backButton}
                                            onPress={handleBackToPhone}
                                            disabled={loading}
                                        >
                                            <IconButton
                                                icon="arrow-right"
                                                iconColor={colors.white}
                                                size={24}
                                            />
                                            <Text style={styles.backButtonText}>تغییر شماره موبایل</Text>
                                        </TouchableOpacity>

                                        {/* OTP Inputs */}
                                        <View style={styles.otpContainer}>
                                            {Array.from({ length: 6 }, (_, index) => (
                                                <TextInput
                                                    key={index}
                                                    ref={(ref) => (otpInputRefs.current[index] = ref)}
                                                    style={[
                                                        styles.otpInput,
                                                        otpCode[index] && styles.otpInputFilled,
                                                        otpFocused && styles.otpInputFocused,
                                                    ]}
                                                    value={otpCode[index] || ''}
                                                    onChangeText={(value) => handleOTPChange(value, index)}
                                                    onKeyPress={(e) => handleOTPKeyPress(e, index)}
                                                    onFocus={() => setOTPFocused(true)}
                                                    onBlur={() => setOTPFocused(false)}
                                                    keyboardType="number-pad"
                                                    maxLength={1}
                                                    textAlign="center"
                                                    editable={!loading}
                                                />
                                            ))}
                                        </View>

                                        {error && (
                                            <HelperText type="error" visible={!!error} style={styles.errorText}>
                                                {error}
                                            </HelperText>
                                        )}

                                        {/* Resend OTP */}
                                        <View style={styles.resendContainer}>
                                            {countdown > 0 ? (
                                                <Text style={styles.countdownText}>
                                                    ارسال مجدد کد در {formatCountdown(countdown)}
                                                </Text>
                                            ) : (
                                                <TouchableOpacity onPress={handleResendOTP} disabled={loading}>
                                                    <Text style={styles.resendText}>
                                                        ارسال مجدد کد تایید
                                                    </Text>
                                                </TouchableOpacity>
                                            )}
                                        </View>

                                        <Button
                                            mode="contained"
                                            style={[
                                                styles.actionButton,
                                                !isOTPValid && styles.actionButtonDisabled,
                                            ]}
                                            contentStyle={styles.actionButtonContent}
                                            labelStyle={styles.actionButtonLabel}
                                            onPress={() => handleVerifyOTP()}
                                            disabled={!isOTPValid || loading}
                                            loading={loading}
                                        >
                                            {loading ? 'در حال تایید...' : 'تایید و ورود'}
                                        </Button>
                                    </Animated.View>
                                )}
                            </View>
                        </Animated.View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </LinearGradient>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardContainer: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        minHeight: screenHeight - 100,
    },
    content: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.xl,
    },
    header: {
        alignItems: 'center',
        marginBottom: spacing['2xl'],
        minHeight: 120,
    },
    welcomeText: {
        fontSize: typography.h1.size,
        fontWeight: typography.h1.weight as any,
        color: colors.white,
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    subtitleText: {
        fontSize: typography.body1.size,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        lineHeight: typography.body1.lineHeight * typography.body1.size,
    },
    phoneDisplay: {
        fontSize: typography.h3.size,
        fontWeight: typography.h3.weight as any,
        color: colors.white,
        textAlign: 'center',
        marginVertical: spacing.sm,
    },
    form: {
        marginBottom: spacing.xl,
    },
    stepContainer: {
        minHeight: 300,
    },
    inputContainer: {
        marginBottom: spacing.lg,
        position: 'relative',
    },
    inputLabel: {
        position: 'absolute',
        right: spacing.md,
        top: spacing.md,
        zIndex: 1,
        fontWeight: typography.fontWeight.medium as any,
    },
    inputWrapper: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
        height: 56,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: radii.lg,
        paddingHorizontal: spacing.md,
        paddingTop: spacing.sm,
        fontSize: typography.body1.size,
        color: colors.white,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        textAlign: 'right',
        writingDirection: 'rtl',
    },
    textInputFocused: {
        borderColor: 'rgba(255, 255, 255, 0.6)',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        ...shadows.md,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginBottom: spacing.xl,
    },
    backButtonText: {
        color: colors.white,
        fontSize: typography.body1.size,
        marginLeft: spacing.xs,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.xl,
        paddingHorizontal: spacing.sm,
    },
    otpInput: {
        width: 45,
        height: 56,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: radii.md,
        fontSize: typography.h2.size,
        fontWeight: typography.h2.weight as any,
        color: colors.white,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    otpInputFilled: {
        borderColor: 'rgba(255, 255, 255, 0.6)',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
    otpInputFocused: {
        ...shadows.md,
    },
    resendContainer: {
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    countdownText: {
        fontSize: typography.body2.size,
        color: 'rgba(255, 255, 255, 0.7)',
        textAlign: 'center',
    },
    resendText: {
        fontSize: typography.body1.size,
        color: colors.white,
        textDecorationLine: 'underline',
        fontWeight: typography.fontWeight.medium as any,
    },
    actionButton: {
        borderRadius: radii.lg,
        backgroundColor: colors.white,
        ...shadows.lg,
    },
    actionButtonDisabled: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    actionButtonContent: {
        paddingVertical: spacing.xs,
    },
    actionButtonLabel: {
        fontSize: typography.button.size,
        fontWeight: typography.button.weight as any,
        color: colors.primary.main,
    },
    errorText: {
        color: colors.semantic.error[50],
        textAlign: 'right',
        marginTop: spacing.xs,
    },
});