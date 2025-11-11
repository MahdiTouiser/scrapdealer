'use client';

import React from 'react';

import AddIcon from '@mui/icons-material/Add';
import {
    Button,
    useTheme,
} from '@mui/material';

interface AddButtonProps {
    label?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    fullWidth?: boolean;
    disabled?: boolean;
}

const AddButton: React.FC<AddButtonProps> = ({
    label = 'افزودن',
    onClick,
    icon = <AddIcon />,
    fullWidth = false,
    disabled = false,
}) => {
    const theme = useTheme();
    const bgColor = theme.palette.primary.main;

    const textColor = theme.palette.text.primary;

    return (
        <Button
            variant="contained"
            onClick={onClick}
            fullWidth={fullWidth}
            disabled={disabled}
            endIcon={icon}
            sx={{
                borderRadius: 2,
                fontFamily: 'Vazirmatn',
                fontWeight: 500,
                px: 4,
                py: 1,
                textAlign: 'center',
                direction: 'rtl',
                backgroundColor: bgColor,
                color: textColor,
                boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
                gap: 1,
                '&:hover': {
                    backgroundColor: bgColor,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                },
            }}
        >
            {label}
        </Button>
    );
};

export default AddButton;
