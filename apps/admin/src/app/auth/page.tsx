'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useApi } from '@/hooks/useApi';
import fa from '@/i18n/fa';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AdminPanelSettings,
  Recycling,
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

const LogoIcon = styled(Recycling)(({ theme }) => ({
    fontSize: 48,
    color: theme.palette.grey[700],
    marginBottom: theme.spacing(1),
}));

export default function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });
    const router = useRouter();

    const [role, setRole] = useState<'admin' | 'supporter'>('supporter');
    const [showPassword, setShowPassword] = useState(false);

    const { mutateAsync: login, loading } = useApi<{ data: string }, LoginFormData>({
        key: ['login'],
        url: '/Authentication/CredentialLogin',
        method: 'POST',
        onSuccess: 'ورود موفقیت‌آمیز بود',
        onError: 'ورود ناموفق بود',
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await login(data);

            if (response.data) {
                localStorage.setItem('auth_token', response.data);
                localStorage.setItem('user_role', role);

                router.push(role === 'admin' ? '/dashboard/main' : '/supporter/dashboard');
                router.refresh();
            }
        } catch (error) {
            console.error('API Error:', error);
        }
    };

    return (
        <StyledContainer maxWidth="sm">
            <StyledPaper elevation={3}>
                <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                    <LogoIcon />
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
                        <ToggleButton value="supporter" sx={{ px: 3, py: 1 }}>
                            <SupportAgent sx={{ mr: 1 }} /> ورود پشتیبان
                        </ToggleButton>
                        <ToggleButton value="admin" sx={{ px: 3, py: 1 }}>
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
                        InputProps={{
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
