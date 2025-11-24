import {
  useEffect,
  useState,
} from 'react';

import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import { PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { AuthScreen } from './screens/Auth/AuthScreen';
import {
  ThemeProvider,
  useThemeContext,
} from './theme/ThemeProvider';

// Single QueryClient instance (never recreate)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: true,
      staleTime: 5 * 60 * 1000,
    },
    mutations: {
      retry: 1,
    },
  },
});

const FontLoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#000000" />
  </View>
);

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          Vazirmatn: require('./public/fonts/Vazirmatn-Regular.ttf'),
          'Vazirmatn-Medium': require('./public/fonts/Vazirmatn-Medium.ttf'),
          'Vazirmatn-Bold': require('./public/fonts/Vazirmatn-Bold.ttf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.warn('Font loading failed:', error);
        setFontsLoaded(true);
      }
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <FontLoadingScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppContent />
        <Toast position="top" topOffset={60} />
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const AppContent = () => {
  const { mode } = useThemeContext();

  return (
    <PaperProvider>
      <AuthScreen
        loading={false}
        error={undefined}
        onSendOTP={async (phone: string) => {
          console.log('Send OTP to:', phone);
          await new Promise(resolve => setTimeout(resolve, 1500));
        }}
        onVerifyOTP={async (phone: string, code: string) => {
          console.log('Verify OTP:', { phone, code });
          await new Promise(resolve => setTimeout(resolve, 2000));
          alert('ورود موفقیت‌آمیز! 🎉');
        }}
        onResendOTP={async (phone: string) => {
          console.log('Resend OTP to:', phone);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }}
        onLoginSuccess={(token: string, role: string) => {
          console.log('Logged in!', { token, role });
        }}
      />
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});