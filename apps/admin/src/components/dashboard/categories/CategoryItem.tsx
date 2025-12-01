import { useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Stack,
  Typography,
} from '@mui/material';

import CategoryHeader from './CategoryHeader';
import SubcategoryList from './SubcategoryList';
import { Cat } from './types';

interface Props {
    category: Cat;
    index: number;
    onSuccess: () => void;
}

export default function CategoryItem({ category, index, onSuccess }: Props) {
    const [expanded, setExpanded] = useState(false);

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
    );
}
