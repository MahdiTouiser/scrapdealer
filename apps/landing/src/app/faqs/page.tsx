'use client'

import NextLink from 'next/link';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from '@mui/material';

const primaryGreen = '#06975C';

const faqs = [
    {
        question: 'چه نوع ضایعاتی را خریداری می‌کنید؟',
        answer: 'ما انواع ضایعات فلزی از جمله آهن، آلومینیوم، مس، برنج، استیل، رادیاتور، کابل و ضایعات مخلوط را با بهترین قیمت خریداری می‌کنیم.',
    },
    {
        question: 'قیمت ضایعات چگونه تعیین می‌شود؟',
        answer: 'قیمت‌ها بر اساس وزن خالص، نوع فلز، کیفیت و قیمت روز بازار جهانی و بورس فلزات ایران تعیین می‌شود. ما همیشه قیمت رقابتی و عادلانه ارائه می‌دهیم.',
    },
    {
        question: 'آیا برای حمل ضایعات خدماتی دارید؟',
        answer: 'بله! برای حجم‌های بالا، خدمات حمل رایگان با کامیون و جرثقیل ارائه می‌دهیم. کافی است با ما تماس بگیرید تا هماهنگی لازم انجام شود.',
    },
    {
        question: 'پرداخت به چه صورت است؟',
        answer: 'پرداخت نقدی و فوری پس از وزن‌کشی و تفکیک انجام می‌شود. برای حجم‌های بسیار بالا، امکان پرداخت بانکی نیز وجود دارد.',
    },
    {
        question: 'آیا ضایعات را تفکیک می‌کنید؟',
        answer: 'بله، تیم متخصص ما ضایعات مخلوط را به صورت حرفه‌ای تفکیک می‌کند تا حداکثر ارزش را برای شما ایجاد کنیم.',
    },
    {
        question: 'حداقل مقدار برای خرید چقدر است؟',
        answer: 'هیچ حداقل مقداری نداریم! حتی برای مقادیر کم هم با قیمت مناسب خریداری می‌کنیم.',
    },
    {
        question: 'چگونه می‌توانم قیمت روز را بدانم؟',
        answer: 'می‌توانید با شماره تماس یا واتساپ ما ارتباط برقرار کنید. همچنین قیمت‌های به‌روز را در سایت یا کانال تلگرام ما دنبال کنید.',
    },
    {
        question: 'آیا خدمات بازیافت صنعتی دارید؟',
        answer: 'بله، با کارخانه‌ها و صنایع همکاری داریم و خدمات جمع‌آوری منظم ضایعات صنعتی ارائه می‌دهیم.',
    },
];

const FaqsPage = () => {
    return (
        <Box
            dir="rtl"
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f8fbf9 0%, #e6f0ea 100%)',
                py: { xs: 10, md: 14 },
            }}
        >
            <Container maxWidth="md">
                <Stack spacing={4} textAlign="center" mb={12}>

                    <Typography
                        variant="h2"
                        component="h1"
                        fontWeight={800}
                        color={primaryGreen}
                        sx={{ fontSize: { xs: '2.8rem', md: '4rem' }, lineHeight: 1.2 }}
                    >
                        سوالات متداول
                    </Typography>
                    <Typography
                        variant="h5"
                        color="text.secondary"
                        sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' }, fontWeight: 500 }}
                    >
                        پاسخ به رایج‌ترین سوالاتی که مشتریان عزیز ما می‌پرسند
                    </Typography>
                </Stack>

                <Stack spacing={3}>
                    {faqs.map((faq, index) => (
                        <Accordion
                            key={index}
                            elevation={0}
                            sx={{
                                borderRadius: 4,
                                bgcolor: 'rgba(255, 255, 255, 0.85)',
                                backdropFilter: 'blur(12px)',
                                border: '1px solid rgba(6, 151, 92, 0.15)',
                                '&:before': { display: 'none' },
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    borderColor: primaryGreen,
                                    boxShadow: '0 12px 32px rgba(6, 151, 92, 0.15)',
                                },
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{ color: primaryGreen, fontSize: 32 }} />}
                                sx={{
                                    px: { xs: 3, md: 5 },
                                    py: 3,
                                    '& .MuiAccordionSummary-content': { my: 1 },
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    fontWeight={700}
                                    color="text.primary"
                                    sx={{ fontSize: { xs: '1.1rem', md: '1.3rem' } }}
                                >
                                    {faq.question}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ px: { xs: 3, md: 5 }, pb: 4 }}>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    sx={{ lineHeight: 1.8, fontSize: '1.05rem' }}
                                >
                                    {faq.answer}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Stack>

                <Box textAlign="center" mt={{ xs: 10, md: 14 }}>
                    <Typography
                        variant="h5"
                        fontWeight={600}
                        color={primaryGreen}
                        mb={3}
                    >
                        سوال دیگری دارید؟
                    </Typography>
                    <Typography variant="body1" color="text.secondary" mb={5}>
                        تیم پشتیبانی ما آماده پاسخگویی است!
                    </Typography>

                    <Button
                        component={NextLink}
                        href="/"
                        variant="contained"
                        size="large"
                        startIcon={<HomeIcon sx={{ ml: 2 }} />}
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
            </Container >
        </Box >
    );
};

export default FaqsPage;