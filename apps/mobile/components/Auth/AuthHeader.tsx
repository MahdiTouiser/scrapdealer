import React from 'react';

import {
    Animated,
    TextStyle,
    View,
} from 'react-native';

import {
    colors,
    spacing,
    typography,
} from '@scrapdealer/tokens';

import { Text } from '../../components/CustomText';

const lineHeightFactor = 1.3;

export const AuthHeader: React.FC<{
    step: 'phone' | 'otp';
    phoneNumber?: string;
    stepTransition: Animated.Value;
}> = ({ step, phoneNumber, stepTransition }) => (
    <View style={{ alignItems: 'center', marginBottom: spacing['2xl'], minHeight: 120 }}>
        <Animated.View
            style={{
                opacity: stepTransition.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
            }}
        >
            {step === 'phone' && (
                <>
                    <Text
                        style={{
                            fontSize: typography.h1.size,
                            fontWeight: typography.h1.weight as TextStyle['fontWeight'],
                            color: colors.light.surface, // white
                            marginBottom: spacing.sm,
                            textAlign: 'center',
                            lineHeight: typography.h1.size * lineHeightFactor,
                        }}
                    >
                        ورود به حساب
                    </Text>
                    <Text
                        style={{
                            fontSize: typography.body1.size,
                            fontWeight: typography.body1.weight as TextStyle['fontWeight'],
                            color: 'rgba(255, 255, 255, 0.8)',
                            textAlign: 'center',
                            lineHeight: typography.body1.size * 1.5,
                        }}
                    >
                        شماره موبایل خود را وارد کنید
                    </Text>
                </>
            )}
        </Animated.View>

        <Animated.View
            style={{
                opacity: stepTransition.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }),
            }}
        >
            {step === 'otp' && (
                <>
                    <Text
                        style={{
                            fontSize: typography.h1.size,
                            fontWeight: typography.h1.weight as TextStyle['fontWeight'],
                            color: colors.light.surface, // white
                            marginBottom: spacing.sm,
                            textAlign: 'center',
                            lineHeight: typography.h1.size * lineHeightFactor,
                        }}
                    >
                        تایید شماره موبایل
                    </Text>
                    <Text
                        style={{
                            fontSize: typography.body1.size,
                            fontWeight: typography.body1.weight as TextStyle['fontWeight'],
                            color: 'rgba(255, 255, 255, 0.8)',
                            textAlign: 'center',
                            lineHeight: typography.body1.size * 1.5,
                        }}
                    >
                        کد تایید ارسال شده به
                    </Text>
                    <Text
                        style={{
                            fontSize: typography.h2.size,
                            fontWeight: typography.h2.weight as TextStyle['fontWeight'],
                            color: colors.light.surface, // white
                            textAlign: 'center',
                            marginVertical: spacing.sm,
                            lineHeight: typography.h2.size * lineHeightFactor,
                        }}
                    >
                        {phoneNumber}
                    </Text>
                    <Text
                        style={{
                            fontSize: typography.body1.size,
                            fontWeight: typography.body1.weight as TextStyle['fontWeight'],
                            color: 'rgba(255, 255, 255, 0.8)',
                            textAlign: 'center',
                            lineHeight: typography.body1.size * 1.5,
                        }}
                    >
                        را وارد کنید
                    </Text>
                </>
            )}
        </Animated.View>
    </View>
);
