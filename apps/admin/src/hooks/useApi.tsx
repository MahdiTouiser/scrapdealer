import toast from 'react-hot-toast';

import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface ApiError {
    message: string
    status?: number
}

interface UseApiOptions<TVariables> {
    key: QueryKey
    url: string | ((data?: TVariables) => string)
    method?: HttpMethod
    onSuccess?: string
    onError?: string
    enabled?: boolean
}

async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
    const baseUrl = process.env['NEXT_PUBLIC_API_BASE_URL']
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null

    const headers: Record<string, string> = {}

    if (token) headers['Authorization'] = `Bearer ${token}`

    if (!(options?.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json'
    }

    const response = await fetch(`${baseUrl}${url}`, {
        ...options,
        headers,
    })

    if (response.status === 401) {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token')
            localStorage.removeItem('user_role')
            toast.error('دسترسی منقضی شده، لطفاً دوباره وارد شوید')
            window.location.href = '/'
        }
        throw { message: 'Unauthorized', status: 401 }
    }

    if (!response.ok) {
        let errorMessage = `خطا: ${response.status}`
        try {
            const ct = response.headers.get('content-type')
            if (ct?.includes('application/json')) {
                const e = await response.json()
                errorMessage =
                    e.message ||
                    e.error ||
                    e.Message ||
                    e.Error ||
                    errorMessage
            } else {
                const t = await response.text()
                if (t) errorMessage = t
            }
        } catch {}
        throw { message: errorMessage, status: response.status }
    }

    if (response.status === 204) return null as T

    const ct = response.headers.get('content-type')

    if (!ct?.includes('application/json')) {
        return (await response.text()) as T
    }

    let json = await response.json()

    if (json?.data?.data) json = json.data
    while (json && typeof json === 'object' && 'data' in json && Object.keys(json).length === 1) {
        json = json.data
    }

    return json as T
}

export function useApi<TData = unknown, TVariables = unknown>({
    key,
    url,
    method = 'GET',
    onSuccess,
    onError = 'خطا رخ داد',
    enabled = true,
}: UseApiOptions<TVariables>) {
    const queryClient = useQueryClient()

    const query = useQuery<TData, ApiError>({
        queryKey: key,
        queryFn: () => {
            const endpoint = typeof url === 'function' ? url() : url
            return fetchApi<TData>(endpoint)
        },
        enabled: method === 'GET' && enabled,
    })

    const mutation = useMutation<TData, ApiError, TVariables>({
        mutationFn: async (vars?: TVariables) => {
            const endpoint = typeof url === 'function' ? url(vars) : url

            const body =
                vars && method !== 'GET' && method !== 'DELETE'
                    ? vars instanceof FormData
                        ? vars
                        : JSON.stringify(vars)
                    : undefined

            return fetchApi<TData>(endpoint, {
                method,
                body,
            })
        },
    })

    const mutate = method !== 'GET'
        ? (variables?: TVariables) =>
            mutation.mutate(variables, {
                onSuccess: (data) => {
                    queryClient.invalidateQueries({ queryKey: key })
                    if (onSuccess) toast.success(onSuccess)
                    return data
                },
                onError: (e) => {
                    toast.error(e.message || onError)
                },
            })
        : () => {}

    const mutateAsync = method !== 'GET'
        ? async (variables?: TVariables) => {
            try {
                const data = await mutation.mutateAsync(variables)
                queryClient.invalidateQueries({ queryKey: key })
                if (onSuccess) toast.success(onSuccess)
                return data
            } catch (e: any) {
                toast.error(e.message || onError)
                throw e
            }
        }
        : async () => undefined as unknown as TData

    return {
        data: method === 'GET' ? query.data : undefined,
        refetch: method === 'GET' ? query.refetch : undefined,
        mutate,
        mutateAsync,
        loading: method === 'GET' && enabled ? query.isLoading : mutation.isPending,
        error: method === 'GET' && enabled ? query.error : mutation.error,
    }
}
