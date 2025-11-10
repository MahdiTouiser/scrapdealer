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
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${baseUrl}${url}`, { headers, ...options });

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
        // Try to parse error message from response
        let errorMessage = `خطا: ${response.status}`;
        try {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const errorData = await response.json();
                errorMessage = errorData.message || errorData.error || errorMessage;
            } else {
                const textError = await response.text();
                if (textError) errorMessage = textError;
            }
        } catch (e) {
            // If parsing fails, use default error message
        }
        const error: ApiError = { message: errorMessage, status: response.status };
        throw error;
    }

    if (response.status === 204) return null as T;

    // Check content type before parsing
    const contentType = response.headers.get('content-type');

    // If response is not JSON, return text or null
    if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        return (text || null) as T;
    }

    let jsonResponse = await response.json();

    // Normalize redundant data nesting
    if (jsonResponse?.data?.data) jsonResponse = jsonResponse.data;
    while (jsonResponse && typeof jsonResponse === 'object' && 'data' in jsonResponse && Object.keys(jsonResponse).length === 1) {
        jsonResponse = jsonResponse.data;
    }

    return jsonResponse as T;
}

export function useApi<TData = unknown, TVariables = void>({
    key,
    url,
    method = 'GET',
    onSuccess,
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
    });

    const shouldUseMutation = method !== 'GET' || !enabled;
    const noop = () => { };
    const noopAsync = async () => undefined as unknown as TData;

    return {
        data: method === 'GET' ? query.data : undefined,
        refetch: method === 'GET' ? query.refetch : undefined,
        mutate: shouldUseMutation
            ? (variables?: TVariables, callbacks?: { onSuccess?: (data: TData) => void; onError?: (err: any) => void }) =>
                mutation.mutate(variables, {
                    onSuccess: (data) => {
                        queryClient.invalidateQueries({ queryKey: key });
                        // Show success toast if message is provided
                        if (onSuccess) {
                            toast.success(onSuccess);
                        }
                        callbacks?.onSuccess?.(data);
                    },
                    onError: (err) => {
                        toast.error(err.message || onError);
                        callbacks?.onError?.(err);
                    },
                })
            : noop,
        mutateAsync: shouldUseMutation ? mutation.mutateAsync : noopAsync,
        loading: method === 'GET' && enabled ? query.isLoading : mutation.isPending,
        error: method === 'GET' && enabled ? query.error : mutation.error,
    };
}