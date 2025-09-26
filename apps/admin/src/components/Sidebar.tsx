'use client';

import React, { useState } from 'react';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import fa from '@/i18n/fa';
import { theme } from '@/theme';
import {
  Category,
  ChevronLeft,
  ChevronRight,
  Dashboard as DashboardIcon,
  ExpandLess,
  ExpandMore,
  Logout,
  Person,
  Recycling,
  Settings,
  ShoppingCart,
  Store,
} from '@mui/icons-material';
import {
  Box,
  Collapse,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  keyframes,
  styled,
  ThemeProvider,
} from '@mui/material/styles';

const slideIn = keyframes`
  from { transform: translateX(20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const slideOut = keyframes`
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(20px); opacity: 0; }
`;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 2),
    minHeight: 64,
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    color: theme.palette.common.white,
    fontWeight: 700,
}));


const Sidebar: React.FC = () => {
    const [open, setOpen] = useState(true);
    const [selectedItem, setSelectedItem] = useState<string>(fa.dashboard);
    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
        [fa.buyers]: true,
    });
    const router = useRouter();

    const handleDrawerToggle = () => setOpen(!open);

    const handleItemClick = (text: string, path?: string) => {
        setSelectedItem(text);
        if (path) {
            console.log(`Navigate to: ${path}`);
        }
    };

    const handleSectionToggle = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleLogout = () => {
        Cookies.remove("auth_token");
        router.push("/auth");
        toast.success(fa.successfulLogout);
    };

    const menuItems = [
        {
            section: fa.main,
            items: [
                { text: fa.dashboard, icon: <DashboardIcon />, path: '/' },
            ],
        },
        {
            section: fa.buyers,
            collapsible: true,
            items: [
                { text: 'لیست خریداران', icon: <ShoppingCart />, path: '/buyers' },
                { text: 'خریداران فعال', icon: <Person />, path: '/buyers/active' },
                { text: 'تنظیمات خریداران', icon: <Settings />, path: '/buyers/settings' },
            ],
        },
        {
            section: fa.sellers,
            collapsible: true,
            items: [
                { text: 'لیست فروشندگان', icon: <Store />, path: '/sellers' },
                { text: 'فروشندگان فعال', icon: <Person />, path: '/sellers/active' },
                { text: 'تنظیمات فروشندگان', icon: <Settings />, path: '/sellers/settings' },
            ],
        },
        {
            section: fa.categories,
            collapsible: true,
            items: [
                { text: 'همه دسته‌ها', icon: <Category />, path: '/categories' },
                { text: 'مدیریت دسته‌ها', icon: <Settings />, path: '/categories/manage' },
            ],
        },
    ];

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex' }}>
                <Drawer
                    variant="permanent"
                    sx={{
                        width: open ? 280 : 80,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: {
                            width: open ? 280 : 80,
                            boxSizing: 'border-box',
                            background: theme.palette.common.white,
                            borderLeft: 'none',
                            boxShadow: '4px 0 24px rgba(0,0,0,0.08)',
                            transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
                            overflow: 'hidden',
                            overflowY: 'auto',
                            '&::-webkit-scrollbar': {
                                width: '6px',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: theme.palette.grey[100],
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: theme.palette.grey[400],
                                borderRadius: '3px',
                                '&:hover': {
                                    background: theme.palette.grey[500],
                                },
                            },
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            py: 3,
                            background: `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.grey[100]} 100%)`,
                            position: 'relative',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                bottom: 0,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: open ? '80%' : '60%',
                                height: '2px',
                                background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
                                transition: 'width 0.3s ease',
                            },
                        }}
                    >
                        <Box
                            sx={{
                                position: 'relative',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '50%',
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                    opacity: 0.1,
                                    animation: 'pulse 2s infinite',
                                },
                                '@keyframes pulse': {
                                    '0%, 100%': { transform: 'scale(1)', opacity: 0.1 },
                                    '50%': { transform: 'scale(1.1)', opacity: 0.2 },
                                },
                            }}
                        >
                            <Recycling sx={{ fontSize: 56, color: theme.palette.primary.main }} />
                        </Box>
                        {open && (
                            <Typography
                                variant="h5"
                                sx={{
                                    mt: 1.5,
                                    fontWeight: 800,
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    textAlign: 'center',
                                    letterSpacing: '-0.5px',
                                }}
                            >
                                {fa.scrapDealer}
                            </Typography>
                        )}
                    </Box>

                    <DrawerHeader>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                opacity: open ? 1 : 0,
                                animation: open
                                    ? `${slideIn} 0.3s ease-in forwards`
                                    : `${slideOut} 0.3s ease-out forwards`,
                                visibility: open ? 'visible' : 'hidden',
                                fontWeight: 600,
                                fontSize: '1.1rem',
                            }}
                        >
                            {fa.dashboard}
                        </Typography>
                        <IconButton
                            onClick={handleDrawerToggle}
                            sx={{
                                color: theme.palette.common.white,
                                '&:hover': {
                                    background: 'rgba(255,255,255,0.15)',
                                },
                            }}
                        >
                            {open ? <ChevronRight /> : <ChevronLeft />}
                        </IconButton>
                    </DrawerHeader>

                    <Divider />

                    <List sx={{ px: 1, pt: 1 }}>
                        {menuItems.map((section) => (
                            <Box key={section.section} sx={{ mb: 1 }}>
                                {section.collapsible ? (
                                    <>
                                        {open && (
                                            <ListItemButton
                                                onClick={() => handleSectionToggle(section.section)}
                                                sx={{
                                                    borderRadius: 2,
                                                    px: 2,
                                                    py: 1,
                                                    mb: 0.5,
                                                    '&:hover': {
                                                        bgcolor: theme.palette.action.hover,
                                                    },
                                                }}
                                            >
                                                <Typography
                                                    variant="subtitle2"
                                                    sx={{
                                                        flex: 1,
                                                        color: theme.palette.primary.main,
                                                        fontWeight: 700,
                                                        fontSize: '0.9rem',
                                                        letterSpacing: '0.3px',
                                                    }}
                                                >
                                                    {section.section}
                                                </Typography>
                                                {expandedSections[section.section] ? (
                                                    <ExpandLess sx={{ color: theme.palette.primary.main }} />
                                                ) : (
                                                    <ExpandMore sx={{ color: theme.palette.primary.main }} />
                                                )}
                                            </ListItemButton>
                                        )}
                                        <Collapse in={open && (expandedSections[section.section] ?? false)} timeout="auto">
                                            <List disablePadding>
                                                {section.items.map((item) => (
                                                    <MenuItem
                                                        key={item.text}
                                                        item={item}
                                                        open={open}
                                                        selected={selectedItem === item.text}
                                                        onClick={() => handleItemClick(item.text, item.path)}
                                                    />
                                                ))}
                                            </List>
                                        </Collapse>
                                        {!open && section.items.map((item) => (
                                            <MenuItem
                                                key={item.text}
                                                item={item}
                                                open={open}
                                                selected={selectedItem === item.text}
                                                onClick={() => handleItemClick(item.text, item.path)}
                                            />
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        {open && (
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    px: 2,
                                                    pt: 2,
                                                    pb: 1,
                                                    color: theme.palette.primary.main,
                                                    fontWeight: 700,
                                                    fontSize: '0.9rem',
                                                    letterSpacing: '0.3px',
                                                }}
                                            >
                                                {section.section}
                                            </Typography>
                                        )}
                                        {section.items.map((item) => (
                                            <MenuItem
                                                key={item.text}
                                                item={item}
                                                open={open}
                                                selected={selectedItem === item.text}
                                                onClick={() => handleItemClick(item.text, item.path)}
                                            />
                                        ))}
                                    </>
                                )}
                            </Box>
                        ))}
                    </List>

                    <Box sx={{ flexGrow: 1 }} />

                    <Box sx={{ p: 1, borderTop: `2px solid ${theme.palette.grey[200]}`, background: theme.palette.grey[50] }}>
                        <Tooltip title={!open ? fa.logout : ''} placement="right" arrow>
                            <ListItemButton
                                sx={{
                                    borderRadius: 2,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2,
                                    py: 1.5,
                                    '&:hover': {
                                        bgcolor: theme.palette.error.light + '1A',
                                        transform: 'translateX(-2px)',
                                    },
                                    transition: 'all 0.25s ease',
                                }}
                                onClick={handleLogout}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 2 : 'auto',
                                        justifyContent: 'center',
                                        color: theme.palette.error.main,
                                    }}
                                >
                                    <Logout />
                                </ListItemIcon>
                                <ListItemText
                                    primary={fa.logout}
                                    sx={{
                                        opacity: open ? 1 : 0,
                                        visibility: open ? 'visible' : 'hidden',
                                        '& .MuiTypography-root': {
                                            fontWeight: 600,
                                            color: theme.palette.error.main,
                                        },
                                    }}
                                />
                            </ListItemButton>
                        </Tooltip>
                    </Box>
                </Drawer>
            </Box>
        </ThemeProvider>
    );
};

const MenuItem: React.FC<{
    item: { text: string; icon: React.ReactNode; path?: string };
    open: boolean;
    selected: boolean;
    onClick: () => void;
}> = ({ item, open, selected, onClick }) => (
    <Tooltip title={!open ? item.text : ''} placement="right" arrow>
        <ListItem disablePadding sx={{ my: 0.5 }}>
            <ListItemButton
                selected={selected}
                onClick={onClick}
                sx={{
                    minHeight: 48,
                    borderRadius: 2,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2,
                    mx: 0.5,
                    bgcolor: selected ? theme.palette.action.selected : 'transparent',
                    borderRight: selected ? `3px solid ${theme.palette.primary.main}` : '3px solid transparent',
                    '&:hover': {
                        bgcolor: theme.palette.action.hover,
                        transform: 'translateX(-4px)',
                        borderRight: `3px solid ${theme.palette.primary.main}`,
                    },
                    transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
                }}
            >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 2 : 'auto',
                        justifyContent: 'center',
                        color: selected ? theme.palette.primary.main : theme.palette.text.secondary,
                        transform: selected ? 'scale(1.1)' : 'scale(1)',
                        transition: 'all 0.2s ease',
                    }}
                >
                    {item.icon}
                </ListItemIcon>
                <ListItemText
                    primary={item.text}
                    sx={{
                        opacity: open ? 1 : 0,
                        visibility: open ? 'visible' : 'hidden',
                        transition: 'opacity 0.3s ease',
                        '& .MuiTypography-root': {
                            fontWeight: selected ? 600 : 400,
                            fontSize: '0.95rem',
                            color: selected ? theme.palette.primary.main : theme.palette.text.primary,
                        },
                    }}
                />
            </ListItemButton>
        </ListItem>
    </Tooltip>
);

export default Sidebar;