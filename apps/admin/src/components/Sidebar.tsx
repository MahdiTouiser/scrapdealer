'use client';

import React, {
  useEffect,
  useState,
} from 'react';

import Cookies from 'js-cookie';
import Link from 'next/link';
import {
  usePathname,
  useRouter,
} from 'next/navigation';
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
  ThemeProvider,
} from '@mui/material/styles';

interface MenuItem {
    text: string;
    icon: React.ReactNode;
    path: string;
}

interface MenuSection {
    section: string;
    collapsible?: boolean;
    items: MenuItem[];
}

const MENU_SECTIONS: MenuSection[] = [
    {
        section: fa.main,
        items: [{ text: fa.dashboard, icon: <DashboardIcon />, path: '/dashboard' }],
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

const slideIn = keyframes`
  from { transform: translateX(20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;



const glow = keyframes`
  0%, 100% { box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); }
  50% { box-shadow: 0 0 15px rgba(0, 0, 0, 0.2); }
`;



const Sidebar: React.FC = () => {
    const [open, setOpen] = useState(true);
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
        Object.fromEntries(MENU_SECTIONS.map((section) => [section.section, section.collapsible ?? false]))
    );
    const [selectedItem, setSelectedItem] = useState<string>(fa.dashboard);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const selected =
            MENU_SECTIONS.flatMap((section) => section.items).find((item) => item.path === pathname)?.text ??
            fa.dashboard;
        setSelectedItem(selected);
    }, [pathname]);

    const handleDrawerToggle = () => setOpen((prev) => !prev);

    const handleSectionToggle = (section: string) => {
        setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const handleLogout = () => {
        Cookies.remove('auth_token');
        router.push('/auth');
        toast.success(fa.successfulLogout);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex' }}>
                <Drawer
                    variant="permanent"
                    sx={{
                        width: open ? 280 : 72,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: open ? 280 : 72,
                            boxSizing: 'border-box',
                            background: theme.palette.common.white,
                            borderLeft: 'none',
                            boxShadow: '4px 0 24px rgba(0, 0, 0, 0.08)',
                            transition: theme.transitions.create('width', {
                                easing: theme.transitions.easing.easeInOut,
                                duration: theme.transitions.duration.standard,
                            }),
                            overflowY: open ? 'auto' : 'hidden',
                            '&::-webkit-scrollbar': open
                                ? {
                                    width: '6px',
                                    background: theme.palette.grey[100],
                                }
                                : { display: 'none' },
                            '&::-webkit-scrollbar-thumb': {
                                background: theme.palette.grey[400],
                                borderRadius: '3px',
                                '&:hover': { background: theme.palette.grey[500] },
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
                                    opacity: 0.15,
                                    animation: 'pulse 2.5s infinite',
                                },
                                '@keyframes pulse': {
                                    '0%, 100%': { transform: 'scale(1)', opacity: 0.15 },
                                    '50%': { transform: 'scale(1.15)', opacity: 0.25 },
                                },
                            }}
                        >
                            <Recycling
                                sx={{
                                    fontSize: 60,
                                    color: theme.palette.primary.main,
                                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
                                }}
                            />
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
                                    letterSpacing: '0.5px',
                                }}
                            >
                                {fa.scrapDealer}
                            </Typography>
                        )}
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: open ? 'space-between' : 'center',
                            padding: open ? theme.spacing(0, 2) : theme.spacing(0, 1),
                            minHeight: 64,
                            background: theme.palette.common.white,
                            borderBottom: `1px solid ${theme.palette.grey[200]}`,
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            position: 'relative',
                            overflow: 'visible',
                        }}
                    >
                        {open ? (
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    fontSize: '1.1rem',
                                    letterSpacing: '0.3px',
                                    color: theme.palette.primary.main,
                                    animation: `${slideIn} 0.3s ease-in`,
                                }}
                            >
                                {fa.dashboard}
                            </Typography>
                        ) : (
                            <Box sx={{ display: 'none' }} />
                        )}

                        <IconButton
                            onClick={handleDrawerToggle}
                            sx={{
                                color: theme.palette.primary.main,
                                '&:hover': {
                                    background: 'rgba(0, 0, 0, 0.04)',
                                    transform: 'scale(1.1)',
                                },
                                transition: 'all 0.2s ease',
                                minWidth: 'auto',
                                width: 40,
                                height: 40,
                                visibility: 'visible !important',
                                opacity: '1 !important',
                            }}
                            aria-label={open ? 'Close sidebar' : 'Open sidebar'}
                        >
                            {open ? <ChevronLeft /> : <ChevronRight />}
                        </IconButton>
                    </Box>

                    <Divider sx={{ borderColor: theme.palette.grey[200], mx: 1 }} />

                    <List sx={{ px: 1, pt: 1 }}>
                        {MENU_SECTIONS.map((section) => (
                            <Box key={section.section} sx={{ mb: 1.5 }} role="group" aria-label={section.section}>
                                {section.collapsible ? (
                                    <>
                                        {open && (
                                            <ListItemButton
                                                onClick={() => handleSectionToggle(section.section)}
                                                sx={{
                                                    borderRadius: 2,
                                                    justifyContent: open ? 'space-between' : 'center',
                                                    px: 2,
                                                    py: 1,
                                                    mb: 0.5,
                                                    '&:hover': {
                                                        bgcolor: theme.palette.action.hover,
                                                        animation: `${glow} 1.5s infinite`,
                                                    },
                                                    transition: 'background 0.2s ease',
                                                }}
                                                aria-expanded={expandedSections[section.section]}
                                            >
                                                {open && (
                                                    <Typography
                                                        variant="subtitle2"
                                                        sx={{
                                                            flex: 1,
                                                            color: theme.palette.primary.main,
                                                            fontWeight: 700,
                                                            fontSize: '0.9rem',
                                                            letterSpacing: '0.2px',
                                                        }}
                                                    >
                                                        {section.section}
                                                    </Typography>
                                                )}
                                                {expandedSections[section.section] ? (
                                                    <ExpandLess sx={{ color: theme.palette.primary.main }} />
                                                ) : (
                                                    <ExpandMore sx={{ color: theme.palette.primary.main }} />
                                                )}
                                            </ListItemButton>

                                        )}
                                        <Collapse in={open && (expandedSections[section.section] ?? false)} timeout="auto" unmountOnExit>
                                            <List disablePadding>
                                                {section.items.map((item) => (
                                                    <MenuItem
                                                        key={item.text}
                                                        item={item}
                                                        open={open}
                                                        selected={selectedItem === item.text}
                                                        component={Link}
                                                        href={item.path}
                                                    />
                                                ))}
                                            </List>
                                        </Collapse>

                                        {!open && (
                                            <List disablePadding>
                                                {section.items.map((item) => (
                                                    <MenuItem
                                                        key={item.text}
                                                        item={item}
                                                        open={open}
                                                        selected={selectedItem === item.text}
                                                        component={Link}
                                                        href={item.path}
                                                    />
                                                ))}
                                            </List>
                                        )}
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
                                                    letterSpacing: '0.2px',
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
                                                component={Link}
                                                href={item.path}
                                            />
                                        ))}
                                    </>
                                )}
                            </Box>
                        ))}
                    </List>

                    <Box sx={{ flexGrow: 1 }} />

                    <Box sx={{ p: 1, borderTop: `2px solid ${theme.palette.grey[200]}` }}>
                        <Tooltip title={!open ? fa.logout : ''} placement="right" arrow>
                            <ListItemButton
                                onClick={handleLogout}
                                sx={{
                                    borderRadius: 2,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2,
                                    py: 1.5,
                                    '&:hover': {
                                        bgcolor: theme.palette.error.light + '33',
                                        transform: 'translateX(-2px)',
                                        animation: `${glow} 1.5s infinite`,
                                    },
                                    transition: 'all 0.2s ease',
                                }}
                                aria-label="Logout"
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 2 : 'auto',
                                        color: theme.palette.error.main,
                                        transform: 'scale(1.1)',
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
                                            fontSize: '0.95rem',
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

interface MenuItemProps {
    item: MenuItem;
    open: boolean;
    selected: boolean;
    component?: React.ElementType;
    href?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, open, selected, component, href }) => (
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
                    bgcolor: selected ? theme.palette.primary.light + '33' : 'transparent',
                    borderRight: selected ? `3px solid ${theme.palette.primary.main}` : '3px solid transparent',
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
                        color: selected ? theme.palette.primary.main : theme.palette.text.secondary,
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
                            color: selected ? theme.palette.primary.main : theme.palette.text.primary,
                            letterSpacing: '0.1px',
                        },
                    }}
                />
            </ListItemButton>
        </ListItem>
    </Tooltip>
);

export default Sidebar;
