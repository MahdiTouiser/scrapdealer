'use client';

import React, {
  useEffect,
  useState,
} from 'react';

import Link from 'next/link';
import {
  usePathname,
  useRouter,
} from 'next/navigation';
import toast from 'react-hot-toast';

import fa from '@/i18n/fa';
import {
  ChevronLeft,
  ChevronRight,
  ExpandLess,
  ExpandMore,
  Logout,
  Recycling,
} from '@mui/icons-material';
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  keyframes,
  useTheme,
} from '@mui/material/styles';

import ThemeToggle from '../common/ToggleTheme';
import MenuItem from './MenuItem';
import { MENU_SECTIONS } from './MenuSections';

const slideIn = keyframes`
  from { transform: translateX(20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

export const glow = keyframes`
  0%, 100% { box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); }
  50% { box-shadow: 0 0 15px rgba(0, 0, 0, 0.2); }
`;

const Sidebar: React.FC = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(true);
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
        Object.fromEntries(MENU_SECTIONS.map((section) => [section.section, false]))
    );

    const [selectedItem, setSelectedItem] = useState<string>(fa.dashboard);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const normalizedPath = pathname?.replace(/\/$/, '') || '/';

        let selected = fa.dashboard;
        let sectionToExpand = '';

        for (const section of MENU_SECTIONS) {
            for (const item of section.items) {
                if (item.path.replace(/\/$/, '') === normalizedPath) {
                    selected = item.text;
                    sectionToExpand = section.section;
                    break;
                }
            }
            if (sectionToExpand) break;
        }

        setSelectedItem(selected);

        if (sectionToExpand) {
            setExpandedSections((prev) => ({
                ...prev,
                [sectionToExpand]: true,
            }));
        }
    }, [pathname]);


    const handleDrawerToggle = () => setOpen((prev) => !prev);
    const handleSectionToggle = (section: string) => {
        setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };
    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        router.push('/auth');
        toast.success(fa.successfulLogout);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                variant="permanent"
                sx={{
                    width: open ? 280 : 72,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: open ? 280 : 72,
                        boxSizing: 'border-box',
                        background: theme.palette.background.paper,
                        borderLeft: 'none',
                        boxShadow: '4px 0 24px rgba(0, 0, 0, 0.08)',
                        transition: theme.transitions.create('width', {
                            easing: theme.transitions.easing.easeInOut,
                            duration: theme.transitions.duration.standard,
                        }),
                        overflowY: open ? 'auto' : 'hidden',
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
                        background: `linear-gradient(
      135deg, 
      ${theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.background.default} 0%, 
      ${theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.background.paper} 100%
    )`,
                        position: 'relative',
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
                                background: `linear-gradient(
          135deg, 
          ${theme.palette.primary.main}, 
          ${theme.palette.secondary.main}
        )`,
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
                                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                            }}
                        />
                    </Box>

                    {open && (
                        <Typography
                            variant="h5"
                            sx={{
                                mt: 1.5,
                                fontWeight: 800,
                                background: `linear-gradient(
          135deg, 
          ${theme.palette.primary.main}, 
          ${theme.palette.secondary.main}
        )`,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
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
                        p: open ? theme.spacing(0, 2) : theme.spacing(0, 1),
                        minHeight: 64,
                        background: theme.palette.background.paper,
                        borderBottom: `1px solid ${theme.palette.divider}`,
                    }}
                >
                    {open && (
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                color: theme.palette.primary.main,
                                animation: `${slideIn} 0.3s ease-in`,
                            }}
                        >
                            {fa.dashboard}
                        </Typography>
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
                        }}
                        aria-label={open ? 'Close sidebar' : 'Open sidebar'}
                    >
                        {open ? <ChevronLeft /> : <ChevronRight />}
                    </IconButton>
                </Box>

                <Divider sx={{ borderColor: theme.palette.divider, mx: 1 }} />

                <List sx={{ px: 1, pt: 1 }}>
                    {MENU_SECTIONS.map((section) => (
                        <Box key={section.section} sx={{ mb: 1.5 }}>
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
                                            }}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    color: theme.palette.primary.main,
                                                    fontWeight: 700,
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

                                    <Collapse in={expandedSections[section.section] || !open} timeout="auto" unmountOnExit>
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

                <Box sx={{ p: 1, borderTop: `2px solid ${theme.palette.divider}` }}>
                    <ThemeToggle open={open} />
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
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 2 : 'auto',
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
    );
};

export default Sidebar;
