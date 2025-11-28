'use client';

import { useState } from 'react';

import AddButton from '@/components/common/AddButton';
import ConfirmationModal from '@/components/common/ConfirmationModal';
import CustomFormModal, {
  FormField,
} from '@/components/common/CustomFormModal';
import PageTitle from '@/components/common/PageTitle';
import NewsTable, { News } from '@/components/news/NewsTable';
import { useApi } from '@/hooks/useApi';
import fa from '@/i18n/fa';
import {
  Box,
  CircularProgress,
} from '@mui/material';

const NewsPage = () => {
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [editingNews, setEditingNews] = useState<News | null>(null);
    const [fetchingEdit, setFetchingEdit] = useState(false);

    const { data: news, loading, refetch: refetchNews } =
        useApi<{ data: News[]; totalCount: number }>({ key: ['get-news'], url: '/News' });

    const { mutate: addNews, loading: adding } = useApi<void, { title: string; summary: string; content: string }>({
        key: ['add-news'],
        url: '/News',
        method: 'POST',
        onError: 'افزودن خبر با خطا مواجه شد',
        onSuccess: 'خبر با موفقیت اضافه شد',
    });

    const { mutate: updateNews, loading: updating } = useApi<void, { id: string; title: string; summary: string; content: string }>({
        key: ['update-news'],
        url: (data) => `/News/${data?.id}`,
        method: 'PUT',
        onError: 'ویرایش خبر با خطا مواجه شد',
        onSuccess: 'خبر با موفقیت ویرایش شد',
    });

    const { mutate: deleteNews, loading: deleting } = useApi<void, string>({
        key: ['delete-news'],
        url: (id) => `/News/${id}`,
        method: 'DELETE',
        onError: 'حذف خبر با خطا مواجه شد',
        onSuccess: 'خبر با موفقیت حذف شد',
    });

    const { fetchManually: fetchNewsById } = useApi<News, string>({
        key: ['get-news-by-id'],
        url: (id) => `/News/${id}`,
        method: 'GET',
        enabled: false,
    });

    const formFields: FormField[] = [
        { name: 'title', label: 'عنوان', fieldType: 'text', required: true },
        { name: 'summary', label: 'خلاصه', fieldType: 'text', required: true },
        { name: 'content', label: 'متن خبر', fieldType: 'textarea', required: true },
    ];

    const handleOpenAdd = () => {
        setEditMode(false);
        setEditingNews(null);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditMode(false);
        setEditingNews(null);
        setFetchingEdit(false);
    };

    const handleAddNews = async (data: Record<string, any>) => {
        await addNews(
            { title: data['title'], summary: data['summary'], content: data['content'] },
            { onSuccess: () => { handleClose(); refetchNews(); } }
        );
    };

    const handleEdit = async (id: string) => {
        setEditMode(true);
        setFetchingEdit(true);
        setOpen(true);
        try {
            const newsItem = await fetchNewsById(id);
            setEditingNews(newsItem);
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setFetchingEdit(false);
        }
    };
    const handleDelete = (id: string) => {
        setSelectedId(id);
        setConfirmOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedId) return;
        await deleteNews(selectedId, {
            onSuccess: () => { setConfirmOpen(false); setSelectedId(null); refetchNews(); },
            onError: () => setConfirmOpen(false),
        });
    };

    const getDefaultValues = () => {
        if (!editMode || !editingNews) return {};
        return {
            title: editingNews.title,
            summary: editingNews.summary,
            content: editingNews.content,
        };
    };

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <PageTitle title={fa.news} />

            <Box display="flex" justifyContent="flex-start" mb={2}>
                <AddButton label={fa.addNews} onClick={handleOpenAdd} />
            </Box>

            <NewsTable
                data={news?.data || []}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <CustomFormModal
                open={open}
                onClose={handleClose}
                title={editMode ? 'ویرایش خبر' : 'افزودن خبر جدید'}
                defaultValues={getDefaultValues()}
                onSubmit={async (data) => {
                    if (editMode && editingNews) {
                        await updateNews(
                            { id: editingNews.id, title: data['title'], summary: data['summary'], content: data['content'] },
                            { onSuccess: () => { handleClose(); refetchNews(); } }
                        );
                    } else {
                        await handleAddNews(data);
                    }
                }}
                fields={formFields}
                submitLabel={editMode ? 'ویرایش' : 'افزودن'}
                cancelLabel="لغو"
                submitLoading={adding || updating || fetchingEdit}
            >
                {fetchingEdit && (
                    <Box display="flex" justifyContent="center" alignItems="center" p={3}>
                        <CircularProgress />
                    </Box>
                )}
            </CustomFormModal>

            <ConfirmationModal
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={confirmDelete}
                message="آیا از حذف این خبر اطمینان دارید؟"
                confirmLabel="حذف"
                cancelLabel="لغو"
                loading={deleting}
            />
        </Box>
    );
};

export default NewsPage;
