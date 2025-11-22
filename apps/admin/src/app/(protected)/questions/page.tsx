'use client';

import { useState } from 'react';

import ConfirmationModal from '@/components/common/ConfirmationModal';
import CustomFormModal, {
    FormField,
} from '@/components/common/CustomFormModal';
import PageTitle from '@/components/common/PageTitle';
import UsersQuestionsTable, {
    UserQuestion,
} from '@/components/questions/UsersQuestionsTable';
import { useApi } from '@/hooks/useApi';
import { Box } from '@mui/material';

const UsersQuestionsPage = () => {
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [editingQuestion, setEditingQuestion] = useState<UserQuestion | null>(null);

    const { data: questions, loading, refetch: refetchQuestions } = useApi<{ data: UserQuestion[]; totalCount: number }>({
        key: ['get-questions'],
        url: '/Questions',
    });

    const { mutate: updateQuestion, loading: updating } = useApi<void, Partial<UserQuestion> & { id: string }>({
        key: ['update-question'],
        url: (data) => `/Questions/${data?.id}`,
        method: 'PUT',
        onError: 'ویرایش پاسخ با خطا مواجه شد',
        onSuccess: 'پاسخ با موفقیت ثبت شد',
    });

    const { mutate: deleteQuestion, loading: deleting } = useApi<void, string>({
        key: ['delete-question'],
        url: (id) => `/Questions/${id}`,
        method: 'DELETE',
        onError: 'حذف پرسش با خطا مواجه شد',
        onSuccess: 'پرسش با موفقیت حذف شد',
    });

    const handleEdit = (question: UserQuestion) => {
        setEditingQuestion(question);
        setOpen(true);
    };

    const handleDelete = (id: string) => {
        setSelectedId(id);
        setConfirmOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedId) return;
        await deleteQuestion(selectedId, {
            onSuccess: () => {
                setConfirmOpen(false);
                setSelectedId(null);
                refetchQuestions();
            },
            onError: () => setConfirmOpen(false),
        });
    };

    const handleClose = () => {
        setOpen(false);
        setEditingQuestion(null);
    };

    const formFields: FormField[] = [
        { name: 'answer', label: 'پاسخ', required: true },
    ];

    const getDefaultValues = () => ({
        answer: editingQuestion?.answer || '',
    });

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <PageTitle title="پرسش‌ها و پاسخ‌ها" />

            <UsersQuestionsTable
                data={questions?.data || []}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <CustomFormModal
                open={open}
                onClose={handleClose}
                title="ثبت پاسخ"
                defaultValues={getDefaultValues()}
                fields={formFields}
                onSubmit={async (data) => {
                    if (!editingQuestion) return;
                    await updateQuestion({ id: editingQuestion.id, ...data }, {
                        onSuccess: () => {
                            handleClose();
                            refetchQuestions();
                        },
                    });
                }}
                submitLabel="ثبت"
                cancelLabel="لغو"
                submitLoading={updating}
            />

            <ConfirmationModal
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={confirmDelete}
                message="آیا از حذف این پرسش اطمینان دارید؟"
                confirmLabel="حذف"
                cancelLabel="لغو"
                loading={deleting}
            />
        </Box>
    );
};

export default UsersQuestionsPage;
