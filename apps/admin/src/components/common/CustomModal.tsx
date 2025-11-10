'use client';
import {
    Controller,
    FieldValues,
    SubmitHandler,
    useForm,
} from 'react-hook-form';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
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

export type FieldType = 'text' | 'email' | 'select' | 'toggle';

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
}

const CustomFormModal = ({
    open,
    onClose,
    title,
    onSubmit,
    fields,
    submitLabel = 'ثبت',
    cancelLabel = 'لغو',
    submitLoading = false,
}: CustomFormModalProps) => {
    const theme = useTheme();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm();

    const handleClose = () => {
        reset();
        onClose();
    };

    // Wrap onSubmit to handle async properly
    const handleFormSubmit = async (data: FieldValues) => {
        await onSubmit(data);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            slots={{
                transition: Zoom,
            }}
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
                        background: `radial-gradient(circle at top right, ${alpha(theme.palette.common.white, 0.1)} 0%, transparent 60%)`,
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
                <DialogContent
                    sx={{
                        p: { xs: 3, sm: 4 },
                        pt: { xs: 3, sm: 3.5 },
                    }}
                >
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
                                            {...register(field.name, { required: field.required })}
                                            error={!!errors[field.name]}
                                            helperText={
                                                errors[field.name]
                                                    ? `${field.label} الزامی است`
                                                    : ''
                                            }
                                            fullWidth
                                            disabled={submitLoading}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2,
                                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    backgroundColor: alpha(theme.palette.action.hover, 0.02),
                                                    '& fieldset': {
                                                        borderColor: alpha(theme.palette.divider, 0.3),
                                                        borderWidth: 1.5,
                                                    },
                                                    '&:hover': {
                                                        backgroundColor: alpha(theme.palette.action.hover, 0.05),
                                                        '& fieldset': {
                                                            borderColor: alpha(theme.palette.primary.main, 0.4),
                                                        },
                                                    },
                                                    '&.Mui-focused': {
                                                        backgroundColor: 'transparent',
                                                        boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.08)}`,
                                                        '& fieldset': {
                                                            borderColor: theme.palette.primary.main,
                                                            borderWidth: 2,
                                                        },
                                                    },
                                                },
                                                '& .MuiInputLabel-root': {
                                                    fontWeight: 500,
                                                    '&.Mui-focused': {
                                                        fontWeight: 600,
                                                    },
                                                },
                                            }}
                                        >
                                            {field.options?.map((opt) => (
                                                <MenuItem
                                                    key={opt.value}
                                                    value={opt.value}
                                                    sx={{
                                                        borderRadius: 1,
                                                        mx: 1,
                                                        my: 0.5,
                                                        '&:hover': {
                                                            backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                                        },
                                                    }}
                                                >
                                                    {opt.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    );
                                case 'toggle':
                                    return (
                                        <Box
                                            key={field.name}
                                            sx={{
                                                p: 2.5,
                                                borderRadius: 2,
                                                backgroundColor: alpha(theme.palette.action.hover, 0.02),
                                                border: `1.5px solid ${alpha(theme.palette.divider, 0.2)}`,
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                '&:hover': {
                                                    backgroundColor: alpha(theme.palette.action.hover, 0.05),
                                                    borderColor: alpha(theme.palette.primary.main, 0.3),
                                                    transform: 'translateY(-1px)',
                                                    boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.05)}`,
                                                },
                                            }}
                                        >
                                            <Controller
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
                                                                sx={{
                                                                    '& .MuiSwitch-switchBase': {
                                                                        '&.Mui-checked': {
                                                                            '& + .MuiSwitch-track': {
                                                                                opacity: 1,
                                                                            },
                                                                        },
                                                                    },
                                                                    '& .MuiSwitch-track': {
                                                                        borderRadius: 3,
                                                                    },
                                                                }}
                                                            />
                                                        }
                                                        label={field.label}
                                                        sx={{
                                                            m: 0,
                                                            width: '100%',
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            ml: 0,
                                                            '& .MuiFormControlLabel-label': {
                                                                fontWeight: 500,
                                                            },
                                                        }}
                                                    />
                                                )}
                                            />
                                        </Box>
                                    );
                                default:
                                    return (
                                        <TextField
                                            key={field.name}
                                            label={field.label}
                                            type={field.fieldType || 'text'}
                                            {...register(field.name, { required: field.required })}
                                            error={!!errors[field.name]}
                                            helperText={
                                                errors[field.name]
                                                    ? `${field.label} الزامی است`
                                                    : ''
                                            }
                                            fullWidth
                                            placeholder={field.placeholder}
                                            variant="outlined"
                                            disabled={submitLoading}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2,
                                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    backgroundColor: alpha(theme.palette.action.hover, 0.02),
                                                    '& fieldset': {
                                                        borderColor: alpha(theme.palette.divider, 0.3),
                                                        borderWidth: 1.5,
                                                    },
                                                    '&:hover': {
                                                        backgroundColor: alpha(theme.palette.action.hover, 0.05),
                                                        '& fieldset': {
                                                            borderColor: alpha(theme.palette.primary.main, 0.4),
                                                        },
                                                    },
                                                    '&.Mui-focused': {
                                                        backgroundColor: 'transparent',
                                                        boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.08)}`,
                                                        '& fieldset': {
                                                            borderColor: theme.palette.primary.main,
                                                            borderWidth: 2,
                                                        },
                                                    },
                                                },
                                                '& .MuiInputLabel-root': {
                                                    fontWeight: 500,
                                                    '&.Mui-focused': {
                                                        fontWeight: 600,
                                                    },
                                                },
                                                '& .MuiInputBase-input': {
                                                    py: 1.75,
                                                },
                                            }}
                                        />
                                    );
                            }
                        })}
                    </Stack>
                </DialogContent>

                <DialogActions
                    sx={{
                        justifyContent: 'space-between',
                        p: { xs: 3, sm: 4 },
                        pt: 2,
                        gap: 2,
                        background: `linear-gradient(to top, ${alpha(theme.palette.action.hover, 0.02)} 0%, transparent 100%)`,
                        borderTop: `1px solid ${alpha(theme.palette.divider, 0.05)}`,
                    }}
                >
                    <Button
                        onClick={handleClose}
                        variant="outlined"
                        size="large"
                        fullWidth
                        disabled={submitLoading}
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            py: 1.5,
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            borderWidth: 1.5,
                            borderColor: alpha(theme.palette.divider, 0.3),
                            color: theme.palette.text.secondary,
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                                borderWidth: 1.5,
                                borderColor: theme.palette.text.secondary,
                                backgroundColor: alpha(theme.palette.action.hover, 0.05),
                                transform: 'translateY(-2px)',
                                boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.08)}`,
                            },
                            '&:active': {
                                transform: 'translateY(0)',
                            },
                        }}
                    >
                        {cancelLabel}
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={submitLoading}
                        startIcon={!submitLoading && <CheckCircleOutlineIcon />}
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            py: 1.5,
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
                            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                                boxShadow: `0 6px 24px ${alpha(theme.palette.primary.main, 0.4)}`,
                                transform: 'translateY(-2px)',
                            },
                            '&:active': {
                                transform: 'translateY(0)',
                            },
                            '&.Mui-disabled': {
                                background: alpha(theme.palette.action.disabledBackground, 0.12),
                                color: theme.palette.action.disabled,
                            },
                        }}
                    >
                        {submitLoading ? (
                            <Box display="flex" alignItems="center" gap={1.5}>
                                <CircularProgress size={18} color="inherit" thickness={4} />
                                <span>در حال افزودن...</span>
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