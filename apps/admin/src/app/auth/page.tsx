'use client';

import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import fa from '@/i18n/fa';
import { zodResolver } from '@hookform/resolvers/zod';
import {
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
    Link,
    Paper,
    TextField,
    Typography,
} from '@mui/material';

// Zod schema
const loginSchema = z.object({
    username: z.string().min(3, fa.login.errors.usernameMin),
    password: z.string().min(6, fa.login.errors.passwordMin),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data: LoginFormData) => {
        console.log("Form submitted:", data);
        // TODO: call API
    };

    return (
        <Container
            maxWidth="sm"
            sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Paper elevation={4} sx={{ p: 4, borderRadius: 3, width: '100%' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {fa.login.title}
                </Typography>

                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <TextField
                        label={fa.login.username}
                        fullWidth
                        margin="normal"
                        {...register('username')}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />

                    <TextField
                        label={fa.login.password}
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        margin="normal"
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                        <Link href="/forgot-password" underline="hover" variant="body2">
                            {fa.login.forgotPassword}
                        </Link>
                    </Box>

                    {errors.root && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {errors.root.message}
                        </Alert>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{ mt: 3, borderRadius: 2 }}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? fa.login.submitting : fa.login.submit}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}
