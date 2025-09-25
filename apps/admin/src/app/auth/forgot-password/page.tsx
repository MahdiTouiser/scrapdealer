'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import fa from '@/i18n/fa';
import { zodResolver } from '@hookform/resolvers/zod';
import { Recycling } from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Link,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const forgotPasswordSchema = z.object({
    username: z.string().min(3, fa.forgotPassword.errors.usernameMin),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// Styled components for minimal neutral design
const StyledContainer = styled(Container)(({ theme }) => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(2),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: 12,
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease-in-out',
    '&:hover': {
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
    },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: 8,
        backgroundColor: theme.palette.grey[50],
        '& fieldset': {
            borderColor: theme.palette.grey[300],
        },
        '&:hover fieldset': {
            borderColor: theme.palette.grey[500],
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.grey[700],
        },
    },
    '& .MuiInputLabel-root': {
        color: theme.palette.grey[600],
        '&.Mui-focused': {
            color: theme.palette.grey[800],
        },
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    padding: theme.spacing(1.5),
    borderRadius: 8,
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    fontWeight: 500,
    textTransform: 'none',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    '&:hover': {
        backgroundColor: theme.palette.grey[900],
        transform: 'translateY(-2px)',
    },
    '&:disabled': {
        backgroundColor: theme.palette.grey[400],
        color: theme.palette.grey[600],
    },
}));

const StyledLink = styled(Link)(({ theme }) => ({
    color: theme.palette.grey[600],
    textDecoration: 'none',
    fontSize: '0.875rem',
    transition: 'color 0.3s ease',
    '&:hover': {
        color: theme.palette.grey[800],
        textDecoration: 'underline',
    },
}));

const StyledAlert = styled(Alert)(({ theme }) => ({
    borderRadius: 8,
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.dark,
    border: `1px solid ${theme.palette.error.main}`,
}));

const LogoIcon = styled(Recycling)(({ theme }) => ({
    fontSize: 48,
    color: theme.palette.grey[700],
    marginBottom: theme.spacing(1),
}));

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
        <StyledContainer maxWidth="sm">
            <StyledPaper elevation={0} role="form" aria-labelledby="forgot-password-title">
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <LogoIcon aria-hidden="true" />
                    <Typography
                        variant="h4"
                        component="h1"
                        id="forgot-password-title"
                        sx={{ textAlign: 'center', color: 'text.primary', mb: 1, fontWeight: 600 }}
                    >
                        {fa.scrapDealer}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{ textAlign: 'center', color: 'grey.600', mb: 2 }}
                    >
                        {fa.forgotPassword.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ textAlign: 'center', color: 'grey.600', mb: 3, maxWidth: 320 }}
                    >
                        {fa.forgotPassword.description}
                    </Typography>
                </Box>

                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
                >
                    <StyledTextField
                        label={fa.login.username}
                        fullWidth
                        {...register('username')}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        inputProps={{ 'aria-label': fa.login.username }}
                    />

                    {errors.root && (
                        <StyledAlert severity="error">
                            {errors.root.message}
                        </StyledAlert>
                    )}

                    <StyledButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isSubmitting}
                        aria-label={isSubmitting ? fa.forgotPassword.submitting : fa.forgotPassword.submit}
                    >
                        {isSubmitting ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CircularProgress size={20} sx={{ color: 'grey.600' }} />
                                {fa.forgotPassword.submitting}
                            </Box>
                        ) : (
                            fa.forgotPassword.submit
                        )}
                    </StyledButton>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <StyledLink href="/auth" variant="body2">
                            {fa.returnToLoginPage}
                        </StyledLink>
                    </Box>
                </Box>
            </StyledPaper>
        </StyledContainer>
    );
}