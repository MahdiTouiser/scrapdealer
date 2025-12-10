'use client'
import { colors } from '@/colors';
import {
    Box,
    Button,
    Chip,
    Container,
    Stack,
    Typography,
} from '@mui/material';

export default function HeroBanner() {
    return (
        <Box
            sx={{
                minHeight: { xs: 400, md: 550 },
                background: `linear-gradient(135deg, ${colors.light.primary} 0%, #00a043 100%)`,
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.08\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                }
            }}
        >
            <Container sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ maxWidth: 800 }}>
                    <Chip
                        label="نسخه جدید"
                        sx={{
                            mb: 2,
                            bgcolor: 'rgba(255,255,255,0.25)',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '0.9rem'
                        }}
                    />
                    <Typography
                        variant="h2"
                        color="white"
                        fontWeight="800"
                        sx={{ mb: 2, fontSize: { xs: '2.5rem', md: '4rem' } }}
                    >
                        ضایعات چی
                    </Typography>
                    <Typography
                        variant="h5"
                        color="white"
                        sx={{ mb: 3, opacity: 0.95, fontSize: { xs: '1.2rem', md: '1.8rem' } }}
                    >
                        راه حل هوشمند خرید و فروش ضایعات
                    </Typography>
                    <Typography
                        variant="body1"
                        color="white"
                        sx={{ mb: 4, opacity: 0.9, fontSize: '1.1rem', lineHeight: 1.8 }}
                    >
                        با اسکرپ دیلر، قیمت‌های روز بازار را ببینید، درخواست فروش ثبت کنید و بهترین پیشنهاد را دریافت کنید
                    </Typography>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                bgcolor: colors.light.surface,
                                color: colors.light.primary,
                                fontWeight: 'bold',
                                px: 5,
                                py: 2,
                                fontSize: '1.1rem',
                                '&:hover': {
                                    bgcolor: colors.light.surface,
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
                                },
                                transition: 'all 0.3s'
                            }}
                        >
                            دانلود اندروید
                        </Button>

                    </Stack>
                </Box>
            </Container>
        </Box>
    );
}