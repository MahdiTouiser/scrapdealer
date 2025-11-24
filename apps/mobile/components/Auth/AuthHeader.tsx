import React from 'react';

import {
  Animated,
  Text,
  View,
} from 'react-native';

import {
  colors,
  spacing,
  typography,
} from '@scrapdealer/tokens';

interface AuthHeaderProps {
    step: 'phone' | 'otp';
    phoneNumber?: string;
    stepTransition: Animated.Value;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ step, phoneNumber, stepTransition }) => (
    <View style={{ alignItems: 'center', marginBottom: spacing['2xl'], minHeight: 120 }}>
        <Animated.View style={{
            opacity: stepTransition.interpolate({ inputRange: [0, 1], outputRange: [1, 0] })
        }}>
            {step === 'phone' && (
                <>
                    <Text style={{ fontSize: typography.h1.size, fontWeight: typography.h1.weight, color: colors.white, marginBottom: spacing.sm, textAlign: 'center' }}>
                        ورود به حساب
                    </Text>
                    <Text style={{ fontSize: typography.body1.size, color: 'rgba(255, 255, 255, 0.8)', textAlign: 'center', lineHeight: typography.body1.lineHeight * typography.body1.size }}>
                        شماره موبایل خود را وارد کنید
                    </Text>
                </>
            )}
        </Animated.View>

        <Animated.View style={{
            opacity: stepTransition.interpolate({ inputRange: [0, 1], outputRange: [0, 1] })
        }}>
            {step === 'otp' && (
                <>
                    <Text style={{ fontSize: typography.h1.size, fontWeight: typography.h1.weight, color: colors.white, marginBottom: spacing.sm, textAlign: 'center' }}>
                        تایید شماره موبایل
                    </Text>
                    <Text style={{ fontSize: typography.body1.size, color: 'rgba(255, 255, 255, 0.8)', textAlign: 'center', lineHeight: typography.body1.lineHeight * typography.body1.size }}>
                        کد تایید ارسال شده به
                    </Text>
                    <Text style={{ fontSize: typography.h3.size, fontWeight: typography.h3.weight, color: colors.white, textAlign: 'center', marginVertical: spacing.sm }}>
                        {phoneNumber}
                    </Text>
                    <Text style={{ fontSize: typography.body1.size, color: 'rgba(255, 255, 255, 0.8)', textAlign: 'center', lineHeight: typography.body1.lineHeight * typography.body1.size }}>
                        را وارد کنید
                    </Text>
                </>
            )}
        </Animated.View>
    </View>
);
