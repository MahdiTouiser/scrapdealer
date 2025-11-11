'use client';

import React from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
    Button,
    Stack,
    Tooltip,
} from '@mui/material';

interface ActionsCellProps {
    data: any;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

const ActionsCell: React.FC<ActionsCellProps> = ({ data, onEdit, onDelete }) => {
    const id = data?.id;

    return (
        <Stack
            direction="row"
            spacing={1}
            sx={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}
        >
            <Tooltip title="نمایش جزئیات" arrow>
                <Button
                    size="small"
                    variant="outlined"
                    onClick={() => onEdit?.(id)}
                    sx={{ minWidth: 0, p: 1, borderRadius: '8px' }}
                >
                    <VisibilityIcon fontSize="small" />
                </Button>
            </Tooltip>

            <Tooltip title="حذف" arrow>
                <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={() => onDelete?.(id)}
                    sx={{ minWidth: 0, p: 1, borderRadius: '8px' }}
                >
                    <DeleteIcon fontSize="small" />
                </Button>
            </Tooltip>
        </Stack>
    );
};

export default ActionsCell;
