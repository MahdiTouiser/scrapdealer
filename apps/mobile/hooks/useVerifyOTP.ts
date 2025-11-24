import { useApi } from './useApi';

export const useVerifyOTP = () => {
  return useApi<{ token: string; refreshToken: string }, { phone: string; code: string }>({
    key: ['verify-otp'],
    url: '/Authentication/OtpLogin',
    method: 'POST',
    enabled: false,
  });
};
