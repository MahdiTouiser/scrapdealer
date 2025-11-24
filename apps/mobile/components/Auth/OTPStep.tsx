import React from 'react';

import {
  Animated,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Button,
  HelperText,
  IconButton,
  Text,
} from 'react-native-paper';

import {
  colors,
  radii,
  shadows,
  spacing,
  typography,
} from '@scrapdealer/tokens';

import { useCountdown } from '../../hooks/useCountDown';

interface OTPStepProps {
    otpCode: string;
    setOTPCode: (code: string) => void;
    onVerifyOTP: () => void;
    onResendOTP?: () => void;
    loading?: boolean;
    error?: string;
    otpFocused: boolean;
    setOTPFocused: (focused: boolean) => void;
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
    otpFocused,
    setOTPFocused,
    stepTransition,
    handleBackToPhone,
}) => {
    const otpInputRefs = React.useRef<(TextInput | null)[]>([]);
    const { countdown, resetCountdown, setCountdown } = useCountdown(120);

    const handleOTPChange = (value: string, index: number) => {
        const newOTP = otpCode.split('');
        newOTP[index] = value;
        const updatedOTP = newOTP.join('');
        setOTPCode(updatedOTP);

        if (value && index < 5) otpInputRefs.current[index + 1]?.focus();
        else if (updatedOTP.length === 6) onVerifyOTP();
    };

    const handleOTPKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !otpCode[index] && index > 0) otpInputRefs.current[index - 1]?.focus();
    };

    const formatCountdown = (seconds: number) => `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
    const isOTPValid = otpCode.length === 6;

    return (
        <Animated.View style={{
            opacity: stepTransition.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }),
            transform: [{ translateX: stepTransition.interpolate({ inputRange: [0, 1], outputRange: [50, 0] }) }],
            minHeight: 300,
        }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginBottom: spacing.xl }} onPress={handleBackToPhone} disabled={loading}>
                <IconButton icon="arrow-right" iconColor={colors.white} size={24} />
                <Text style={{ color: colors.white, fontSize: typography.body1.size, marginLeft: spacing.xs }}>تغییر شماره موبایل</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xl, paddingHorizontal: spacing.sm }}>
                {Array.from({ length: 6 }, (_, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => otpInputRefs.current[index] = ref}
                        style={{
                            width: 45,
                            height: 56,
                            borderWidth: 1,
                            borderRadius: radii.md,
                            fontSize: typography.h2.size,
                            fontWeight: typography.h2.weight,
                            color: colors.white,
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            borderColor: otpCode[index] ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)',
                        }}
                        value={otpCode[index] || ''}
                        onChangeText={(v) => handleOTPChange(v, index)}
                        onKeyPress={(e) => handleOTPKeyPress(e, index)}
                        onFocus={() => setOTPFocused(true)}
                        onBlur={() => setOTPFocused(false)}
                        keyboardType="number-pad"
                        maxLength={1}
                        textAlign="center"
                        editable={!loading}
                    />
                ))}
            </View>

            {error && <HelperText type="error" visible={!!error} style={{ color: colors.semantic.error[50], textAlign: 'right', marginTop: spacing.xs }}>{error}</HelperText>}

            <View style={{ alignItems: 'center', marginBottom: spacing.xl }}>
                {countdown > 0 ? (
                    <Text style={{ fontSize: typography.body2.size, color: 'rgba(255,255,255,0.7)' }}>ارسال مجدد کد در {formatCountdown(countdown)}</Text>
                ) : onResendOTP ? (
                    <TouchableOpacity onPress={onResendOTP} disabled={loading}>
                        <Text style={{ fontSize: typography.body1.size, color: colors.white, textDecorationLine: 'underline', fontWeight: typography.fontWeight.medium }}>ارسال مجدد کد تایید</Text>
                    </TouchableOpacity>
                ) : null}
            </View>

            <Button
                mode="contained"
                style={{ borderRadius: radii.lg, backgroundColor: colors.white, ...shadows.lg }}
                contentStyle={{ paddingVertical: spacing.xs }}
                labelStyle={{ fontSize: typography.button.size, fontWeight: typography.button.weight, color: colors.primary.main }}
                onPress={onVerifyOTP}
                disabled={!isOTPValid || loading}
                loading={loading}
            >
                {loading ? 'در حال تایید...' : 'تایید و ورود'}
            </Button>
        </Animated.View>
    );
};
