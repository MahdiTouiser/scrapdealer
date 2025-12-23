import { useCallback } from 'react';

import { useApi } from '@/hooks/useApi';

export function useFileApi() {
    const upload = useApi<string, FormData>({
        key: ['file-upload'],
        url: '/Files',
        method: 'POST',
        onSuccess: 'فایل با موفقیت آپلود شد',
    })

    const download = useCallback(async (id: string, folder: string = 'users') => {
        const baseUrl = process.env['NEXT_PUBLIC_API_BASE_URL']
        const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null

        const headers: Record<string, string> = {}
        if (token) headers['Authorization'] = `Bearer ${token}`

        const res = await fetch(`${baseUrl}/Files/${folder}/${id}`, { headers })
        if (!res.ok) throw new Error('خطا در دانلود فایل')

        return await res.blob()
    }, [])

    return {
        upload,
        download,
    }
}
