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
import { useCountdown } from '../../hooks/useCountDown';
import { useThemeContext } from '../../theme/ThemeProvider';

interface OTPStepProps {
    otpCode: string;
    setOTPCode: (code: string) => void;
    onVerifyOTP: () => void;
    onResendOTP?: () => void;
    loading?: boolean;
    error?: string;
    stepTransition: Animated.Value;
    handleBackToPhone: () => void;
}

export const OTPStep: React.FC<OTPStepProps> = ({
    otpCode,
    setOTPCode,
    onVerifyOTP,
    onResendOTP,
    loading,
    error,
    stepTransition,
    handleBackToPhone,
}) => {
    const { theme } = useThemeContext();
    const { myColors, colors } = theme;

    const inputRefs = React.useRef<(RNTextInput | null)[]>([]);
    const { countdown } = useCountdown(120);

    const handleChange = (text: string, index: number) => {
        if (!/^\d*$/.test(text)) return;
        const newCode = otpCode.split('');
        newCode[index] = text;
        setOTPCode(newCode.join('').slice(0, 6));

        if (text && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
        if (newCode.join('').length === 6) {
            onVerifyOTP();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !otpCode[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60);
        const s = (sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const isComplete = otpCode.length === 6;

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    opacity: stepTransition.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }),
                    transform: [
                        { translateX: stepTransition.interpolate({ inputRange: [0, 1], outputRange: [80, 0] }) },
                    ],
                },
            ]}
        >

            <View style={styles.otpContainer}>
                {Array.from({ length: 6 }).map((_, i) => (
                    <View
                        key={i}
                        style={[
                            styles.otpBoxWrapper,
                            otpCode[i] && styles.otpBoxFilled,
                            i === otpCode.length && styles.otpBoxActive, // cursor hint
                        ]}
                    >
                        <RNTextInput
                            ref={(ref) => (inputRefs.current[i] = ref)}
                            style={[
                                styles.otpInput,
                                { color: myColors.textPrimary, fontFamily: 'Vazirmatn' },
                            ]}
                            value={otpCode[i] || ''}
                            onChangeText={(t) => handleChange(t, i)}
                            onKeyPress={(e) => handleKeyPress(e, i)}
                            keyboardType="number-pad"
                            maxLength={1}
                            textAlign="center"
                            editable={!loading}
                        />
                    </View>
                ))}
            </View>

            {error && (
                <HelperText type="error" visible={!!error} style={styles.error}>
                    {error}
                </HelperText>
            )}

            <View style={styles.resendContainer}>
                {countdown > 0 ? (
                    <Text style={[styles.resendText, { color: myColors.textSecondary }]}>
                        ارسال مجدد کد در {formatTime(countdown)}
                    </Text>
                ) : (
                    <TouchableOpacity onPress={onResendOTP} disabled={loading || !onResendOTP}>
                        <Text style={[styles.resendLink, { color: colors.primary }]}>
                            ارسال مجدد کد تایید
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            <Button
                mode="contained"
                onPress={onVerifyOTP}
                loading={loading}
                disabled={!isComplete || loading}
                contentStyle={styles.verifyButtonContent}
                style={[
                    styles.verifyButton,
                    (!isComplete || loading) && styles.verifyButtonDisabled,
                ]}
                labelStyle={{ fontFamily: 'Vazirmatn', fontWeight: '600' }}
            >
                تایید و ورود
            </Button>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginBottom: spacing.xl,
    },
    backText: {
        fontSize: typography.body1.size,
        fontWeight: '600',
        marginLeft: -8,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: spacing.xl,
        paddingHorizontal: spacing.md,
    },
    otpBoxWrapper: {
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
        backgroundColor: 'rgba(0,0,0,0.06)',
        borderColor: '#00000030',
    },
    otpBoxActive: {
        borderColor: '#007AFF',
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 8,
    },
    otpInput: {
        fontSize: 28,
        fontWeight: '700',
        width: '100%',
        height: '100%',
        textAlign: 'center',
    },
    error: {
        textAlign: 'center',
        marginTop: -spacing.md,
        marginBottom: spacing.lg,
    },
    resendContainer: {
        alignItems: 'center',
        marginBottom: spacing['2xl'],
    },
    resendText: {
        fontSize: typography.body2.size,
        opacity: 0.7,
    },
    resendLink: {
        fontSize: typography.body1.size,
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
    verifyButton: {
        borderRadius: radii.xl,
        backgroundColor: '#000000',
        marginTop: spacing.lg,
    },
    verifyButtonDisabled: {
        backgroundColor: '#cccccc',
    },
    verifyButtonContent: {
        paddingVertical: 12,
    },
});