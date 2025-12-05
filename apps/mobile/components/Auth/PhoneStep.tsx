import React from 'react';

import {
    Animated,
    Platform,
    TextInput as RNTextInput,
    StyleSheet,
    View,
} from 'react-native';
import {
    Button,
    HelperText,
} from 'react-native-paper';

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

    return (
        <Animated.View style={[styles.container, animatedStyles(stepTransition)]}>
            <Text style={[styles.label, { color: myColors.textSecondary }]}>
                شماره موبایل
            </Text>

            <View style={[
                styles.inputWrapper,
                phoneFocused && styles.inputWrapperFocused,
                { borderColor: phoneFocused ? colors.light.primary : myColors.textSecondary + '66' },
            ]}>
                <Text style={styles.countryCode}>+98</Text>

                <RNTextInput
                    style={[styles.input, { color: myColors.textPrimary }]}
                    value={phoneNumber}
                    onChangeText={onChangePhone}
                    onFocus={() => setPhoneFocused(true)}
                    onBlur={() => setPhoneFocused(false)}
                    keyboardType="phone-pad"
                    maxLength={17}
                    placeholder="912 345 6789"
                    placeholderTextColor={myColors.textSecondary + '80'}
                    textAlign="left"
                    editable={!sendingOtp}
                />
            </View>

            {(error || sendingOtp) && (
                <HelperText type="error" visible={!!error} style={styles.errorText}>
                    {error || (sendingOtp ? 'در حال ارسال...' : '')}
                </HelperText>
            )}

            <Button
                mode="contained"
                onPress={handleSend}
                loading={sendingOtp}
                disabled={!isValid || sendingOtp}
                contentStyle={styles.buttonContent}
                style={[
                    styles.button,
                    (!isValid || sendingOtp) && styles.buttonDisabled,
                ]}
                labelStyle={styles.buttonLabel}
            >
                ارسال کد تایید
            </Button>
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
    label: {
        fontSize: typography.body1.size,
        marginBottom: spacing.md,
        fontWeight: '600',
        textAlign: 'right',
        fontFamily: 'Vazirmatn',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: radii.xl + 4,
        paddingHorizontal: spacing.xl,
        height: 68,
        backgroundColor: 'rgba(120, 120, 128, 0.04)',
        marginBottom: spacing.lg,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.08,
                shadowRadius: 16,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    inputWrapperFocused: {
        backgroundColor: 'rgba(120, 120, 128, 0.08)',
        borderColor: colors.light.primary,
        ...Platform.select({
            ios: {
                shadowOpacity: 0.2,
                shadowRadius: 24,
            },
            android: {
                elevation: 16,
            },
        }),
    },
    countryCode: {
        fontSize: 20,
        fontWeight: '700',
        color: '#444',
        marginRight: spacing.sm,
        fontFamily: 'Vazirmatn-Bold',
    },
    input: {
        flex: 1,
        fontSize: 20,
        paddingVertical: spacing.md,
        fontFamily: 'Vazirmatn',
    },
    errorText: {
        textAlign: 'right',
        marginTop: -spacing.xs,
        marginBottom: spacing.md,
        fontFamily: 'Vazirmatn',
    },
    button: {
        borderRadius: radii.xl,
        marginTop: spacing.xl,
        backgroundColor: colors.light.primary,
        height: 56,
    },
    buttonDisabled: {
        backgroundColor: '#888',
        opacity: 0.7,
    },
    buttonContent: {
        paddingVertical: spacing.sm,
    },
    buttonLabel: {
        color: '#fff',
        fontFamily: 'Vazirmatn',
        fontWeight: '700',
        fontSize: 17,
    },
});