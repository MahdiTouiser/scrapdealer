import {
  useEffect,
  useState,
} from 'react';

import { Cat } from '@/components/types';
import { useFileApi } from '@/hooks/useFileApi';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Chip,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';

import CategoryHeader from './CategoryHeader';
import SubcategoryList from './SubcategoryList';

interface Props {
    category: Cat
    index: number
    onSuccess: () => void
}

export default function CategoryItem({ category, index, onSuccess }: Props) {
    const [expanded, setExpanded] = useState(false)
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [loadingImage, setLoadingImage] = useState(false)

    const { download } = useFileApi()


    const firstImageId = category.images?.[0] ?? null

    useEffect(() => {
        if (!firstImageId) return

        let url: string | null = null

        const loadImage = async () => {
            setLoadingImage(true)
            const blob = await download(firstImageId, 'categories')
            url = URL.createObjectURL(blob)
            setImageUrl(url)
            setLoadingImage(false)
        }

        loadImage()

        return () => {
            if (url) URL.revokeObjectURL(url)
        }
    }, [firstImageId, download])

    return (
        <Accordion
            expanded={expanded}
            onChange={(_, isExpanded) => setExpanded(isExpanded)}
            elevation={1}
            sx={{
                borderRadius: 2,
                '&:before': { display: 'none' },
                border: '1px solid',
                borderColor: 'divider',
            }}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Stack direction="row" spacing={2} alignItems="center" flex={1}>
                    <Chip label={index} size="small" color="primary" />

                    {loadingImage ? (
                        <Skeleton variant="circular" width={40} height={40} />
                    ) : imageUrl ? (
                        <Avatar
                            src={imageUrl}
                            variant="rounded"
                            sx={{ width: 40, height: 40 }}
                        />
                    ) : (
                        <Avatar
                            variant="rounded"
                            sx={{ width: 40, height: 40, bgcolor: 'grey.200' }}
                        >
                            <ImageRoundedIcon fontSize="small" />
                        </Avatar>
                    )}

                    <Typography fontWeight={500}>{category.name}</Typography>
                </Stack>
            </AccordionSummary>

            <AccordionDetails sx={{ bgcolor: 'grey.50' }}>
                <CategoryHeader category={category} onSuccess={onSuccess} />
                <Typography variant="subtitle2" mb={2} fontWeight={600} color="text.secondary">
                    زیر دسته‌ها ({category.subCategories.length})
                </Typography>
                <SubcategoryList categoryId={category.id} onSuccess={onSuccess} />
            </AccordionDetails>
        </Accordion>
    )
}
