import { useApi } from '../hooks/useApi';

export const useSendOtp = () => {
  return useApi<{ success: boolean; message?: string }, { phone: string }>({
    key: ['send-otp'],
    url: '/Authentication/OtpRequest',
    method: 'POST',
    onSuccess: 'کد تأیید با موفقیت ارسال شد',
    onError: 'ارسال کد ناموفق بود',
  });
};
