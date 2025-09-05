import React from 'react';

import { StatusBar } from 'expo-status-bar';
import {
  MD3LightTheme,
  PaperProvider,
} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  colors,
  radii,
} from '@scrapdealer/tokens';

import { AuthScreen } from './screens/LoginScreen';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary.main,
    onPrimary: colors.primary.contrastText,
    primaryContainer: colors.primary.light,
    onPrimaryContainer: colors.primary.dark,

    secondary: colors.secondary.main,
    onSecondary: colors.secondary.contrastText,
    secondaryContainer: colors.secondary.light,
    onSecondaryContainer: colors.secondary.dark,

    surface: colors.surface.paper,
    onSurface: colors.text.primary,
    surfaceVariant: colors.surface.elevated,
    onSurfaceVariant: colors.text.secondary,

    background: colors.surface.background,
    onBackground: colors.text.primary,

    error: colors.semantic.error[500],
    onError: colors.white,
    errorContainer: colors.semantic.error[50],
    onErrorContainer: colors.semantic.error[600],

    outline: colors.neutral[300],
    outlineVariant: colors.neutral[200],

    shadow: colors.black,
    scrim: colors.surface.overlay,

    inverseSurface: colors.neutral[800],
    inverseOnSurface: colors.white,
    inversePrimary: colors.primary.light,

    // Custom colors for your app
    surfaceDisabled: 'rgba(0, 0, 0, 0.12)',
    onSurfaceDisabled: 'rgba(0, 0, 0, 0.38)',
    backdrop: 'rgba(0, 0, 0, 0.4)',
  },
  roundness: radii.lg,
};

export default function App() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string>('');

  const handleSendOTP = async (phoneNumber: string) => {
    console.log('Sending OTP to:', phoneNumber);
    setError('');
    setLoading(true);

    try {
      // Simulate API call to send OTP
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Add your OTP sending logic here
      // const response = await authService.sendOTP(phoneNumber);

      console.log('OTP sent successfully to:', phoneNumber);

    } catch (error) {
      console.error('Failed to send OTP:', error);
      setError('خطا در ارسال کد تایید. لطفا مجددا تلاش کنید.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (phoneNumber: string, otpCode: string) => {
    console.log('Verifying OTP:', { phoneNumber, otpCode });
    setError('');
    setLoading(true);

    try {
      // Simulate API call to verify OTP
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Add your OTP verification logic here
      // const response = await authService.verifyOTP(phoneNumber, otpCode);

      console.log('Authentication successful');

      // Navigate to main app or save auth state
      // navigation.replace('MainApp');

    } catch (error) {
      console.error('Failed to verify OTP:', error);
      setError('کد تایید نامعتبر است. لطفا مجددا تلاش کنید.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async (phoneNumber: string) => {
    console.log('Resending OTP to:', phoneNumber);
    setError('');

    try {
      await handleSendOTP(phoneNumber);
    } catch (error) {
      // Error is already handled in handleSendOTP
    }
  };

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <StatusBar style="light" />
        <AuthScreen
          onSendOTP={handleSendOTP}
          onVerifyOTP={handleVerifyOTP}
          onResendOTP={handleResendOTP}
          loading={loading}
          error={error}
        />
      </PaperProvider>
    </SafeAreaProvider>
  );
}