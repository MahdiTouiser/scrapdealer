'use client';

import React, { useState } from 'react';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import fa from '@/i18n/fa';
import { theme } from '@/theme';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Logout,
  Person,
  Recycling,
  Settings,
} from '@mui/icons-material';
import {
  Box,
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
    ...theme.mixins.toolbar,
    background: 'linear-gradient(90deg, #0288d1 0%, #01579b 100%)',
    color: '#fff',
    fontWeight: 700,
}));

const Sidebar: React.FC = () => {
    const [open, setOpen] = useState(true);
    const [selectedItem, setSelectedItem] = useState<string | null>(fa.login.title);
    const router = useRouter();

    const handleLogout = () => {
        Cookies.remove("auth_token");
        router.push("/auth");
        toast.success('از سامانه با موفقیت خارج شدید')
    };

    const handleDrawerToggle = () => setOpen(!open);
    const handleItemClick = (text: string) => setSelectedItem(text);

    const menuItems = [
        {
            section: `${fa.main}`,
            items: [
                { text: fa.mainPage, icon: <Home />, path: '/' },
            ],
        },
        {
            section: `${fa.buyers}`,
            items: [
                { text: fa.login.title, icon: <Person />, path: '/profile' },
                { text: 'Settings', icon: <Settings />, path: '/settings' },
            ],
        },
        {
            section: `${fa.sellers}`,
            items: [
                { text: fa.login.title, icon: <Person />, path: '/profile' },
                { text: 'Settings', icon: <Settings />, path: '/settings' },
            ],
        },
        {
            section: `${fa.categories}`,
            items: [
                { text: fa.login.title, icon: <Person />, path: '/profile' },
                { text: 'Settings', icon: <Settings />, path: '/settings' },
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
                        width: open ? 260 : 80,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: {
                            width: open ? 260 : 80,
                            boxSizing: 'border-box',
                            background: '#ffffff',
                            borderLeft: 'none',
                            boxShadow: '2px 0 12px rgba(0,0,0,0.05)',
                            transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
                            overflow: 'hidden',
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            py: 2,
                            background: '#f5f5f5',
                        }}
                    >
                        <Recycling sx={{ fontSize: 48, color: '#0288d1' }} />
                        {open && (
                            <Typography
                                variant="h6"
                                sx={{
                                    mt: 1,
                                    fontWeight: 700,
                                    color: '#0288d1',
                                    textAlign: 'center',
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
                            }}
                        >
                            {fa.dashboard}
                        </Typography>
                        <IconButton onClick={handleDrawerToggle} sx={{ color: '#fff' }}>
                            {open ? <ChevronRight /> : <ChevronLeft />}
                        </IconButton>
                    </DrawerHeader>

                    <Divider />

                    <List sx={{ px: 1 }}>
                        {menuItems.map((section) => (
                            <Box key={section.section}>
                                {open && (
                                    <Typography
                                        variant="subtitle2"
                                        sx={{ px: 2, pt: 2, pb: 0.5, color: '#888', fontWeight: 600 }}
                                    >
                                        {section.section}
                                    </Typography>
                                )}

                                {section.items.map((item) => (
                                    <Tooltip
                                        key={item.text}
                                        title={!open ? item.text : ''}
                                        placement="right"
                                        arrow
                                    >
                                        <ListItem disablePadding sx={{ my: 0.5 }}>
                                            <ListItemButton
                                                selected={selectedItem === item.text}
                                                onClick={() => handleItemClick(item.text)}
                                                sx={{
                                                    minHeight: 48,
                                                    borderRadius: 2,
                                                    justifyContent: open ? 'initial' : 'center',
                                                    px: 2,
                                                    bgcolor:
                                                        selectedItem === item.text ? 'rgba(2,136,209,0.1)' : 'transparent',
                                                    '&:hover': {
                                                        bgcolor: 'rgba(2,136,209,0.1)',
                                                        transform: 'translateX(4px)',
                                                    },
                                                    transition: 'all 0.25s ease',
                                                }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        minWidth: 0,
                                                        mr: open ? 2 : 'auto',
                                                        justifyContent: 'center',
                                                        color: selectedItem === item.text ? '#0288d1' : '#666',
                                                        transform: selectedItem === item.text ? 'scale(1.1)' : 'none',
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
                                                            fontWeight: selectedItem === item.text ? 600 : 400,
                                                            fontSize: '1rem',
                                                        },
                                                    }}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    </Tooltip>
                                ))}
                            </Box>
                        ))}
                    </List>

                    <Box sx={{ flexGrow: 1 }} />

                    <Box sx={{ p: 1, borderTop: '1px solid #eee' }}>
                        <Tooltip title={!open ? `${fa.logout}` : ''} placement="right" arrow>
                            <ListItemButton
                                sx={{
                                    borderRadius: 2,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2,
                                    '&:hover': {
                                        bgcolor: 'rgba(244,67,54,0.1)',
                                    },
                                }}
                                onClick={handleLogout}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 2 : 'auto',
                                        justifyContent: 'center',
                                        color: '#f44336',
                                    }}
                                >
                                    <Logout />
                                </ListItemIcon>
                                <ListItemText
                                    primary={fa.logout}
                                    sx={{
                                        opacity: open ? 1 : 0,
                                        visibility: open ? 'visible' : 'hidden',
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

export default Sidebar;
