'use client'

import NextLink from 'next/link';

import HomeIcon from '@mui/icons-material/Home';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

const primaryGreen = '#06975C';

const scrapsData = [
    {
        title: 'ضایعات آهن',
        description:
            'ضایعات آهن شامل انواع آهن قراضه، ورق‌های آهنی، تیرآهن، میلگرد و قطعات صنعتی است. این مواد یکی از پرحجم‌ترین ضایعات فلزی هستند و بازیافت آن‌ها نقش مهمی در حفظ منابع طبیعی و کاهش آلودگی دارد.',
        features: [
            'قیمت مناسب و تقاضای بالا',
            'قابل بازیافت ۱۰۰%',
            'مناسب برای صنایع فولادسازی',
        ],
        imageUrl: 'https://lirp.cdn-website.com/6970c585/dms3rep/multi/opt/gettyimages-1731408702-1920w.JPG', // Clean aluminum recycling
    },
    {
        title: 'ضایعات آلومینیوم',
        description:
            'ضایعات آلومینیوم شامل قوطی‌ها، پروفیل‌ها، ورق‌ها، رادیاتورها و قطعات خودرو است. آلومینیوم یکی از ارزشمندترین فلزات بازیافتی است زیرا انرژی بازیافت آن تنها ۵% انرژی تولید اولیه نیاز دارد.',
        features: [
            'ارزش اقتصادی بالا',
            'سبک و مقاوم در برابر زنگ‌زدگی',
            'بازیافت نامحدود بدون از دست دادن کیفیت',
        ],
        imageUrl: 'https://lirp.cdn-website.com/6970c585/dms3rep/multi/opt/gettyimages-1731408702-1920w.JPG', // Clean aluminum recycling
    },
    {
        title: 'ضایعات مخلوط فلزی',
        description:
            'شامل ترکیب آهن، آلومینیوم، مس و سایر فلزات. ما این ضایعات را تفکیک کرده و با بهترین قیمت خریداری می‌کنیم تا حداکثر سود برای شما و محیط زیست ایجاد شود.',
        features: [
            'تفکیک حرفه‌ای',
            'پرداخت سریع',
            'حمل رایگان برای حجم بالا',
        ],
        imageUrl: 'https://www.reliance-foundry.com/wp-content/uploads/metal-recycling-facility.jpg', // High-quality mixed metal yard
    },
];

const ScrapsPage = () => {
    return (
        <Box
            dir="rtl"
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f8fbf9 0%, #e6f0ea 100%)',
                py: { xs: 10, md: 14 },
            }}
        >
            <Container maxWidth="lg">
                <Stack spacing={4} textAlign="center" mb={12}>

                    <Typography
                        variant="h2"
                        component="h1"
                        fontWeight={800}
                        color={primaryGreen}
                        sx={{ fontSize: { xs: '2.8rem', md: '4.2rem' }, lineHeight: 1.2 }}
                    >
                        انواع ضایعات فلزی
                    </Typography>
                    <Typography
                        variant="h5"
                        color="text.secondary"
                        maxWidth={900}
                        mx="auto"
                        sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' }, fontWeight: 500 }}
                    >
                        ما متخصص خرید انواع ضایعات آهن، آلومینیوم و فلزات دیگر هستیم. با قیمت روز، خدمات حرفه‌ای و تعهد به محیط زیست، بهترین تجربه را برای شما فراهم می‌کنیم.
                    </Typography>
                </Stack>

                <Grid container spacing={8} justifyContent="center">
                    {scrapsData.map((item, index) => (
                        <Grid size={{ xs: 12, sm: 8, md: 4 }} key={index}>
                            <Card
                                elevation={0}
                                sx={{
                                    height: '100%',
                                    borderRadius: 6,
                                    overflow: 'hidden',
                                    background: 'rgba(255, 255, 255, 0.85)',
                                    backdropFilter: 'blur(16px)',
                                    border: '1px solid rgba(6, 151, 92, 0.1)',
                                    transition: 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                    '&:hover': {
                                        transform: 'translateY(-20px)',
                                        boxShadow: '0 32px 64px rgba(6, 151, 92, 0.2)',
                                    },
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="320"
                                    image={item.imageUrl}
                                    alt={item.title}
                                    sx={{
                                        objectFit: 'cover',
                                        transition: 'transform 0.5s ease',
                                        '&:hover': { transform: 'scale(1.08)' },
                                    }}
                                />
                                <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                                    <Typography
                                        variant="h4"
                                        fontWeight={800}
                                        color={primaryGreen}
                                        gutterBottom
                                        sx={{ fontSize: { xs: '1.8rem', md: '2.2rem' } }}
                                    >
                                        {item.title}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        paragraph
                                        sx={{ mb: 4, lineHeight: 1.8, fontSize: '1.05rem' }}
                                    >
                                        {item.description}
                                    </Typography>
                                    <Divider sx={{ my: 3, borderColor: primaryGreen, opacity: 0.3 }} />
                                    <Stack spacing={2}>
                                        {item.features.map((feature, i) => (
                                            <Typography
                                                key={i}
                                                variant="body1"
                                                color="text.primary"
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    fontWeight: 500,
                                                    fontSize: '1.05rem',
                                                }}
                                            >
                                                <span style={{ color: primaryGreen, marginLeft: 12, fontSize: '1.4rem' }}>✓</span>
                                                {feature}
                                            </Typography>
                                        ))}
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Box textAlign="center" mt={{ xs: 10, md: 14 }}>
                    <Typography
                        variant="h4"
                        fontWeight={700}
                        color={primaryGreen}
                        mb={3}
                        sx={{ fontSize: { xs: '2rem', md: '2.8rem' } }}
                    >
                        آماده فروش ضایعات خود هستید؟
                    </Typography>
                    <Typography variant="h6" color="text.secondary" mb={6}>
                        همین حالا با ما تماس بگیرید و بهترین قیمت روز را دریافت کنید!
                    </Typography>

                    <Button
                        component={NextLink}
                        href="/"
                        variant="contained"
                        size="large"
                        startIcon={<HomeIcon sx={{ml:2}}/>}
                        sx={{
                            bgcolor: primaryGreen,
                            color: 'white',
                            px: { xs: 6, md: 8 },
                            py: 2,
                            borderRadius: 6,
                            fontWeight: 700,
                            fontSize: '1.3rem',
                            boxShadow: '0 12px 32px rgba(6, 151, 92, 0.35)',
                            transition: 'all 0.4s ease',
                            '&:hover': {
                                bgcolor: '#057a4a',
                                transform: 'translateY(-6px)',
                                boxShadow: '0 20px 40px rgba(6, 151, 92, 0.45)',
                            },
                        }}
                    >
                        بازگشت به صفحه اصلی
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default ScrapsPage;