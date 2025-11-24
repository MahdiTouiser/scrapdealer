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
    loading = false,
    error,
    phoneFocused,
    setPhoneFocused,
    stepTransition,
}) => {
    const { theme } = useThemeContext();
    const { myColors, colors } = theme;

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
        <Animated.View
            style={[
                styles.container,
                {
                    opacity: stepTransition.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
                    transform: [
                        {
                            translateX: stepTransition.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, -60],
                            }),
                        },
                    ],
                },
            ]}
        >
            <Text style={[styles.label, { color: myColors.textSecondary }]}>
                شماره موبایل
            </Text>

            <View
                style={[
                    styles.inputWrapper,
                    phoneFocused && styles.inputWrapperFocused,
                    { borderColor: phoneFocused ? colors.primary : myColors.textSecondary + '40' },
                ]}
            >
                <Text style={styles.countryCode}>+98</Text>

                <RNTextInput
                    style={[styles.input, { color: myColors.textPrimary, fontFamily: 'Vazirmatn' }]}
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
                labelStyle={{ fontFamily: 'Vazirmatn', fontWeight: '600' }}
            >
                ارسال کد تایید
            </Button>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    label: {
        fontSize: typography.body1.size,
        marginBottom: spacing.md,
        fontWeight: '600',
        textAlign: 'right',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderRadius: radii.xl,
        paddingHorizontal: spacing.lg,
        height: 64,
        backgroundColor: 'rgba(120,120,128,0.06)',
        marginBottom: spacing.lg,
        ...Platform.select({
            ios: {
                shadowOpacity: 0.08,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 4 },
            },
            android: { elevation: 6 },
        }),
    },
    inputWrapperFocused: {
        backgroundColor: 'rgba(120,120,128,0.1)',
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 12,
    },
    countryCode: {
        fontSize: 18,
        fontWeight: '700',
        color: '#666',
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 19,
        paddingVertical: 16,
        textAlign: 'left',
    },
    errorText: {
        textAlign: 'right',
        marginTop: -8,
        marginBottom: spacing.md,
    },
    button: {
        borderRadius: radii.xl,
        marginTop: spacing.xl,
        backgroundColor: colors.light.primary,
    },
    buttonDisabled: {
        backgroundColor: '#585858ff',
    },
    buttonContent: {
        paddingVertical: 8,
    },
});