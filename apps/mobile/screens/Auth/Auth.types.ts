export interface AuthScreenProps {
  onSendOTP: (phoneNumber: string) => Promise<void>;
  onVerifyOTP: (phoneNumber: string, otpCode: string) => Promise<void>;
  onResendOTP?: (phoneNumber: string) => Promise<void>;
  loading?: boolean;
  error?: string;
}
