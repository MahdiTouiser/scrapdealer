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
}

async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
    const baseUrl = process.env['NEXT_PUBLIC_API_BASE'];

    const response = await fetch(`${baseUrl}${url}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });

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

export function useApi<TData = unknown, TVariables = unknown>({
    key,
    url,
    method = 'GET',
    onSuccess = 'موفق',
    onError = 'خطا رخ داد',
}: UseApiOptions<TVariables>) {
    const queryClient = useQueryClient();

    const query = useQuery<TData, ApiError>({
        queryKey: key,
        queryFn: () => {
            const endpoint = typeof url === 'function' ? url() : url;
            return fetchApi<TData>(endpoint);
        },
        enabled: method === 'GET',
    });

    const mutation = useMutation<TData, ApiError, TVariables>({
        mutationFn: async (data: TVariables) => {
            const endpoint = typeof url === 'function' ? url(data) : url;
            return fetchApi<TData>(endpoint, {
                method,
                body: JSON.stringify(data),
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

    const noop = () => { };
    const noopAsync = async () => undefined as unknown as TData;

    return {
        data: method === 'GET' ? query.data : undefined,
        refetch: method === 'GET' ? query.refetch : undefined,

        mutate: method === 'GET' ? noop : mutation.mutate,
        mutateAsync: method === 'GET' ? noopAsync : mutation.mutateAsync,

        loading: method === 'GET' ? query.isLoading : mutation.isPending,
        error: method === 'GET' ? query.error : mutation.error,
    };
}
