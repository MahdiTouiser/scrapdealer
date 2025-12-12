import { Cat } from '@/components/types';
import {
    Fade,
    Stack,
} from '@mui/material';

import CategoryItem from './CategoryItem';

interface Props {
    categories: Cat[];
    onSuccess: () => void;
}

export default function CategoryList({ categories, onSuccess }: Props) {
    return (
        <Stack spacing={2}>
            {categories.map((cat, idx) => (
                <Fade in key={cat.id}>
                    <div>
                        <CategoryItem category={cat} index={idx + 1} onSuccess={onSuccess} />
                    </div>
                </Fade>
            ))}
        </Stack>
    );
}
