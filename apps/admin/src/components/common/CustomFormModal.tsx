'use client';
import {
    useEffect,
    useState,
} from 'react';

import {
    Controller,
    FieldValues,
    SubmitHandler,
    useForm,
} from 'react-hook-form';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
    alpha,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    IconButton,
    MenuItem,
    Stack,
    Switch,
    TextField,
    useTheme,
    Zoom,
} from '@mui/material';

export type FieldType = 'text' | 'email' | 'select' | 'toggle' | 'password' | 'phone';

export interface FormField {
    name: string;
    label: string;
    fieldType?: FieldType;
    required?: boolean;
    placeholder?: string;
    options?: { label: string; value: any }[];
}

interface CustomFormModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    onSubmit: SubmitHandler<FieldValues>;
    fields: FormField[];
    submitLabel?: string;
    cancelLabel?: string;
    submitLoading?: boolean;
    defaultValues?: Record<string, any>;
}

const getZodSchema = (fields: FormField[]) => {
    const shape: Record<string, any> = {};
    fields.forEach((field) => {
        switch (field.fieldType) {
            case 'password':
                shape[field.name] = z
                    .string()
                    .min(8, 'رمز عبور حداقل باید ۸ کاراکتر باشد')
                    .regex(/(?=.*[a-z])/, 'رمز عبور باید شامل حروف کوچک باشد')
                    .regex(/(?=.*[A-Z])/, 'رمز عبور باید شامل حروف بزرگ باشد')
                    .regex(/(?=.*\d)/, 'رمز عبور باید شامل عدد باشد');
                if (!field.required) shape[field.name] = shape[field.name].optional();
                break;
            case 'phone':
                shape[field.name] = z
                    .string()
                    .regex(/^\d{11}$/, 'شماره تلفن باید ۱۱ رقم باشد');
                if (!field.required) shape[field.name] = shape[field.name].optional();
                break;
            default:
                shape[field.name] = field.required
                    ? z.string().nonempty(`${field.label} الزامی است`)
                    : z.string().optional();
        }
    });
    return z.object(shape);
};

const CustomFormModal = ({
    open,
    onClose,
    title,
    onSubmit,
    fields,
    submitLabel = 'ثبت',
    cancelLabel = 'لغو',
    submitLoading = false,
    defaultValues = {},
}: CustomFormModalProps) => {
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);

    const schema = getZodSchema(fields);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues,
    });

    useEffect(() => {
        if (open) reset(defaultValues);
    }, [open, defaultValues, reset]);

    const handleClose = () => {
        reset({});
        onClose();
    };

    const handleFormSubmit = async (data: FieldValues) => {
        await onSubmit(data);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            slots={{ transition: Zoom }}
            transitionDuration={400}
            slotProps={{
                paper: {
                    elevation: 0,
                    sx: {
                        borderRadius: 3,
                        overflow: 'hidden',
                        background:
                            theme.palette.mode === 'dark'
                                ? `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${alpha(
                                    theme.palette.background.paper,
                                    0.95
                                )} 100%)`
                                : theme.palette.background.paper,
                        boxShadow:
                            theme.palette.mode === 'dark'
                                ? `0 24px 48px ${alpha(theme.palette.common.black, 0.4)}`
                                : `0 24px 48px ${alpha(theme.palette.common.black, 0.12)}`,
                        border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                    },
                },
                backdrop: {
                    sx: {
                        backgroundColor: alpha(theme.palette.common.black, 0.5),
                        backdropFilter: 'blur(12px)',
                    },
                },
            }}
        >
            <Box
                sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `radial-gradient(circle at top right, ${alpha(
                            theme.palette.common.white,
                            0.1
                        )} 0%, transparent 60%)`,
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        fontWeight: 700,
                        fontSize: { xs: '1.25rem', sm: '1.5rem' },
                        textAlign: 'center',
                        color: theme.palette.common.white,
                        py: 2.5,
                        px: 6,
                        position: 'relative',
                        letterSpacing: '0.3px',
                    }}
                >
                    {title}
                </DialogTitle>
                <IconButton
                    onClick={handleClose}
                    disabled={submitLoading}
                    sx={{
                        position: 'absolute',
                        right: 12,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: theme.palette.common.white,
                        backgroundColor: alpha(theme.palette.common.white, 0.1),
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.common.white, 0.2),
                            transform: 'translateY(-50%) rotate(90deg) scale(1.1)',
                        },
                        '&.Mui-disabled': {
                            color: alpha(theme.palette.common.white, 0.5),
                        },
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>

            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <DialogContent sx={{ p: { xs: 3, sm: 4 }, pt: { xs: 3, sm: 3.5 } }}>
                    <Stack spacing={2.5}>
                        {fields.map((field) => {
                            switch (field.fieldType) {
                                case 'select':
                                    return (
                                        <TextField
                                            key={field.name}
                                            select
                                            label={field.label}
                                            defaultValue=""
                                            {...register(field.name)}
                                            error={!!errors[field.name]}
                                            helperText={errors[field.name]?.message?.toString()}
                                            fullWidth
                                            disabled={submitLoading}
                                        >
                                            {field.options?.map((opt) => (
                                                <MenuItem key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    );
                                case 'toggle':
                                    return (
                                        <Controller
                                            key={field.name}
                                            name={field.name}
                                            control={control}
                                            defaultValue={false}
                                            render={({ field: controllerField }) => (
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={!!controllerField.value}
                                                            onChange={(e) =>
                                                                controllerField.onChange(e.target.checked)
                                                            }
                                                            disabled={submitLoading}
                                                        />
                                                    }
                                                    label={field.label}
                                                />
                                            )}
                                        />
                                    );
                                case 'password':
                                    return (
                                        <TextField
                                            key={field.name}
                                            label={field.label}
                                            type={showPassword ? 'text' : 'password'}
                                            {...register(field.name)}
                                            error={!!errors[field.name]}
                                            helperText={errors[field.name]?.message?.toString()}
                                            fullWidth
                                            placeholder={field.placeholder}
                                            variant="outlined"
                                            disabled={submitLoading}
                                            InputProps={{
                                                endAdornment: (
                                                    <IconButton
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        edge="end"
                                                        disabled={submitLoading}
                                                    >
                                                        {showPassword ? (
                                                            <VisibilityOffIcon />
                                                        ) : (
                                                            <VisibilityIcon />
                                                        )}
                                                    </IconButton>
                                                ),
                                            }}
                                        />
                                    );
                                case 'phone':
                                    return (
                                        <TextField
                                            key={field.name}
                                            label={field.label}
                                            type="tel"
                                            {...register(field.name)}
                                            error={!!errors[field.name]}
                                            helperText={errors[field.name]?.message?.toString()}
                                            fullWidth
                                            placeholder={field.placeholder}
                                            variant="outlined"
                                            disabled={submitLoading}
                                        />
                                    );
                                default:
                                    return (
                                        <TextField
                                            key={field.name}
                                            label={field.label}
                                            type={field.fieldType || 'text'}
                                            {...register(field.name)}
                                            error={!!errors[field.name]}
                                            helperText={errors[field.name]?.message?.toString()}
                                            fullWidth
                                            placeholder={field.placeholder}
                                            variant="outlined"
                                            disabled={submitLoading}
                                        />
                                    );
                            }
                        })}
                    </Stack>
                </DialogContent>

                <DialogActions sx={{ justifyContent: 'space-between', p: { xs: 3, sm: 4 }, pt: 2 }}>
                    <Button onClick={handleClose} variant="outlined" size="large" fullWidth disabled={submitLoading}>
                        {cancelLabel}
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={submitLoading}
                        startIcon={!submitLoading && <CheckCircleOutlineIcon />}
                    >
                        {submitLoading ? (
                            <Box display="flex" alignItems="center" gap={1.5}>
                                <CircularProgress size={18} color="inherit" thickness={4} />
                                <span>در حال پردازش...</span>
                            </Box>
                        ) : (
                            submitLabel
                        )}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default CustomFormModal;
