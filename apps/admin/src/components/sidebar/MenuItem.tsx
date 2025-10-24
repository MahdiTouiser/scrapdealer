'use client';

import React from 'react';

import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Tooltip,
    useTheme,
} from '@mui/material';

import { MenuItemProps } from '../types';
import { glow } from './Sidebar';

const MenuItem: React.FC<MenuItemProps> = ({ item, open, selected, component, href }) => {
    const theme = useTheme();

    return (
        <Tooltip title={!open ? item.text : ''} placement="right" arrow>
            <ListItem disablePadding sx={{ my: 0.5 }}>
                <ListItemButton
                    component={component ?? 'a'}
                    href={href}
                    selected={selected}
                    sx={{
                        minHeight: 48,
                        borderRadius: 2,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2,
                        mx: 0.5,
                        bgcolor: selected
                            ? theme.palette.mode === 'dark'
                                ? theme.palette.primary.dark + '40'
                                : theme.palette.primary.light + '33'
                            : 'transparent',
                        borderRight: selected
                            ? `3px solid ${theme.palette.primary.main}`
                            : '3px solid transparent',
                        '&:hover': {
                            bgcolor: theme.palette.action.hover,
                            borderRight: `3px solid ${theme.palette.primary.main}`,
                            animation: `${glow} 1.5s infinite`,
                        },
                        transition: 'all 0.2s ease',
                    }}
                    aria-label={item.text}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 2 : 'auto',
                            color: selected
                                ? theme.palette.primary.main
                                : theme.palette.text.secondary,
                            transform: selected ? 'scale(1.1)' : 'scale(1)',
                            transition: 'transform 0.2s ease',
                        }}
                    >
                        {item.icon}
                    </ListItemIcon>

                    <ListItemText
                        primary={item.text}
                        sx={{
                            opacity: open ? 1 : 0,
                            visibility: open ? 'visible' : 'hidden',
                            '& .MuiTypography-root': {
                                fontWeight: selected ? 600 : 400,
                                fontSize: '0.95rem',
                                color: selected
                                    ? theme.palette.primary.main
                                    : theme.palette.text.primary,
                                letterSpacing: '0.1px',
                            },
                        }}
                    />
                </ListItemButton>
            </ListItem>
        </Tooltip>
    );
};

export default MenuItem;
