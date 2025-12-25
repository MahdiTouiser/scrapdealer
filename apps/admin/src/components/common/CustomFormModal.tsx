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
    IconButton,
    MenuItem,
    Stack,
    Switch,
    TextField,
    useTheme,
    Zoom,
} from '@mui/material';

export type FieldType =
    | 'text'
    | 'email'
    | 'select'
    | 'toggle'
    | 'password'
    | 'phone'
    | 'textarea'
    | 'file';

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
    children?: React.ReactNode;
}

const getZodSchema = (fields: FormField[]) => {
    const shape: Record<string, any> = {};
    fields.forEach((field) => {
        switch (field.fieldType) {
            case 'toggle':
                shape[field.name] = field.required
                    ? z.boolean()
                    : z.boolean().optional();
                break;
            case 'password':
                shape[field.name] = z
                    .string()
                    .min(8)
                    .regex(/(?=.*[a-z])/)
                    .regex(/(?=.*[A-Z])/)
                    .regex(/(?=.*\d)/);
                if (!field.required) shape[field.name] = shape[field.name].optional();
                break;
            case 'phone':
                shape[field.name] = z.string().regex(/^\d{11}$/);
                if (!field.required) shape[field.name] = shape[field.name].optional();
                break;
            case 'file':
                shape[field.name] = z.any().optional();
                break;
            default:
                shape[field.name] = field.required
                    ? z.string().nonempty()
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
    children,
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
        setValue,
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues,
    });

    useEffect(() => {
        if (open) reset(defaultValues);
    }, [open, defaultValues, reset]);

    useEffect(() => {
        if (!open) reset({});
    }, [open, reset]);

    const handleClose = () => {
        reset({});
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
            slots={{ transition: Zoom }}
            transitionDuration={400}
            slotProps={{
                paper: {
                    elevation: 0,
                    sx: {
                        borderRadius: 3,
                        overflow: 'hidden',
                        maxHeight: '90vh',
                        display: 'flex',
                        flexDirection: 'column',
                    },
                },
            }}
        >
            <Box
                sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    position: 'relative',
                }}
            >
                <DialogTitle
                    sx={{
                        fontWeight: 700,
                        textAlign: 'center',
                        color: '#fff',
                        py: 2.5,
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
                        color: '#fff',
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
                <DialogContent sx={{ px: 4, flex: 1, overflowY: 'auto', minHeight: 0 }}>
                    {children !== undefined && children !== null ? children : (
                        <Stack spacing={2.5}>
                            <Box
                                display="grid"
                                gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }}
                                gap={2}
                            >
                                {fields.map((field) => {
                                    if (field.fieldType === 'toggle') {
                                        return (
                                            <Controller
                                                key={field.name}
                                                name={field.name}
                                                control={control}
                                                defaultValue={false}
                                                render={({ field: f }) => (
                                                    <Box
                                                        gridColumn="1 / -1"
                                                        display="flex"
                                                        alignItems="center"
                                                        justifyContent="space-between"
                                                        px={2}
                                                        py={1.5}
                                                        borderRadius={2}
                                                        bgcolor={alpha(theme.palette.primary.main, 0.06)}
                                                    >
                                                        <Box fontWeight={500}>{field.label}</Box>
                                                        <Switch
                                                            checked={!!f.value}
                                                            onChange={(e) => f.onChange(e.target.checked)}
                                                            disabled={submitLoading}
                                                        />
                                                    </Box>
                                                )}
                                            />
                                        )
                                    }

                                    if (field.fieldType === 'textarea') {
                                        return (
                                            <TextField
                                                key={field.name}
                                                label={field.label}
                                                multiline
                                                rows={5}
                                                {...register(field.name)}
                                                error={!!errors[field.name]}
                                                fullWidth
                                                sx={{ gridColumn: '1 / -1' }}
                                            />
                                        )
                                    }

                                    if (field.fieldType === 'file') {
                                        return (
                                            <TextField
                                                key={field.name}
                                                label={field.label}
                                                type="file"
                                                fullWidth
                                                InputLabelProps={{ shrink: true }}
                                                onChange={(e) =>
                                                    setValue(field.name, (e.target as HTMLInputElement).files?.[0])
                                                }
                                            />
                                        )
                                    }

                                    if (field.fieldType === 'select') {
                                        return (
                                            <TextField
                                                key={field.name}
                                                select
                                                label={field.label}
                                                {...register(field.name)}
                                                error={!!errors[field.name]}
                                                fullWidth
                                            >
                                                {field.options?.map((opt) => (
                                                    <MenuItem key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        )
                                    }

                                    if (field.fieldType === 'password') {
                                        return (
                                            <TextField
                                                key={field.name}
                                                label={field.label}
                                                type={showPassword ? 'text' : 'password'}
                                                {...register(field.name)}
                                                error={!!errors[field.name]}
                                                fullWidth
                                                InputProps={{
                                                    endAdornment: (
                                                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                                                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                        </IconButton>
                                                    ),
                                                }}
                                            />
                                        )
                                    }

                                    return (
                                        <TextField
                                            key={field.name}
                                            label={field.label}
                                            {...register(field.name)}
                                            error={!!errors[field.name]}
                                            fullWidth
                                        />
                                    )
                                })}
                            </Box>
                        </Stack>
                    )}
                </DialogContent>

                <DialogActions
                    sx={{
                        px: 4,
                        pb: 3,
                        pt: 2,
                        gap: 2,
                        flexShrink: 0,
                        borderTop: 1,
                        borderColor: 'divider',
                    }}
                >
                    <Button onClick={handleClose} variant="outlined" fullWidth disabled={submitLoading}>
                        {cancelLabel}
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
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