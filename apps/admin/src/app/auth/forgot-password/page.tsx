'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import fa from '@/i18n/fa';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Alert,
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography,
} from '@mui/material';

const forgotPasswordSchema = z.object({
    username: z.string().min(3, fa.forgotPassword.errors.usernameMin),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: ForgotPasswordFormData) => {
        console.log('Forgot password request:', data);
        // TODO: call API
    };

    return (
        <Container
            maxWidth="sm"
            sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Paper elevation={4} sx={{ p: 4, borderRadius: 3, width: '100%' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {fa.forgotPassword.title}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                    {fa.forgotPassword.description}
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
                        {isSubmitting ? fa.forgotPassword.submitting : fa.forgotPassword.submit}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}
