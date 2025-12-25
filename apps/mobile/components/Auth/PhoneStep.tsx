import React from 'react';

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
    colors,
    radii,
    spacing,
    typography,
} from '@scrapdealer/tokens';

import { Text } from '../../components/CustomText';
import { useApi } from '../../hooks/useApi';
import { useThemeContext } from '../../theme/ThemeProvider';

interface PhoneStepProps {
    phoneNumber: string;
    onChangePhone: (text: string) => void;
    onSendOTP: () => void;
    loading?: boolean;
    error?: string;
    phoneFocused: boolean;
    setPhoneFocused: (focused: boolean) => void;
    stepTransition: Animated.Value;
}

export const PhoneStep: React.FC<PhoneStepProps> = ({
    phoneNumber,
    onChangePhone,
    onSendOTP,
    error,
    phoneFocused,
    setPhoneFocused,
    stepTransition,
}) => {
    const { theme } = useThemeContext();
    const { myColors } = theme;

    const focusAnim = React.useRef(new Animated.Value(0)).current;
    const shakeAnim = React.useRef(new Animated.Value(0)).current;
    const pulseAnim = React.useRef(new Animated.Value(1)).current;
    const glowAnim = React.useRef(new Animated.Value(0)).current;

    const { mutate: sendOtp, isPending: sendingOtp } = useApi<
        { success: boolean; message?: string },
        { phone: string }
    >({
        key: ['send-otp'],
        url: '/Authentication/OtpRequest',
        method: 'POST',
        onSuccess: 'کد تأیید با موفقیت ارسال شد',
        onError: 'ارسال کد ناموفق بود',
    });

    const cleanPhone = phoneNumber.replace(/\D/g, '');
    const isValid = cleanPhone.length >= 10;

    React.useEffect(() => {
        Animated.timing(focusAnim, {
            toValue: phoneFocused ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();

        if (phoneFocused) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(glowAnim, {
                        toValue: 1,
                        duration: 1500,
                        useNativeDriver: false,
                    }),
                    Animated.timing(glowAnim, {
                        toValue: 0,
                        duration: 1500,
                        useNativeDriver: false,
                    }),
                ])
            ).start();
        } else {
            glowAnim.setValue(0);
        }
    }, [phoneFocused]);

    React.useEffect(() => {
        if (error) {
            Animated.sequence([
                Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
            ]).start();
        }
    }, [error]);

    React.useEffect(() => {
        if (isValid) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1.03,
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
        } else {
            pulseAnim.setValue(1);
        }
    }, [isValid]);

    const handleSend = async () => {
        if (!isValid || sendingOtp) return;

        const irPhone = cleanPhone.startsWith('0') ? cleanPhone.slice(1) : cleanPhone;
        const finalPhone = `0${irPhone}`;

        try {
            await sendOtp({ phone: finalPhone });
            onSendOTP();
        } catch (err: any) {
            console.log('OTP send failed:', err);
        }
    };

    const borderColorInterpolate = focusAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(120, 120, 128, 0.2)', colors.light.primary],
    });

    const backgroundColorInterpolate = focusAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(120, 120, 128, 0.04)', 'rgba(120, 120, 128, 0.08)'],
    });

    const glowOpacityInterpolate = glowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.4],
    });

    return (
        <Animated.View style={[styles.container, animatedStyles(stepTransition)]}>
            <View style={styles.labelContainer}>
                <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                    <View style={styles.iconCircle}>
                        <Text style={styles.icon}>📱</Text>
                    </View>
                </Animated.View>
                <Text style={[styles.label, { color: myColors.textPrimary }]}>
                    شماره موبایل خود را وارد کنید
                </Text>
            </View>

            <Animated.View style={[
                styles.inputWrapper,
                {
                    borderColor: borderColorInterpolate,
                    backgroundColor: backgroundColorInterpolate,
                    transform: [{ translateX: shakeAnim }],
                },
            ]}>
                <Animated.View
                    style={[
                        styles.inputGlow,
                        {
                            opacity: glowOpacityInterpolate,
                            shadowColor: colors.light.primary,
                        }
                    ]}
                />

                <View style={styles.inputContent}>


                    <Text style={[styles.countryCode, { color: myColors.textPrimary }]}>+98</Text>

                    <View style={[styles.divider, { backgroundColor: myColors.textSecondary + '30' }]} />

                    <RNTextInput
                        style={[styles.input, { color: myColors.textPrimary }]}
                        value={phoneNumber}
                        onChangeText={onChangePhone}
                        onFocus={() => setPhoneFocused(true)}
                        onBlur={() => setPhoneFocused(false)}
                        keyboardType="phone-pad"
                        maxLength={17}
                        placeholder="912 345 6789"
                        placeholderTextColor={myColors.textSecondary + '60'}
                        textAlign="left"
                        editable={!sendingOtp}
                        autoFocus
                    />

                    {phoneNumber.length > 0 && !sendingOtp && (
                        <TouchableOpacity
                            onPress={() => onChangePhone('')}
                            style={styles.clearButton}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <View style={[styles.clearIcon, { backgroundColor: myColors.textSecondary + '30' }]}>
                                <Text style={styles.clearText}>✕</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            </Animated.View>

            {error && (
                <Animated.View style={{
                    opacity: shakeAnim.interpolate({
                        inputRange: [-10, 0, 10],
                        outputRange: [1, 1, 1],
                    })
                }}>
                    <HelperText type="error" visible={!!error} style={styles.errorText}>
                        {error}
                    </HelperText>
                </Animated.View>
            )}

            {sendingOtp && (
                <View style={styles.loadingContainer}>
                    <Animated.View style={[styles.loadingDot, { opacity: pulseAnim }]} />
                    <Text style={[styles.loadingText, { color: myColors.textSecondary }]}>
                        در حال ارسال کد تأیید...
                    </Text>
                </View>
            )}


            <TouchableOpacity
                onPress={handleSend}
                disabled={!isValid || sendingOtp}
                activeOpacity={0.85}
            >
                <Animated.View style={[
                    styles.button,
                    { backgroundColor: colors.light.primary },
                    (!isValid || sendingOtp) && styles.buttonDisabled,
                    {
                        transform: [{
                            scale: (isValid && !sendingOtp) ? pulseAnim : 1
                        }]
                    }
                ]}>
                    <View style={styles.buttonContent}>
                        {sendingOtp ? (
                            <>
                                <Animated.View style={[styles.spinner, { opacity: pulseAnim }]} />
                                <Text style={styles.buttonLabel}>در حال ارسال...</Text>
                            </>
                        ) : (
                            <>
                                <Text style={styles.buttonLabel}>ارسال کد تأیید</Text>
                                <Text style={styles.buttonIcon}>→</Text>
                            </>
                        )}
                    </View>
                </Animated.View>
            </TouchableOpacity>
        </Animated.View>
    );
};

const animatedStyles = (stepTransition: Animated.Value) => ({
    opacity: stepTransition.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
    transform: [{
        translateX: stepTransition.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -60],
        }),
    }],
});

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    labelContainer: {
        alignItems: 'center',
        marginBottom: spacing['2xl'],
    },
    iconCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'rgba(78, 205, 196, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.md,
        borderWidth: 2,
        borderColor: 'rgba(78, 205, 196, 0.2)',
    },
    icon: {
        fontSize: 32,
    },
    label: {
        fontSize: 22,
        marginBottom: spacing.xs,
        fontWeight: '700',
        textAlign: 'center',
        fontFamily: 'Vazirmatn',
    },
    helperLabel: {
        fontSize: typography.body2.size,
        textAlign: 'center',
        fontFamily: 'Vazirmatn',
        opacity: 0.7,
        lineHeight: 22,
        paddingHorizontal: spacing.md,
    },
    inputWrapper: {
        position: 'relative',
        borderWidth: 2.5,
        borderRadius: radii.xl + 6,
        marginBottom: spacing.md,
        overflow: 'visible',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.12,
                shadowRadius: 24,
            },
            android: {
                elevation: 12,
            },
        }),
    },
    inputGlow: {
        position: 'absolute',
        top: -8,
        left: -8,
        right: -8,
        bottom: -8,
        borderRadius: radii.xl + 10,
        ...Platform.select({
            ios: {
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 20,
            },
            android: {
                elevation: 20,
            },
        }),
    },
    inputContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        height: 72,
        position: 'relative',
    },
    flagContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.sm,
    },
    flag: {
        fontSize: 24,
    },
    countryCode: {
        fontSize: 18,
        fontWeight: '700',
        marginRight: spacing.sm,
        fontFamily: 'Vazirmatn-Bold',
    },
    divider: {
        width: 1,
        height: 32,
        marginHorizontal: spacing.md,
    },
    input: {
        flex: 1,
        fontSize: 18,
        paddingVertical: spacing.md,
        fontFamily: 'Vazirmatn',
        fontWeight: '600',
    },
    clearButton: {
        marginLeft: spacing.sm,
    },
    clearIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    clearText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#666',
    },
    errorText: {
        textAlign: 'right',
        marginBottom: spacing.md,
        fontFamily: 'Vazirmatn',
        fontSize: typography.body2.size,
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.md,
        paddingVertical: spacing.sm,
    },
    loadingDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.light.primary,
        marginRight: spacing.sm,
    },
    loadingText: {
        fontSize: typography.body2.size,
        fontFamily: 'Vazirmatn',
        fontWeight: '600',
    },
    infoBox: {
        borderRadius: radii.lg,
        padding: spacing.md,
        marginBottom: spacing.xl,
        borderWidth: 1,
    },
    infoText: {
        fontSize: typography.body2.size,
        textAlign: 'center',
        fontFamily: 'Vazirmatn',
        fontWeight: '500',
    },
    button: {
        borderRadius: radii.xl + 2,
        overflow: 'hidden',
        height: 56,
        justifyContent: 'center',
        ...Platform.select({
            ios: {
                shadowColor: colors.light.primary,
                shadowOffset: { width: 0, height: 12 },
                shadowOpacity: 0.4,
                shadowRadius: 24,
            },
            android: {
                elevation: 16,
            },
        }),
    },
    buttonDisabled: {
        backgroundColor: '#888',
        opacity: 0.7,
        ...Platform.select({
            ios: {
                shadowOpacity: 0.1,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.sm,
    },
    buttonLabel: {
        color: '#fff',
        fontFamily: 'Vazirmatn',
        fontWeight: '700',
        fontSize: 17,
        marginRight: spacing.xs,
    },
    buttonIcon: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '700',
    },
    spinner: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#fff',
        borderTopColor: 'transparent',
        marginRight: spacing.sm,
    },
});