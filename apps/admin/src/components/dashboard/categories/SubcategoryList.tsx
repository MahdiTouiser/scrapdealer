'use client';

import {
  useEffect,
  useState,
} from 'react';

import { SubCat } from '@/components/types';
import { useApi } from '@/hooks/useApi';
import { useFileApi } from '@/hooks/useFileApi';
import AddCircleOutlineRoundedIcon
  from '@mui/icons-material/AddCircleOutlineRounded';
import {
  Avatar,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import SubcategoryItem from './SubcategoryItem';

interface Props {
    categoryId: string
    onSuccess: () => void
}

const formatNumber = (value: string): string => {
    const num = value.replace(/[^\d]/g, '')
    if (!num) return ''
    return Number(num).toLocaleString('en-US')
}

const parseNumber = (value: string): number => {
    return Number(value.replace(/[^\d]/g, ''))
}

export default function SubcategoryList({ categoryId, onSuccess }: Props) {
    const [newSub, setNewSub] = useState({
        name: '',
        minPrice: '',
        maxPrice: '',
        image: null as File | null,
    })

    const { data: subRes, refetch: refetchSubs } = useApi<{ data: SubCat[] }>({
        key: ['subcategories', categoryId],
        url: `/subcategories?categoryId=${categoryId}`,
    })

    const subcategories = (subRes?.data ?? []).filter(
        (sub) => String(sub.parentCategoryId) === String(categoryId)
    )

    const createSub = useApi<SubCat>({
        key: ['createSub'],
        url: '/subcategories',
        method: 'POST',
        onSuccess: 'زیر دسته اضافه شد',
    })

    const { upload, download } = useFileApi()
    const [uploadingImage, setUploadingImage] = useState(false)
    const [uploadedImageId, setUploadedImageId] = useState<string | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const handleImageChange = async (file: File) => {
        setUploadingImage(true)
        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('category', file)

            const id = await upload.mutateAsync(formData)
            setUploadedImageId(id)

            const blob = await download(id, 'subCategories')
            const url = URL.createObjectURL(blob)
            setPreviewUrl(url)
        } catch (err) { }
        setUploadingImage(false)
    }

    const handleAdd = async () => {
        if (!newSub.name || !newSub.minPrice || !newSub.maxPrice) return

        const minPrice = parseNumber(newSub.minPrice)
        const maxPrice = parseNumber(newSub.maxPrice)

        await createSub.mutateAsync({
            name: newSub.name,
            minPrice,
            maxPrice,
            categoryId,
            parentCategoryId: categoryId,
            images: uploadedImageId ? [uploadedImageId] : [],
        })

        setNewSub({ name: '', minPrice: '', maxPrice: '', image: null })
        setUploadedImageId(null)
        setPreviewUrl(null)
        refetchSubs()
        onSuccess?.()
    }

    useEffect(() => {
        refetchSubs()
    }, [categoryId, refetchSubs])

    return (
        <Stack spacing={2}>
            {subcategories.map((sub) => (
                <SubcategoryItem
                    key={sub.id}
                    subcategory={sub}
                    onSuccess={() => {
                        refetchSubs()
                        onSuccess?.()
                    }}
                />
            ))}

            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    border: '2px dashed',
                    borderColor: 'primary.main',
                }}
            >
                <Typography
                    variant="caption"
                    color="primary"
                    fontWeight={600}
                    mb={1}
                    display="block"
                >
                    افزودن زیر دسته جدید
                </Typography>

                <Stack direction="row" spacing={2} alignItems="center">
                    <TextField
                        label="نام زیر دسته"
                        size="small"
                        value={newSub.name}
                        onChange={(e) => setNewSub({ ...newSub, name: e.target.value })}
                        sx={{ minWidth: 180 }}
                    />
                    <TextField
                        label="حداقل (تومان)"
                        size="small"
                        value={newSub.minPrice}
                        onChange={(e) =>
                            setNewSub({ ...newSub, minPrice: formatNumber(e.target.value) })
                        }
                        sx={{ width: 130 }}
                        inputProps={{ inputMode: 'numeric' }}
                    />
                    <TextField
                        label="حداکثر (تومان)"
                        size="small"
                        value={newSub.maxPrice}
                        onChange={(e) =>
                            setNewSub({ ...newSub, maxPrice: formatNumber(e.target.value) })
                        }
                        sx={{ width: 130 }}
                        inputProps={{ inputMode: 'numeric' }}
                    />

                    <Button
                        variant="outlined"
                        component="label"
                        size="small"
                        sx={{ minWidth: 130 }}
                    >
                        {uploadingImage
                            ? 'در حال آپلود...'
                            : uploadedImageId
                                ? 'تصویر انتخاب شد'
                                : 'انتخاب تصویر'}
                        <input
                            hidden
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0] ?? null
                                setNewSub({ ...newSub, image: file })
                                if (file) handleImageChange(file)
                            }}
                        />
                    </Button>

                    {previewUrl && (
                        <Avatar
                            src={previewUrl}
                            variant="rounded"
                            sx={{ width: 40, height: 40 }}
                        />
                    )}

                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<AddCircleOutlineRoundedIcon />}
                        onClick={handleAdd}
                        disabled={
                            !newSub.name || !newSub.minPrice || !newSub.maxPrice || uploadingImage
                        }
                    >
                        افزودن
                    </Button>
                </Stack>
            </Paper>
        </Stack>
    )
}
