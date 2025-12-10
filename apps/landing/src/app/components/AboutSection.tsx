'use client'
import { colors } from '@/colors';
import {
    Box,
    Button,
    Container,
    Grid,
    Typography,
} from '@mui/material';

export default function AboutSection() {
    return (
        <Box sx={{ bgcolor: colors.light.surface, py: 10 }}>
            <Container>
                <Grid container spacing={8} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Typography
                            variant="h3"
                            fontWeight="bold"
                            sx={{ mb: 3, color: colors.light.textPrimary }}
                        >
                            درباره ضایعات چی
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ mb: 3, lineHeight: 2, color: colors.light.textSecondary, fontSize: '1.05rem' }}
                        >
                            ضایعات چی یک پلتفرم نوین برای خرید و فروش ضایعات است که با استفاده از فناوری‌های روز دنیا، فرآیند معامله را ساده و شفاف می‌کند.
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ mb: 4, lineHeight: 2, color: colors.light.textSecondary, fontSize: '1.05rem' }}
                        >
                            با ما می‌توانید قیمت‌های لحظه‌ای بازار را مشاهده کنید، درخواست فروش ثبت نمایید و در سریع‌ترین زمان ممکن، ضایعات خود را به فروش برسانید.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                bgcolor: colors.light.primary,
                                px: 5,
                                py: 1.5,
                                '&:hover': { bgcolor: '#00a043' }
                            }}
                        >
                            بیشتر بخوانید
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                height: 450,
                                bgcolor: colors.light.secondary,
                                borderRadius: 4,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: `3px dashed ${colors.light.primary}`,
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <Typography variant="h4" sx={{ color: colors.light.textSecondary }}>
                                لوگو / تصویر اپلیکیشن
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}