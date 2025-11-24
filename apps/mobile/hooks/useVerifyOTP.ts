import { useApi } from './useApi';

export const useVerifyOTP = () => {
  return useApi<{ token: string; role: string }, { phone: string; code: string }>({
    key: ['verify-otp'],
    url: '/Authentication/OtpLogin',
    method: 'POST',
    onSuccess: 'ورود موفقیت‌آمیز بود',
    onError: 'کد تأیید نامعتبر است',
  });
};
