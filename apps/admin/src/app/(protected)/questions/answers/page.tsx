'use client';

import { useState } from 'react';

import ConfirmationModal from '@/components/common/ConfirmationModal';
import CustomFormModal, {
  FormField,
} from '@/components/common/CustomFormModal';
import PageTitle from '@/components/common/PageTitle';
import DataGrid from '@/components/DataGrid';
import { useApi } from '@/hooks/useApi';
import { Box } from '@mui/material';

interface SubmittedAnswer {
    id: string;
    user: string;
    group: 'خریداران' | 'فروشندگان' | 'پشتیبان‌ها';
    question: string;
    answer: string;
    date: string;
}

const SubmittedAnswers: React.FC = () => {
    const [editOpen, setEditOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<SubmittedAnswer | null>(null);

    const { data: answers, loading, refetch } = useApi<{ data: SubmittedAnswer[]; totalCount: number }>({
        key: ['submitted-answers'],
        url: '/SubmittedAnswers',
    });

    const { mutate: updateAnswer, loading: updating } = useApi<void, Partial<SubmittedAnswer> & { id: string }>({
        key: ['update-answer'],
        url: data => `/SubmittedAnswers/${data.id}`,
        method: 'PUT',
        onError: 'ویرایش پاسخ با خطا مواجه شد',
        onSuccess: 'پاسخ با موفقیت ویرایش شد',
    });

    const { mutate: deleteAnswer, loading: deleting } = useApi<void, string>({
        key: ['delete-answer'],
        url: id => `/SubmittedAnswers/${id}`,
        method: 'DELETE',
        onError: 'حذف پاسخ با خطا مواجه شد',
        onSuccess: 'پاسخ با موفقیت حذف شد',
    });

    const handleEdit = (answer: SubmittedAnswer) => {
        setSelectedAnswer(answer);
        setEditOpen(true);
    };

    const handleDelete = (id: string) => {
        setSelectedAnswer({ id } as SubmittedAnswer);
        setConfirmOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedAnswer) return;
        await deleteAnswer(selectedAnswer.id, {
            onSuccess: () => {
                setConfirmOpen(false);
                setSelectedAnswer(null);
                refetch();
            },
            onError: () => setConfirmOpen(false),
        });
    };

    const formFields: FormField[] = [
        { name: 'answer', label: 'پاسخ', required: true },
    ];

    const getDefaultValues = () => {
        if (selectedAnswer) return { answer: selectedAnswer.answer || '' };
        return {};
    };

    const columnDefs = [
        { field: 'id', headerName: 'شناسه', maxWidth: 100 },
        { field: 'user', headerName: 'کاربر', flex: 1 },
        { field: 'group', headerName: 'گروه', flex: 1 },
        { field: 'question', headerName: 'پرسش', flex: 2 },
        { field: 'answer', headerName: 'پاسخ', flex: 2 },
        { field: 'date', headerName: 'تاریخ', flex: 1 },
        {
            headerName: 'عملیات',
            flex: 1,
            valueGetter: () => '',
            cellRenderer: (params: any) => (
                <Box display="flex" gap={1}>
                    <Box
                        component="span"
                        sx={{
                            p: '2px 8px',
                            bgcolor: 'primary.main',
                            color: '#fff',
                            borderRadius: 1,
                            cursor: 'pointer',
                        }}
                        onClick={() => handleEdit(params.data)}
                    >
                        ویرایش
                    </Box>
                    <Box
                        component="span"
                        sx={{
                            p: '2px 8px',
                            bgcolor: 'error.main',
                            color: '#fff',
                            borderRadius: 1,
                            cursor: 'pointer',
                        }}
                        onClick={() => handleDelete(params.data.id)}
                    >
                        حذف
                    </Box>
                </Box>
            ),
        },
    ];

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <PageTitle title="پاسخ‌های ثبت شده" />

            <DataGrid<SubmittedAnswer>
                rowData={answers?.data || []}
                columnDefs={columnDefs}
                loading={loading}
            />

            <CustomFormModal
                open={editOpen}
                onClose={() => setEditOpen(false)}
                title="ویرایش پاسخ"
                defaultValues={getDefaultValues()}
                fields={formFields}
                onSubmit={async data => {
                    if (!selectedAnswer) return;
                    await updateAnswer({ id: selectedAnswer.id, ...data }, {
                        onSuccess: () => {
                            setEditOpen(false);
                            setSelectedAnswer(null);
                            refetch();
                        },
                    });
                }}
                submitLabel="ویرایش"
                cancelLabel="لغو"
                submitLoading={updating}
            />

            <ConfirmationModal
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={confirmDelete}
                message="آیا از حذف این پاسخ اطمینان دارید؟"
                confirmLabel="حذف"
                cancelLabel="لغو"
                loading={deleting}
            />
        </Box>
    );
};

export default SubmittedAnswers;
