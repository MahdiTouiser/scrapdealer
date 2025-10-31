'use client';
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

import CloseIcon from '@mui/icons-material/Close';
import {
  alpha,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  FormControlLabel,
  IconButton,
  MenuItem,
  Stack,
  Switch,
  TextField,
  useTheme,
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
}

const CustomFormModal = ({
    open,
    onClose,
    title,
    onSubmit,
    fields,
    submitLabel = 'ثبت',
    cancelLabel = 'لغو',
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

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 300 }}
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    padding: 0,
                    boxShadow: theme.shadows[24],
                    background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.98)} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    overflow: 'hidden',
                },
            }}
            BackdropProps={{
                sx: {
                    backgroundColor: alpha(theme.palette.common.black, 0.6),
                    backdropFilter: 'blur(8px)',
                },
            }}
        >
            {/* Header with gradient background */}
            <Box
                sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    padding: 3,
                    position: 'relative',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '1px',
                        background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.common.white, 0.3)}, transparent)`,
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        fontWeight: 700,
                        fontSize: '1.5rem',
                        textAlign: 'center',
                        color: theme.palette.common.white,
                        padding: 0,
                        letterSpacing: '0.5px',
                    }}
                >
                    {title}
                </DialogTitle>
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 16,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: alpha(theme.palette.common.white, 0.9),
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.common.white, 0.15),
                            transform: 'translateY(-50%) rotate(90deg)',
                        },
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent sx={{ padding: 4, paddingTop: 3 }}>
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
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2.5,
                                                    transition: 'all 0.3s ease',
                                                    backgroundColor: alpha(theme.palette.background.default, 0.5),
                                                    '&:hover': {
                                                        backgroundColor: alpha(theme.palette.background.default, 0.8),
                                                    },
                                                    '&.Mui-focused': {
                                                        backgroundColor: theme.palette.background.paper,
                                                        boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`,
                                                    },
                                                },
                                            }}
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
                                        <Box
                                            key={field.name}
                                            sx={{
                                                padding: 2.5,
                                                borderRadius: 2.5,
                                                backgroundColor: alpha(theme.palette.background.default, 0.5),
                                                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                                transition: 'all 0.2s ease',
                                                '&:hover': {
                                                    backgroundColor: alpha(theme.palette.background.default, 0.8),
                                                    borderColor: alpha(theme.palette.primary.main, 0.3),
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
                                                                sx={{
                                                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                                                        '& + .MuiSwitch-track': {
                                                                            opacity: 1,
                                                                        },
                                                                    },
                                                                }}
                                                            />
                                                        }
                                                        label={field.label}
                                                        sx={{
                                                            margin: 0,
                                                            width: '100%',
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            marginLeft: 0,
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
                                            size="medium"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2.5,
                                                    transition: 'all 0.3s ease',
                                                    backgroundColor: alpha(theme.palette.background.default, 0.5),
                                                    '&:hover': {
                                                        backgroundColor: alpha(theme.palette.background.default, 0.8),
                                                    },
                                                    '&.Mui-focused': {
                                                        backgroundColor: theme.palette.background.paper,
                                                        boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`,
                                                    },
                                                },
                                                '& .MuiInputBase-input': {
                                                    padding: '14px 16px',
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
                        padding: 4,
                        paddingTop: 2,
                        gap: 2,
                        background: `linear-gradient(to top, ${alpha(theme.palette.background.default, 0.3)} 0%, transparent 100%)`,
                    }}
                >
                    <Button
                        onClick={handleClose}
                        color="secondary"
                        variant="outlined"
                        size="large"
                        sx={{
                            borderRadius: 2.5,
                            textTransform: 'none',
                            px: 4,
                            py: 1.2,
                            fontWeight: 600,
                            borderWidth: 2,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                borderWidth: 2,
                                transform: 'translateY(-2px)',
                                boxShadow: theme.shadows[4],
                            },
                        }}
                    >
                        {cancelLabel}
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{
                            borderRadius: 2.5,
                            textTransform: 'none',
                            px: 4,
                            py: 1.2,
                            fontWeight: 600,
                            boxShadow: `0 4px 14px 0 ${alpha(theme.palette.primary.main, 0.4)}`,
                            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                boxShadow: `0 6px 20px 0 ${alpha(theme.palette.primary.main, 0.5)}`,
                                transform: 'translateY(-2px)',
                            },
                            '&:active': {
                                transform: 'translateY(0)',
                            },
                        }}
                    >
                        {submitLabel}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default CustomFormModal;