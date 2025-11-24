// components/Auth/PhoneStep.tsx
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
    radii,
    spacing,
    typography,
} from '@scrapdealer/tokens';

import { Text } from '../../components/CustomText'; // Your Vazirmatn Text
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
    loading,
    error,
    phoneFocused,
    setPhoneFocused,
    stepTransition,
}) => {
    const { theme } = useThemeContext();
    const { colors, myColors } = theme;

    const isValid = phoneNumber.replace(/\D/g, '').length >= 10;

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
            {/* Floating Label */}
            <Text style={[styles.label, { color: myColors.textSecondary }]}>
                شماره موبایل
            </Text>

            {/* Input Container */}
            <View style={[
                styles.inputWrapper,
                phoneFocused && styles.inputWrapperFocused,
                { borderColor: phoneFocused ? colors.primary : myColors.textSecondary + '40' }
            ]}>
                <Text style={styles.countryCode}>+98</Text>

                <RNTextInput
                    style={[
                        styles.input,
                        { color: myColors.textPrimary, fontFamily: 'Vazirmatn' } // Vazirmatn via fontFamily
                    ]}
                    value={phoneNumber}
                    onChangeText={onChangePhone}
                    onFocus={() => setPhoneFocused(true)}
                    onBlur={() => setPhoneFocused(false)}
                    keyboardType="phone-pad"
                    maxLength={17}
                    placeholder="912 345 6789"
                    placeholderTextColor={myColors.textSecondary + '60'}
                    textAlign="left"
                    editable={!loading}
                />
            </View>

            {/* Error */}
            {error && (
                <HelperText type="error" visible={!!error} style={styles.errorText}>
                    {error}
                </HelperText>
            )}

            {/* Button */}
            <Button
                mode="contained"
                onPress={onSendOTP}
                loading={loading}
                disabled={!isValid || loading}
                contentStyle={styles.buttonContent}
                style={[
                    styles.button,
                    (!isValid || loading) && styles.buttonDisabled
                ]}
                labelStyle={{ fontFamily: 'Vazirmatn', fontWeight: '600' }}
            >
                {loading ? 'در حال ارسال...' : 'ارسال کد تایید'}
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
            ios: { shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 4 } },
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
        backgroundColor: '#000000', // or theme.colors.primary
    },
    buttonDisabled: {
        backgroundColor: '#cccccc',
    },
    buttonContent: {
        paddingVertical: 8,
    },
});