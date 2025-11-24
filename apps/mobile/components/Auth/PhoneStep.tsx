import React from 'react';

import {
    Animated,
    TextInput,
    View,
} from 'react-native';
import {
    Button,
    HelperText,
} from 'react-native-paper';

import {
    colors,
    radii,
    shadows,
    spacing,
    typography,
} from '@scrapdealer/tokens';

interface PhoneStepProps {
    phoneNumber: string;
    onChangePhone: (text: string) => void;
    onSendOTP: () => void;
    loading?: boolean;
    error?: string;
    phoneFocused: boolean;
    setPhoneFocused: (focused: boolean) => void;
    fadeAnim: Animated.Value;
    stepTransition: Animated.Value;
    themeMode?: 'light' | 'dark'; // new prop
}

export const PhoneStep: React.FC<PhoneStepProps> = ({
    phoneNumber,
    onChangePhone,
    onSendOTP,
    loading,
    error,
    phoneFocused,
    setPhoneFocused,
    fadeAnim,
    stepTransition,
    themeMode = 'light',
}) => {
    const themeColors = colors[themeMode];
    const isPhoneValid = phoneNumber.replace(/\D/g, '').length >= 10;

    return (
        <Animated.View
            style={{
                opacity: stepTransition.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
                transform: [
                    {
                        translateX: stepTransition.interpolate({ inputRange: [0, 1], outputRange: [0, -50] }),
                    },
                ],
                minHeight: 300,
            }}
        >
            <View style={{ marginBottom: spacing.lg, position: 'relative' }}>
                <Animated.Text

                >
                    شماره موبایل
                </Animated.Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        style={{
                            flex: 1,
                            height: 56,
                            borderWidth: 1,
                            borderColor: phoneFocused ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)',
                            borderRadius: radii.lg,
                            paddingHorizontal: spacing.md,
                            paddingTop: spacing.sm,
                            fontSize: typography.body1.size,
                            color: themeColors.textPrimary,
                            backgroundColor: phoneFocused ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.1)',
                            textAlign: 'right',
                            writingDirection: 'rtl',
                        }}
                        value={phoneNumber}
                        onChangeText={onChangePhone}
                        onFocus={() => setPhoneFocused(true)}
                        onBlur={() => setPhoneFocused(false)}
                        editable={!loading}
                        keyboardType="phone-pad"
                        maxLength={17}
                    />
                </View>

                {error && (
                    <HelperText
                        type="error"
                        visible={!!error}
                        style={{
                            color: 'red',
                            textAlign: 'right',
                            marginTop: spacing.xs,
                        }}
                    >
                        {error}
                    </HelperText>
                )}
            </View>

            <Button
                mode="contained"
                style={{
                    borderRadius: radii.lg,
                    backgroundColor: themeColors.surface,
                    ...shadows.lg,
                }}
                contentStyle={{ paddingVertical: spacing.xs }}
                onPress={onSendOTP}
                disabled={!isPhoneValid || loading}
                loading={loading}
            >
                {loading ? 'در حال ارسال...' : 'ارسال کد تایید'}
            </Button>
        </Animated.View>
    );
};
