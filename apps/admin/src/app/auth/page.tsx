'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { AuthInterface } from '@/components/types';
import { useAuth } from '@/contexts/AuthContext';
import { useApi } from '@/hooks/useApi';
import fa from '@/i18n/fa';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AdminPanelSettings,
  SupportAgent,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

const loginSchema = z.object({
    username: z.string().min(3, fa.login.errors.usernameMin),
    password: z.string().min(6, fa.login.errors.passwordMin),
});

type LoginFormData = z.infer<typeof loginSchema>;

type LoginPayload = LoginFormData & {
    role: 'Admin' | 'Support';
};

const StyledContainer = styled(Container)(({ theme }) => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: 12,
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
    padding: theme.spacing(1.5),
    borderRadius: 8,
    fontWeight: 500,
    textTransform: 'none',
}));

const StyledTextField = styled(TextField)(() => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: 8,
    },
}));

const LogoIcon = styled('img')(({ theme }) => ({
    width: 80,
    height: 80,
    marginBottom: theme.spacing(1),
}));

export default function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });
    const router = useRouter();
    const { setAuth, permissions, setPermissions } = useAuth();

    const [role, setRole] = useState<'Admin' | 'Support'>('Admin');
    const [showPassword, setShowPassword] = useState(false);

    const { mutateAsync: login, loading } = useApi<AuthInterface, LoginPayload>({
        key: ['login'],
        url: '/Authentication/CredentialLogin',
        method: 'POST',
        onSuccess: 'ورود موفقیت‌آمیز بود',
        onError: 'ورود ناموفق بود',
    });




    const onSubmit = async (data: LoginFormData) => {
        try {
            const loginPayload: LoginPayload = {
                ...data,
                role: role,
            };

            const response = await login(loginPayload);
            if (response) {
                setAuth(response.token, response.role);
                setPermissions(response.permissions);

                router.push('/dashboard/main');
                router.refresh();
            }
            console.log(permissions);
        } catch (error) {
            console.error('API Error:', error);
        }
    };

    return (
        <StyledContainer maxWidth="sm">
            <StyledPaper elevation={3}>
                <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                    <LogoIcon src="/icons/logo.png" alt="Logo" />
                    <Typography variant="h4" fontWeight={600} mb={0.5}>
                        {fa.scrapDealer}
                    </Typography>
                    <Typography color="grey.600" mb={3}>
                        {fa.login.title}
                    </Typography>

                    <ToggleButtonGroup
                        color="primary"
                        value={role}
                        exclusive
                        onChange={(_, value) => value && setRole(value)}
                        sx={{ mb: 3 }}
                    >
                        <ToggleButton value="Support" sx={{ px: 3, py: 1 }}>
                            <SupportAgent sx={{ mr: 1 }} /> ورود پشتیبان
                        </ToggleButton>
                        <ToggleButton value="Admin" sx={{ px: 3, py: 1 }}>
                            <AdminPanelSettings sx={{ mr: 1 }} /> ورود ادمین
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                    <StyledTextField
                        label={fa.login.username}
                        fullWidth
                        {...register('username')}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />

                    <StyledTextField
                        label={fa.login.password}
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(prev => !prev)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />


                    {errors.root && (
                        <Alert severity="error" sx={{ borderRadius: 2 }}>
                            {errors.root.message}
                        </Alert>
                    )}

                    <StyledButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                    >
                        {loading ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CircularProgress size={20} />
                                {fa.login.submitting}
                            </Box>
                        ) : (
                            fa.login.submit
                        )}
                    </StyledButton>
                </Box>
            </StyledPaper>
        </StyledContainer>
    );
}