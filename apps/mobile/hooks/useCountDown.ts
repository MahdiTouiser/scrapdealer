import { useCallback, useEffect, useState } from 'react';

export const useCountdown = (initialSeconds: number) => {
  const [countdown, setCountdown] = useState(initialSeconds);

  useEffect(() => {
    if (countdown <= 0) return;

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  const restart = useCallback(() => {
    setCountdown(initialSeconds);
  }, [initialSeconds]);

  const reset = useCallback(() => {
    setCountdown(initialSeconds);
  }, [initialSeconds]);

  return {
    countdown,
    restart,
    reset,
    setCountdown,
  };
};
