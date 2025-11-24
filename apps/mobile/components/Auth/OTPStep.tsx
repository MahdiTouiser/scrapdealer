// components/Auth/OTPStep.tsx
import React from 'react';

import {
    Animated,
    Platform,
    TextInput as RNTextInput,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    Button,
    HelperText,
} from 'react-native-paper';

import {
    radii,
    spacing,
    typography,
} from '@scrapdealer/tokens';

import { Text } from '../../components/CustomText';
import { useApi } from '../../hooks/useApi';
import { useCountdown } from '../../hooks/useCountDown';
import { useThemeContext } from '../../theme/ThemeProvider';

const useVerifyOTP = () => {
    return useApi<
        { token: string; role: string },
        { phone: string; code: string }
    >({
        key: ['verify-otp'],
        url: '/Authentication/OtpLogin',
        method: 'POST',
        onSuccess: 'ورود موفقیت‌آمیز بود',
        onError: 'کد تأیید اشتباه است',
        enabled: false,
    });
};

interface OTPStepProps {
    phoneNumber: string;
    onVerifySuccess: (token: string, role: string) => void;
    onResendOTP?: () => Promise<void>;
    error?: string;
    stepTransition: Animated.Value;
    handleBackToPhone: () => void;
}

export const OTPStep: React.FC<OTPStepProps> = ({
    phoneNumber,
    onVerifySuccess,
    onResendOTP,
    error: externalError,
    stepTransition,
    handleBackToPhone,
}) => {
    const { theme } = useThemeContext();
    const { myColors, colors } = theme;

    const [otpCode, setOTPCode] = React.useState('');
    const inputRefs = React.useRef<(RNTextInput | null)[]>([]);

    const { countdown, restart } = useCountdown(120);
    const { mutate: verifyOtp, isPending: verifying } = useVerifyOTP();

    React.useEffect(() => {
        if (otpCode.length === 6 && !verifying) {
            handleVerify();
        }
    }, [otpCode, verifying]);

    const handleVerify = () => {
        const cleanPhone = phoneNumber.replace(/\D/g, '');
        const finalPhone = cleanPhone.startsWith('0') ? cleanPhone : `0${cleanPhone}`;

        verifyOtp(
            { phone: finalPhone, code: 'Scr@pDea1eR!!73138' },
            {
                onSuccess: (data) => {
                    onVerifySuccess(data.token, data.role);
                },
            }
        );
    };

    const handleChange = (text: string, index: number) => {
        if (!/^\d*$/.test(text)) return;

        const newCode = otpCode.split('');
        if (text) {
            newCode[index] = text;
        } else {
            newCode[index] = '';
        }
        const joined = newCode.join('').slice(0, 6);
        setOTPCode(joined);

        if (text && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = ({ nativeEvent }: any, index: number) => {
        if (nativeEvent.key === 'Backspace' && !otpCode[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleResend = async () => {
        if (onResendOTP) {
            await onResendOTP();
            restart();
            setOTPCode('');
            inputRefs.current[0]?.focus();
        }
    };

    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60);
        const s = (sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

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
            <Text style={[styles.title, { color: myColors.textPrimary }]}>
                کد تأیید را وارد کنید
            </Text>
            <Text style={[styles.subtitle, { color: myColors.textSecondary }]}>
                کد ۶ رقمی ارسال‌شده به {phoneNumber} را وارد کنید
            </Text>

            <View style={styles.otpContainer}>
                {Array.from({ length: 6 }).map((_, i) => (
                    <View
                        key={i}
                        style={[
                            styles.otpBox,
                            otpCode[i] && styles.otpBoxFilled,
                            i === otpCode.length && styles.otpBoxFocused,
                        ]}
                    >
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
                        />
                    </View>
                ))}
            </View>

            {(externalError || verifying) && (
                <HelperText type="error" visible={!!externalError || verifying} style={styles.helperText}>
                    {verifying ? 'در حال تأیید...' : externalError}
                </HelperText>
            )}

            <View style={styles.resendContainer}>
                {countdown > 0 ? (
                    <Text style={[styles.timerText, { color: myColors.textSecondary }]}>
                        ارسال مجدد کد در {formatTime(countdown)}
                    </Text>
                ) : (
                    <TouchableOpacity onPress={handleResend} disabled={verifying}>
                        <Text style={[styles.resendLink, { color: colors.primary }]}>
                            ارسال مجدد کد تأیید
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            <TouchableOpacity onPress={handleBackToPhone} style={styles.backButton}>
                <Text style={[styles.backText, { color: colors.primary }]}>تغییر شماره موبایل</Text>
            </TouchableOpacity>

            <Button
                mode="contained"
                onPress={handleVerify}
                loading={verifying}
                disabled={otpCode.length !== 6 || verifying}
                contentStyle={styles.buttonContent}
                style={[styles.button, (otpCode.length !== 6 || verifying) && styles.buttonDisabled]}
                labelStyle={{ fontFamily: 'Vazirmatn', fontWeight: '600' }}
            >
                تأیید و ورود
            </Button>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    subtitle: {
        fontSize: typography.body1.size,
        textAlign: 'center',
        marginBottom: spacing.xl,
        opacity: 0.8,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: spacing.xl,
        paddingHorizontal: spacing.md,
    },
    otpBox: {
        width: 56,
        height: 68,
        borderRadius: radii.xl,
        backgroundColor: 'rgba(120,120,128,0.08)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: 'rgba(120,120,128,0.15)',
        ...Platform.select({
            ios: { shadowOpacity: 0.08, shadowRadius: 12 },
            android: { elevation: 4 },
        }),
    },
    otpBoxFilled: {
        backgroundColor: 'rgba(0,0,0,0.08)',
        borderColor: '#00000040',
    },
    otpBoxFocused: {
        borderColor: '#007AFF',
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 10,
    },
    otpInput: {
        fontSize: 32,
        fontWeight: '700',
        width: '100%',
        height: '100%',
        textAlign: 'center',
    },
    helperText: {
        textAlign: 'center',
        marginTop: -spacing.md,
        marginBottom: spacing.md,
    },
    resendContainer: {
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    timerText: {
        fontSize: typography.body2.size,
        opacity: 0.7,
    },
    resendLink: {
        fontSize: typography.body1.size,
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
    backButton: {
        alignSelf: 'center',
        marginBottom: spacing.xl,
    },
    backText: {
        fontSize: typography.body2.size,
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
});