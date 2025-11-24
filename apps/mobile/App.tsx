import { AuthScreen } from './screens/Auth/AuthScreen';
import { ThemeProvider } from './theme/ThemeProvider';

export default function App() {
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
