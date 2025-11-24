import {
  useEffect,
  useState,
} from 'react';

import * as Font from 'expo-font';
import { PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { AuthScreen } from './screens/Auth/AuthScreen';
import { ThemeProvider } from './theme/ThemeProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
    mutations: {
      retry: 1,
    },
  },
});

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      Vazirmatn: require('./public/fonts/Vazirmatn-Regular.ttf'),
    }).then(() => setFontLoaded(true));
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <PaperProvider>
          <AuthScreen />
          <Toast />
        </PaperProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}