import toast from 'react-hot-toast';

import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface ApiError {
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
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (token) headers['Authorization'] = `Bearer ${token}`

    const response = await fetch(`${baseUrl}${url}`, { headers, ...options })

    if (response.status === 401) {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token')
            localStorage.removeItem('user_role')
            toast.error('دسترسی منقضی شده، لطفاً دوباره وارد شوید')
            window.location.href = '/'
        }
        throw { message: 'Unauthorized', status: 401 } as ApiError
    }

    if (!response.ok) {
        let errorMessage = `خطا: ${response.status}`
        try {
            const contentType = response.headers.get('content-type')
            if (contentType && contentType.includes('application/json')) {
                const errorData = await response.json()
                errorMessage =
                    errorData.message ||
                    errorData.error ||
                    errorData.Message ||
                    errorData.Error ||
                    errorMessage
            } else {
                const textError = await response.text()
                if (textError) errorMessage = textError
            }
        } catch (e) { }
        const error: ApiError = { message: errorMessage, status: response.status }
        throw error
    }

    if (response.status === 204) return null as T

    const contentType = response.headers.get('content-type')

    if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text()
        return (text || null) as T
    }

    let jsonResponse = await response.json()

    if (jsonResponse?.data?.data) jsonResponse = jsonResponse.data
    while (jsonResponse && typeof jsonResponse === 'object' && 'data' in jsonResponse && Object.keys(jsonResponse).length === 1) {
        jsonResponse = jsonResponse.data
    }

    return jsonResponse as T
}

export function useApi<TData = unknown, TVariables = void>({
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
            return fetchApi<TData>(endpoint, {
                method,
                body:
                    vars && method !== 'GET' && method !== 'DELETE'
                        ? JSON.stringify(vars)
                        : undefined,
            })
        },
    })

    const shouldUseMutation = method !== 'GET'

    const mutate = shouldUseMutation
        ? (variables?: TVariables, callbacks?: { onSuccess?: (d: TData) => void; onError?: (e: any) => void }) =>
            mutation.mutate(variables, {
                onSuccess: (data) => {
                    queryClient.invalidateQueries({ queryKey: key })
                    if (onSuccess) toast.success(onSuccess)
                    callbacks?.onSuccess?.(data)
                },
                onError: (err) => {
                    toast.error(err.message || onError)
                    callbacks?.onError?.(err)
                },
            })
        : () => { }

    const mutateAsync = shouldUseMutation
        ? async (variables?: TVariables) => {
            try {
                const data = await mutation.mutateAsync(variables)
                queryClient.invalidateQueries({ queryKey: key })
                if (onSuccess) toast.success(onSuccess)
                return data
            } catch (err: any) {
                toast.error(err.message || onError)
                throw err
            }
        }
        : async () => undefined as unknown as TData

    const fetchManually = method === 'GET' && !enabled
        ? async (vars?: TVariables) => {
            try {
                const endpoint = typeof url === 'function' ? url(vars) : url
                const data = await fetchApi<TData>(endpoint)
                if (onSuccess) toast.success(onSuccess)
                return data
            } catch (err: any) {
                toast.error(err.message || onError)
                throw err
            }
        }
        : undefined

    return {
        data: method === 'GET' ? query.data : undefined,
        refetch: method === 'GET' ? query.refetch : undefined,
        mutate,
        mutateAsync,
        fetchManually,
        loading: method === 'GET' && enabled ? query.isLoading : mutation.isPending,
        error: method === 'GET' && enabled ? query.error : mutation.error,
    }
}