'use client'
import { colors } from '@/colors';
import {
    Box,
    Container,
    Typography,
} from '@mui/material';

export default function VideoSection() {
    return (
        <Box sx={{ bgcolor: colors.light.surface, py: 10 }}>
            <Container>
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography
                        variant="h3"
                        fontWeight="bold"
                        sx={{ mb: 2, color: colors.light.textPrimary }}
                    >
                        ویدیو معرفی
                    </Typography>
                    <Typography variant="body1" sx={{ color: colors.light.textSecondary, fontSize: '1.1rem' }}>
                        آشنایی با امکانات و ویژگی‌های اپلیکیشن
                    </Typography>
                </Box>

                <Box
                    sx={{
                        maxWidth: 1000,
                        mx: 'auto',
                        borderRadius: 4,
                        overflow: 'hidden',
                        boxShadow: `0 20px 60px rgba(0, 200, 83, 0.2)`,
                        border: `3px solid ${colors.light.primary}`
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            paddingTop: '56.25%',
                            bgcolor: colors.light.textPrimary,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                textAlign: 'center'
                            }}
                        >
                            <Box
                                sx={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: '50%',
                                    bgcolor: colors.light.primary,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mx: 'auto',
                                    mb: 2
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 0,
                                        height: 0,
                                        borderLeft: '25px solid white',
                                        borderTop: '15px solid transparent',
                                        borderBottom: '15px solid transparent',
                                        mr: -1
                                    }}
                                />
                            </Box>
                            <Typography
                                variant="h6"
                                sx={{ color: 'white', opacity: 0.7 }}
                            >
                                ویدیو معرفی اینجا قرار می‌گیرد
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}