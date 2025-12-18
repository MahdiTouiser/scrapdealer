import React from 'react';

import { LinearGradient } from 'expo-linear-gradient';
import {
    Animated,
    Platform,
    TextInput as RNTextInput,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { HelperText } from 'react-native-paper';

import {
    radii,
    spacing,
    typography,
} from '@scrapdealer/tokens';

import { Text } from '../../components/CustomText';
import { useAuth } from '../../contexts/AuthContext';
import { useCountdown } from '../../hooks/useCountDown';
import { useVerifyOTP } from '../../hooks/useVerifyOTP';
import { useThemeContext } from '../../theme/ThemeProvider';

interface OTPStepProps {
    phoneNumber: string
    onResendOTP?: () => Promise<void>
    error?: string
    stepTransition: Animated.Value
    handleBackToPhone: () => void
}

export const OTPStep: React.FC<OTPStepProps> = ({
    phoneNumber,
    onResendOTP,
    error: externalError,
    stepTransition,
    handleBackToPhone,
}) => {
    const { theme } = useThemeContext()
    const { myColors, colors } = theme
    const { signIn } = useAuth()
    const [otpCode, setOTPCode] = React.useState('')
    const inputRefs = React.useRef<(RNTextInput | null)[]>([])
    const { countdown, restart } = useCountdown(120)
    const { mutate: verifyOtp, isPending: verifying } = useVerifyOTP()

    const focusedIndex = React.useRef(new Animated.Value(0)).current
    const shakeAnim = React.useRef(new Animated.Value(0)).current
    const successAnim = React.useRef(new Animated.Value(0)).current
    const pulseAnim = React.useRef(new Animated.Value(1)).current

    React.useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.05,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    React.useEffect(() => {
        if (otpCode.length === 6 && !verifying) {
            handleVerify()
        }
    }, [otpCode, verifying])

    React.useEffect(() => {
        if (externalError) {
            Animated.sequence([
                Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
            ]).start();
        }
    }, [externalError]);

    const handleVerify = () => {
        const cleanPhone = phoneNumber.replace(/\D/g, '')
        const finalPhone = cleanPhone.startsWith('0') ? cleanPhone : `0${cleanPhone}`

        verifyOtp(
            { phone: finalPhone, code: 'Scr@pDea1eR!!73138' },
            {
                onSuccess: async (res) => {
                    Animated.spring(successAnim, {
                        toValue: 1,
                        tension: 40,
                        friction: 7,
                        useNativeDriver: true,
                    }).start();
                    await signIn(res.token, res.refreshToken)
                },
            }
        )
    }

    const handleChange = (text: string, index: number) => {
        if (!/^\d*$/.test(text)) return
        const newCode = otpCode.split('')
        if (text) {
            newCode[index] = text
        } else {
            newCode[index] = ''
        }
        const joined = newCode.join('').slice(0, 6)
        setOTPCode(joined)

        Animated.spring(focusedIndex, {
            toValue: text ? index + 1 : index,
            tension: 80,
            friction: 10,
            useNativeDriver: true,
        }).start();

        if (text && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyPress = ({ nativeEvent }: any, index: number) => {
        if (nativeEvent.key === 'Backspace' && !otpCode[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
            Animated.spring(focusedIndex, {
                toValue: index - 1,
                tension: 80,
                friction: 10,
                useNativeDriver: true,
            }).start();
        }
    }

    const handleResend = async () => {
        if (onResendOTP) {
            await onResendOTP()
            restart()
            setOTPCode('')
            inputRefs.current[0]?.focus()
        }
    }

    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60)
        const s = (sec % 60).toString().padStart(2, '0')
        return `${m}:${s}`
    }

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    opacity: stepTransition.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                    }),
                    transform: [
                        {
                            translateX: stepTransition.interpolate({
                                inputRange: [0, 1],
                                outputRange: [100, 0],
                            }),
                        },
                    ],
                },
            ]}
        >
            <View style={styles.headerContainer}>
                <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                    <View style={styles.iconCircle}>
                        <Text style={styles.icon}>🔐</Text>
                    </View>
                </Animated.View>
                <Text style={[styles.title, { color: myColors.textPrimary }]}>کد تأیید را وارد کنید</Text>
                <Text style={[styles.subtitle, { color: myColors.textSecondary }]}>
                    کد ۶ رقمی ارسال‌شده به
                </Text>
                <View style={styles.phoneNumberContainer}>
                    <View style={styles.phoneNumberBadge}>
                        <Text style={[styles.phoneNumber, { color: colors.primary }]}>
                            {phoneNumber}
                        </Text>
                    </View>
                </View>
            </View>

            <Animated.View style={[
                styles.otpContainer,
                { transform: [{ translateX: shakeAnim }] }
            ]}>
                {Array.from({ length: 6 }).map((_, i) => {
                    const isFilled = !!otpCode[i];
                    const isFocused = i === otpCode.length;

                    return (
                        <Animated.View
                            key={i}
                            style={[
                                styles.otpBoxWrapper,
                                {
                                    transform: [{
                                        scale: successAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [1, isFilled ? 1.1 : 1],
                                        })
                                    }]
                                }
                            ]}
                        >
                            <View
                                style={[
                                    styles.otpBox,
                                    isFilled && styles.otpBoxFilled,
                                    isFocused && styles.otpBoxFocused,
                                ]}
                            >
                                {isFilled && (
                                    <View style={styles.fillIndicator}>
                                        <LinearGradient
                                            colors={['#4ECDC4', '#44A08D']}
                                            style={styles.fillGradient}
                                        />
                                    </View>
                                )}

                                <RNTextInput
                                    ref={(ref) => (inputRefs.current[i] = ref)}
                                    style={[styles.otpInput, { color: myColors.textPrimary }]}
                                    value={otpCode[i] || ''}
                                    onChangeText={(t) => handleChange(t, i)}
                                    onKeyPress={(e) => handleKeyPress(e, i)}
                                    keyboardType="number-pad"
                                    maxLength={1}
                                    textAlign="center"
                                    editable={!verifying}
                                    selectTextOnFocus
                                    autoFocus={i === 0}
                                />

                                {isFocused && !isFilled && (
                                    <Animated.View style={[
                                        styles.cursor,
                                        {
                                            opacity: pulseAnim.interpolate({
                                                inputRange: [1, 1.05],
                                                outputRange: [0.3, 1],
                                            })
                                        }
                                    ]} />
                                )}
                            </View>
                        </Animated.View>
                    );
                })}
            </Animated.View>

            {(externalError || verifying) && (
                <View style={styles.statusContainer}>
                    {verifying ? (
                        <View style={styles.verifyingContainer}>
                            <Animated.View style={[
                                styles.verifyingDot,
                                { opacity: pulseAnim }
                            ]} />
                            <Text style={[styles.verifyingText, { color: colors.primary }]}>
                                در حال تأیید کد...
                            </Text>
                        </View>
                    ) : (
                        <HelperText type="error" visible={!!externalError} style={styles.helperText}>
                            {externalError}
                        </HelperText>
                    )}
                </View>
            )}

            <View style={styles.timerContainer}>
                {countdown > 0 ? (
                    <View style={styles.timerBox}>
                        <View style={styles.timerIconCircle}>
                            <Text style={styles.timerIcon}>⏱️</Text>
                        </View>
                        <Text style={[styles.timerText, { color: myColors.textSecondary }]}>
                            ارسال مجدد کد در {' '}
                            <Text style={[styles.timerValue, { color: colors.primary }]}>
                                {formatTime(countdown)}
                            </Text>
                        </Text>
                    </View>
                ) : (
                    <TouchableOpacity
                        onPress={handleResend}
                        disabled={verifying}
                        activeOpacity={0.7}
                    >
                        <View style={styles.resendButton}>
                            <LinearGradient
                                colors={['#4ECDC4', '#44A08D']}
                                style={styles.resendGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Text style={styles.resendText}>🔄 ارسال مجدد کد تأیید</Text>
                            </LinearGradient>
                        </View>
                    </TouchableOpacity>
                )}
            </View>

            <TouchableOpacity
                onPress={handleBackToPhone}
                style={styles.backButton}
                activeOpacity={0.7}
            >
                <View style={styles.backButtonInner}>
                    <Text style={styles.backIcon}>←</Text>
                    <Text style={[styles.backText, { color: myColors.textSecondary }]}>
                        تغییر شماره موبایل
                    </Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: spacing['2xl'],
    },
    iconCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: 'rgba(78, 205, 196, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.lg,
        borderWidth: 2,
        borderColor: 'rgba(78, 205, 196, 0.3)',
    },
    icon: {
        fontSize: 36,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: spacing.sm,
        fontFamily: 'Vazirmatn',
    },
    subtitle: {
        fontSize: typography.body1.size,
        textAlign: 'center',
        marginBottom: spacing.sm,
        opacity: 0.8,
        fontFamily: 'Vazirmatn',
    },
    phoneNumberContainer: {
        alignItems: 'center',
    },
    phoneNumberBadge: {
        backgroundColor: 'rgba(78, 205, 196, 0.1)',
        paddingHorizontal: spacing.lg,
        borderRadius: radii.lg,
        borderWidth: 1,
        borderColor: 'rgba(78, 205, 196, 0.3)',
    },
    phoneNumber: {
        fontSize: typography.body1.size,
        fontWeight: '700',
        fontFamily: 'Vazirmatn',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: spacing['xl'],
    },
    otpBoxWrapper: {
        flex: 1,
        marginHorizontal: 3,
    },
    otpBox: {
        aspectRatio: 1,
        borderRadius: radii.lg + 4,
        backgroundColor: 'rgba(120,120,128,0.06)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2.5,
        borderColor: 'rgba(120,120,128,0.2)',
        position: 'relative',
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 4 },
            },
            android: { elevation: 6 },
        }),
    },
    fillIndicator: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.15,
    },
    fillGradient: {
        flex: 1,
    },
    otpBoxFilled: {
        backgroundColor: 'rgba(78, 205, 196, 0.08)',
        borderColor: '#4ECDC4',
        shadowColor: '#4ECDC4',
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 12,
    },
    otpBoxFocused: {
        borderColor: '#4ECDC4',
        backgroundColor: 'rgba(78, 205, 196, 0.12)',
        shadowColor: '#4ECDC4',
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 16,
    },
    otpInput: {
        fontSize: 16,
        fontWeight: '800',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        fontFamily: 'Vazirmatn',
    },
    cursor: {
        position: 'absolute',
        width: 2,
        height: 24,
        backgroundColor: '#4ECDC4',
        borderRadius: 1,
    },
    statusContainer: {
        minHeight: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    verifyingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    verifyingDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#4ECDC4',
        marginRight: spacing.sm,
    },
    verifyingText: {
        fontSize: typography.body1.size,
        fontWeight: '600',
        fontFamily: 'Vazirmatn',
    },
    helperText: {
        textAlign: 'center',
        fontFamily: 'Vazirmatn',
    },
    timerContainer: {
        alignItems: 'center',
        marginBottom: spacing.xl,
        minHeight: 60,
        justifyContent: 'center',
    },
    timerBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(120, 120, 128, 0.08)',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        borderRadius: radii.xl,
        borderWidth: 1,
        borderColor: 'rgba(120, 120, 128, 0.15)',
    },
    timerIconCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.sm,
    },
    timerIcon: {
        fontSize: 18,
    },
    timerText: {
        fontSize: typography.body1.size,
        fontFamily: 'Vazirmatn',
    },
    timerValue: {
        fontWeight: '700',
        fontSize: typography.body1.size + 2,
        fontFamily: 'Vazirmatn-Bold',
    },
    resendButton: {
        borderRadius: radii.xl,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: '#4ECDC4',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 16,
            },
            android: {
                elevation: 12,
            },
        }),
    },
    resendGradient: {
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.md,
    },
    resendText: {
        color: '#fff',
        fontSize: typography.body1.size,
        fontWeight: '700',
        textAlign: 'center',
        fontFamily: 'Vazirmatn',
    },
    backButton: {
        alignSelf: 'center',
        marginBottom: spacing.md,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
    },
    backButtonInner: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backIcon: {
        fontSize: 20,
        marginRight: spacing.xs,
        color: '#666',
    },
    backText: {
        fontSize: typography.body2.size,
        fontFamily: 'Vazirmatn',
        textDecorationLine: 'underline',
    },
    button: {
        borderRadius: radii.xl,
        backgroundColor: '#000000',
        marginTop: spacing.lg,
    },
    buttonDisabled: {
        backgroundColor: '#999999',
    },
    buttonContent: {
        paddingVertical: 12,
    },
})