import {
  useEffect,
  useState,
} from 'react';

import * as Font from 'expo-font';

import { AuthScreen } from './screens/Auth/AuthScreen';
import { ThemeProvider } from './theme/ThemeProvider';

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      Vazirmatn: require('./assets/fonts/Vazirmatn-Regular.ttf'),
    }).then(() => setFontLoaded(true));
  }, []);

  if (!fontLoaded) return null;

  return (
    <ThemeProvider>
      <AuthScreen
        loading={false}
        error={''}
        onSendOTP={async () => { }}
        onVerifyOTP={async () => { }}
      />
    </ThemeProvider>
  );
}
