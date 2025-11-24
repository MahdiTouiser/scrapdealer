import Toast from 'react-native-toast-message';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { QueryKey, useMutation, useQuery } from '@tanstack/react-query';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiError {
  message: string;
  status?: number;
}

interface UseApiOptions<TVariables = unknown> {
  key: QueryKey;
  url: string | ((data?: TVariables) => string);
  method?: HttpMethod;
  onSuccess?: string;
  onError?: string;
  enabled?: boolean;
}

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
  const token = await AsyncStorage.getItem('auth_token');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    headers,
    ...options,
  });

  if (response.status === 401) {
    await AsyncStorage.multiRemove(['auth_token', 'user_role']);
    Toast.show({
      type: 'error',
      text1: 'جلسه شما منقضی شده',
      text2: 'لطفاً دوباره وارد شوید',
    });
    throw { message: 'Unauthorized', status: 401 } as ApiError;
  }

  if (!response.ok) {
    let message = `خطا: ${response.status}`;
    try {
      const text = await response.text();
      if (text) {
        const json = JSON.parse(text);
        message = json.message || json.error || json.Message || json.Error || message;
      }
    } catch {}
    throw { message, status: response.status } as ApiError;
  }

  if (response.status === 204) return null as T;

  const text = await response.text();
  if (!text) return null as T;

  let data = JSON.parse(text);

  while (data && typeof data === 'object' && 'data' in data && Object.keys(data).length === 1) {
    data = data.data;
  }

  return data as T;
}

export function useApi<TData = unknown, TVariables = void>({ key, url, method = 'GET', onSuccess, onError = 'خطا در ارتباط با سرور', enabled = true }: UseApiOptions<TVariables>) {
  const query = useQuery<TData, ApiError>({
    queryKey: key,
    queryFn: () => fetchApi<TData>(typeof url === 'function' ? url() : url),
    enabled: method === 'GET' && enabled,
  });

  const mutation = useMutation<TData, ApiError, TVariables>({
    mutationFn: async (variables) => {
      const endpoint = typeof url === 'function' ? url(variables) : url;
      return fetchApi<TData>(endpoint, {
        method,
        body: variables && !['GET', 'DELETE'].includes(method) ? JSON.stringify(variables) : undefined,
      });
    },
  });

  const isMutation = method !== 'GET';

  return {
    data: !isMutation ? query.data : undefined,
    isLoading: !isMutation ? query.isLoading : false,
    isFetching: !isMutation ? query.isFetching : false,
    refetch: !isMutation ? query.refetch : undefined,

    mutate: isMutation
      ? (variables?: TVariables, options?: { onSuccess?: (data: TData) => void }) => {
          mutation.mutate(variables as TVariables, {
            onSuccess: (data) => {
              if (onSuccess) {
                Toast.show({ type: 'success', text1: onSuccess });
              }
              options?.onSuccess?.(data);
            },
            onError: (err) => {
              Toast.show({ type: 'error', text1: err.message || onError });
            },
          });
        }
      : () => {},

    mutateAsync: mutation.mutateAsync,

    isPending: mutation.isPending,
    error: query.error || mutation.error,
  };
}
