"use client";

import {
  useCallback,
  useMemo,
  useState,
} from 'react';

import PageTitle from '@/components/common/PageTitle';
import PermissionsTreeGrid
  from '@/components/supports/permissions/PermissionsTreeGrid';
import { useApi } from '@/hooks/useApi';
import fa from '@/i18n/fa';
import {
  AdminPanelSettingsOutlined,
  CheckCircleOutline,
  PersonOutline,
  SaveOutlined,
} from '@mui/icons-material';
import {
  alpha,
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';

interface Support {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

interface User {
    id: string;
    name: string;
    avatar?: string;
    status: 'active' | 'inactive';
}

const Permissions = () => {
    const theme = useTheme();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [hasChanges, setHasChanges] = useState(false);
    const [currentPermissions, setCurrentPermissions] = useState<string[]>([]);

    const { data: supportsData, loading } = useApi<{ data: Support[]; totalCount: number }>({
        key: ['get-supports'],
        url: '/Supports',
    });

    const { mutate: savePermissions, loading: saving } = useApi<void, { Permissions: string[] }>({
        key: ['save-permissions', selectedUser?.id],
        url: `/Permissions`,
        method: 'PUT',
        onSuccess: 'دسترسی‌ها با موفقیت ذخیره شد',
        onError: 'خطا در ذخیره دسترسی‌ها',
    });

    const users: User[] = useMemo(() => {
        if (!supportsData?.data) return [];
        return supportsData.data.map((support) => ({
            id: support.id,
            name: `${support.firstName} ${support.lastName}`,
            status: 'active',
        }));
    }, [supportsData]);

    const handleUserSelect = (user: User) => {
        setSelectedUser(user);
        setHasChanges(false);
        setCurrentPermissions([]);
    };

    const handlePermissionsChange = useCallback((permissions: string[]) => {
        setCurrentPermissions(permissions);
        setHasChanges(true);
    }, []);

    const handleSavePermissions = () => {
        if (!selectedUser || !hasChanges) return;

        savePermissions(
            { Permissions: currentPermissions },
            {
                onSuccess: () => {
                    setHasChanges(false);
                },
            }
        );
    };

    const getInitials = (name: string) =>
        name.split(' ').map((n) => n[0]).join('').substring(0, 2);

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <PageTitle title={fa.permissionLevel} />

            <Grid container spacing={3}>
                <Grid size={4}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            border: `1px solid ${theme.palette.divider}`,
                            height: '100%',
                            maxHeight: 'calc(100vh - 200px)',
                            overflow: 'auto',
                            background: `linear-gradient(135deg, ${alpha(
                                theme.palette.background.paper,
                                1
                            )} 0%, ${alpha(theme.palette.background.default, 0.5)} 100%)`,
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                            <AdminPanelSettingsOutlined
                                sx={{ fontSize: 28, color: theme.palette.primary.main }}
                            />
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    fontFamily: 'IRANSans, Vazirmatn, sans-serif',
                                    color: theme.palette.text.primary,
                                }}
                            >
                                انتخاب کاربر
                            </Typography>
                        </Box>

                        <Typography
                            variant="body2"
                            sx={{
                                mb: 3,
                                color: theme.palette.text.secondary,
                                fontFamily: 'IRANSans, Vazirmatn, sans-serif',
                            }}
                        >
                            یک کاربر را برای تنظیم سطح دسترسی انتخاب کنید
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            {loading ? (
                                <Typography>در حال بارگذاری...</Typography>
                            ) : users.length === 0 ? (
                                <Typography>کاربری یافت نشد</Typography>
                            ) : (
                                users.map((user) => (
                                    <Paper
                                        key={user.id}
                                        elevation={0}
                                        sx={{
                                            p: 2.5,
                                            borderRadius: 2.5,
                                            border: `2px solid ${selectedUser?.id === user.id
                                                ? theme.palette.primary.main
                                                : theme.palette.divider
                                                }`,
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            background:
                                                selectedUser?.id === user.id
                                                    ? alpha(theme.palette.primary.main, 0.08)
                                                    : theme.palette.background.paper,
                                            '&:hover': {
                                                borderColor: theme.palette.primary.main,
                                                transform: 'translateX(-4px)',
                                                boxShadow: `0 4px 12px ${alpha(
                                                    theme.palette.primary.main,
                                                    0.15
                                                )}`,
                                            },
                                        }}
                                        onClick={() => handleUserSelect(user)}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    bgcolor: theme.palette.primary.main,
                                                    fontWeight: 700,
                                                    fontSize: '1.1rem',
                                                    fontFamily: 'IRANSans, Vazirmatn, sans-serif',
                                                }}
                                            >
                                                {getInitials(user.name)}
                                            </Avatar>
                                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontFamily: 'IRANSans, Vazirmatn, sans-serif',
                                                        color: theme.palette.text.primary,
                                                        mb: 0.5,
                                                    }}
                                                >
                                                    {user.name}
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1,
                                                        flexWrap: 'wrap',
                                                    }}
                                                >
                                                    <Chip
                                                        label={
                                                            user.status === 'active' ? 'فعال' : 'غیرفعال'
                                                        }
                                                        size="small"
                                                        icon={
                                                            user.status === 'active' ? (
                                                                <CheckCircleOutline sx={{ fontSize: 14 }} />
                                                            ) : undefined
                                                        }
                                                        sx={{
                                                            fontSize: '0.75rem',
                                                            height: 24,
                                                            fontFamily: 'IRANSans, Vazirmatn, sans-serif',
                                                            backgroundColor:
                                                                user.status === 'active'
                                                                    ? alpha(theme.palette.success.main, 0.1)
                                                                    : alpha(theme.palette.error.main, 0.1),
                                                            color:
                                                                user.status === 'active'
                                                                    ? theme.palette.success.dark
                                                                    : theme.palette.error.dark,
                                                        }}
                                                    />
                                                </Box>
                                            </Box>
                                            {selectedUser?.id === user.id && (
                                                <CheckCircleOutline
                                                    sx={{ color: theme.palette.primary.main, fontSize: 24 }}
                                                />
                                            )}
                                        </Box>
                                    </Paper>
                                ))
                            )}
                        </Box>
                    </Paper>
                </Grid>

                <Grid size={8}>
                    {selectedUser ? (
                        <Box>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    mb: 3,
                                    borderRadius: 3,
                                    border: `1px solid ${theme.palette.divider}`,
                                    background: `linear-gradient(135deg, ${alpha(
                                        theme.palette.primary.main,
                                        0.08
                                    )} 0%, ${alpha(theme.palette.primary.light, 0.05)} 100%)`,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        flexWrap: 'wrap',
                                        gap: 2,
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar
                                            sx={{
                                                width: 56,
                                                height: 56,
                                                bgcolor: theme.palette.primary.main,
                                                fontWeight: 700,
                                                fontSize: '1.3rem',
                                                fontFamily: 'IRANSans, Vazirmatn, sans-serif',
                                                boxShadow: `0 4px 12px ${alpha(
                                                    theme.palette.primary.main,
                                                    0.3
                                                )}`,
                                            }}
                                        >
                                            {getInitials(selectedUser.name)}
                                        </Avatar>
                                        <Box>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 700,
                                                    fontFamily: 'IRANSans, Vazirmatn, sans-serif',
                                                    color: theme.palette.text.primary,
                                                    mb: 0.5,
                                                }}
                                            >
                                                {selectedUser.name}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                                        <Button
                                            variant="contained"
                                            startIcon={<SaveOutlined />}
                                            onClick={handleSavePermissions}
                                            disabled={!hasChanges || saving}
                                            sx={{
                                                borderRadius: 2,
                                                px: 3,
                                                py: 1.2,
                                                fontWeight: 600,
                                                fontFamily: 'IRANSans, Vazirmatn, sans-serif',
                                                textTransform: 'none',
                                                boxShadow: `0 4px 14px 0 ${alpha(theme.palette.primary.main, 0.4)}`,
                                                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    boxShadow: `0 6px 20px 0 ${alpha(theme.palette.primary.main, 0.5)}`,
                                                    transform: 'translateY(-2px)',
                                                },
                                                '&:disabled': {
                                                    background: theme.palette.action.disabledBackground,
                                                    boxShadow: 'none',
                                                },
                                            }}
                                        >
                                            {saving ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
                                        </Button>
                                    </Box>
                                </Box>
                            </Paper>

                            <PermissionsTreeGrid
                                userId={selectedUser.id}
                                onPermissionsChange={handlePermissionsChange}
                            />
                        </Box>
                    ) : (
                        <Paper
                            elevation={0}
                            sx={{
                                p: 8,
                                borderRadius: 3,
                                border: `2px dashed ${theme.palette.divider}`,
                                textAlign: 'center',
                                background: alpha(theme.palette.background.default, 0.5),
                            }}
                        >
                            <PersonOutline
                                sx={{ fontSize: 80, color: theme.palette.text.disabled, mb: 2 }}
                            />
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    fontFamily: 'IRANSans, Vazirmatn, sans-serif',
                                    color: theme.palette.text.secondary,
                                    mb: 1,
                                }}
                            >
                                کاربری انتخاب نشده است
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: theme.palette.text.secondary,
                                    fontFamily: 'IRANSans, Vazirmatn, sans-serif',
                                }}
                            >
                                لطفاً یک کاربر را از لیست سمت راست انتخاب کنید
                            </Typography>
                        </Paper>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default Permissions;