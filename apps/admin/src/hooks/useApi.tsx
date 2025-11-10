import toast from 'react-hot-toast';

import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiError {
    message: string;
    status?: number;
}

interface UseApiOptions<TVariables> {
    key: QueryKey;
    url: string | ((data?: TVariables) => string);
    method?: HttpMethod;
    onSuccess?: string;
    onError?: string;
    enabled?: boolean;
}

async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
    const baseUrl = process.env['NEXT_PUBLIC_API_BASE_URL'];
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${baseUrl}${url}`, {
        headers,
        ...options,
    });

    if (response.status === 401) {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_role');
            toast.error('دسترسی منقضی شده، لطفاً دوباره وارد شوید');
            window.location.href = '/';
        }
        throw { message: 'Unauthorized', status: 401 } as ApiError;
    }

    if (!response.ok) {
        const error: ApiError = {
            message: `خطا: ${response.status}`,
            status: response.status,
        };
        throw error;
    }

    if (response.status === 204) return null as T;

    return response.json();
}

export function useApi<TData = unknown, TVariables = void>({
    key,
    url,
    method = 'GET',
    onSuccess = 'موفق',
    onError = 'خطا رخ داد',
    enabled = true,
}: UseApiOptions<TVariables>) {
    const queryClient = useQueryClient();

    const query = useQuery<TData, ApiError>({
        queryKey: key,
        queryFn: () => {
            const endpoint = typeof url === 'function' ? url() : url;
            return fetchApi<TData>(endpoint);
        },
        enabled: method === 'GET' && enabled,
    });

    const mutation = useMutation<TData, ApiError, TVariables>({
        mutationFn: async (data?: TVariables) => {
            const endpoint = typeof url === 'function' ? url(data) : url;
            return fetchApi<TData>(endpoint, {
                method,
                body: data ? JSON.stringify(data) : undefined,
            });
        },
        onSuccess: () => {
            toast.success(onSuccess);
            queryClient.invalidateQueries({ queryKey: key });
        },
        onError: (error) => {
            toast.error(error.message || onError);
        },
    });

    const shouldUseMutation = method !== 'GET' || !enabled;

    const noop = () => { };
    const noopAsync = async () => undefined as unknown as TData;

    return {
        data: method === 'GET' ? query.data : undefined,
        refetch: method === 'GET' ? query.refetch : undefined,

        mutate: shouldUseMutation ? mutation.mutate : noop,
        mutateAsync: shouldUseMutation ? mutation.mutateAsync : noopAsync,

        loading: method === 'GET' && enabled ? query.isLoading : mutation.isPending,
        error: method === 'GET' && enabled ? query.error : mutation.error,
    };
}