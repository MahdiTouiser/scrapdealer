// components/Auth/AuthHeader.tsx
import React from 'react';

import {
    Animated,
    Platform,
    StyleSheet,
    View,
} from 'react-native';

import {
    radii,
    spacing,
    typography,
} from '@scrapdealer/tokens';

import { Text } from '../../components/CustomText';
import { useThemeContext } from '../../theme/ThemeProvider';

const lineHeightFactor = 1.38;

export const AuthHeader: React.FC<{
    step: 'phone' | 'otp';
    phoneNumber?: string;
    stepTransition: Animated.AnimatedInterpolation<number>;
}> = ({ step, phoneNumber, stepTransition }) => {
    const { theme, mode } = useThemeContext();
    const { myColors, colors } = theme;

    const isDark = mode === 'dark';

    return (
        <View style={styles.container}>
            {/* Phone Step */}
            <Animated.View
                style={[
                    styles.slideContainer,
                    {
                        opacity: stepTransition.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 0],
                        }),
                        transform: [
                            {
                                translateY: stepTransition.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, -40],
                                }),
                            },
                        ],
                    },
                ]}
                pointerEvents={step === 'phone' ? 'auto' : 'none'}
            >
                {step === 'phone' && (
                    <>
                        <Text style={[styles.title, { color: myColors.textPrimary }]}>
                            ورود یا ثبت‌نام
                        </Text>
                        <Text style={[styles.subtitle, { color: myColors.textSecondary }]}>
                            برای ادامه، شماره موبایل خود را وارد کنید
                        </Text>
                    </>
                )}
            </Animated.View>

            {/* OTP Step */}
            <Animated.View
                style={[
                    styles.slideContainer,
                    {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        opacity: stepTransition.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1],
                        }),
                        transform: [
                            {
                                translateY: stepTransition.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [40, 0],
                                }),
                            },
                        ],
                    },
                ]}
                pointerEvents={step === 'otp' ? 'auto' : 'none'}
            >
                {step === 'otp' && (
                    <>
                        <Text style={[styles.title, { color: myColors.textPrimary }]}>
                            کد تایید
                        </Text>
                        <Text style={[styles.subtitle, { color: myColors.textSecondary }]}>
                            کد ۶ رقمی ارسال شده به
                        </Text>

                        {/* Premium Glass Card – using only theme.surface */}
                        <View style={[styles.phoneCard, { backgroundColor: colors.surface + (isDark ? '20' : '10') }]}>
                            <Text style={[styles.phoneNumber, { color: myColors.textPrimary }]}>
                                {phoneNumber}
                            </Text>
                        </View>

                        <Text style={[styles.hint, { color: myColors.textSecondary }]}>
                            کد را وارد کنید تا وارد شوید
                        </Text>
                    </>
                )}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.xl,
        marginBottom: spacing['4xl'],
        minHeight: 200,
    },
    slideContainer: {
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontSize: typography.h1.size,
        fontWeight: '800',
        textAlign: 'center',
        lineHeight: typography.h1.size * lineHeightFactor,
        letterSpacing: -0.6,
        marginBottom: spacing.md,
    },
    subtitle: {
        fontSize: typography.body1.size,
        textAlign: 'center',
        lineHeight: typography.body1.size * 1.6,
        opacity: 0.85,
    },
    hint: {
        fontSize: typography.body2.size,
        textAlign: 'center',
        marginTop: spacing.xl,
        opacity: 0.7,
    },
    phoneCard: {
        marginVertical: spacing.xl,
        paddingVertical: 18,
        paddingHorizontal: 36,
        borderRadius: radii.xl,
        borderWidth: 1,
        borderColor: 'transparent',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.12,
                shadowRadius: 24,
            },
            android: {
                elevation: 10,
            },
        }),
    },
    phoneNumber: {
        fontSize: typography.h2.size,
        fontWeight: '700',
        letterSpacing: 2.5,
    },
});