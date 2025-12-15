import {
    Download,
    LocalShipping,
    Recycling,
    TrendingUp,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Container,
    keyframes,
    Stack,
    Typography,
} from '@mui/material';

const colors = {
    light: {
        primary: '#00b854',
        primaryDark: '#008c38',
        surface: '#ffffff',
        accent: '#e8f5e9',
    },
};

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-25px) rotate(5deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.8; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const rotateSlow = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export default function HeroBanner() {


    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: `linear-gradient(135deg, ${colors.light.primary} 0%, #00a043 40%, ${colors.light.primaryDark} 100%)`,
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M50 10 L60 30 L80 30 L65 45 L75 65 L50 50 L25 65 L35 45 L20 30 L40 30 Z\'/%3E%3C/g%3E%3C/svg%3E") repeat',
                    opacity: 0.6,
                },
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '-30%',
                    right: '-20%',
                    width: '800px',
                    height: '800px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 65%)',
                    animation: `${pulse} 12s ease-in-out infinite`,
                },
            }}
        >
            <Box sx={{ position: 'absolute', top: '10%', left: '5%', animation: `${float} 8s ease-in-out infinite`, zIndex: 0 }}>
                <Recycling sx={{ fontSize: { xs: 50, md: 90 }, color: 'white', opacity: 0.18 }} />
            </Box>
            <Box sx={{ position: 'absolute', bottom: '20%', left: '8%', animation: `${float} 9s ease-in-out infinite 1.5s`, zIndex: 0 }}>
                <LocalShipping sx={{ fontSize: { xs: 70, md: 110 }, color: 'white', opacity: 0.16 }} />
            </Box>
            <Box sx={{ position: 'absolute', top: '30%', right: '5%', animation: `${float} 10s ease-in-out infinite 3s`, zIndex: 0 }}>
                <TrendingUp sx={{ fontSize: { xs: 60, md: 80 }, color: 'white', opacity: 0.18 }} />
            </Box>

            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.04, animation: `${rotateSlow} 80s linear infinite`, zIndex: 0 }}>
                <Recycling sx={{ fontSize: { xs: 400, md: 600 }, color: 'white' }} />
            </Box>

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: { xs: 6, md: 10 } }}>
                <Box sx={{ maxWidth: 1100, mx: 'auto', textAlign: 'center' }}>
                    <Box
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 1.5,
                            bgcolor: 'rgba(255,255,255,0.18)',
                            backdropFilter: 'blur(12px)',
                            px: { xs: 3, md: 4 },
                            py: 1.5,
                            borderRadius: '50px',
                            mb: 4,
                            border: '1px solid rgba(255,255,255,0.25)',
                            animation: `${fadeInUp} 0.8s ease-out`,
                            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                        }}
                    >
                        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#fff', animation: `${pulse} 2s infinite` }} />
                        <Typography variant="subtitle1" color="white" fontWeight="700">
                            پلتفرم شماره ۱ خرید و فروش ضایعات در ایران
                        </Typography>
                    </Box>

                    <Typography
                        variant="h1"
                        color="white"
                        fontWeight="900"
                        sx={{
                            mb: 2,
                            fontSize: { xs: '3rem', sm: '4.2rem', md: '6rem' },
                            lineHeight: 1.05,
                            letterSpacing: '-0.03em',
                            textShadow: '0 6px 30px rgba(0,0,0,0.3)',
                            animation: `${fadeInUp} 1s ease-out 0.2s both`,
                        }}
                    >
                        ضایعات چی
                    </Typography>

                    <Typography
                        variant="h3"
                        color="white"
                        fontWeight="800"
                        sx={{
                            mb: 4,
                            opacity: 0.96,
                            fontSize: { xs: '1.8rem', sm: '2.4rem', md: '3rem' },
                            textShadow: '0 4px 20px rgba(0,0,0,0.2)',
                            animation: `${fadeInUp} 1s ease-out 0.4s both`,
                        }}
                    >
                        راه‌حل هوشمند خرید و فروش ضایعات
                    </Typography>

                    <Typography
                        variant="body1"
                        color="white"
                        sx={{
                            mb: 6,
                            opacity: 0.94,
                            fontSize: { xs: '1.15rem', md: '1.4rem' },
                            lineHeight: 2,
                            maxWidth: 800,
                            mx: 'auto',
                            textShadow: '0 2px 10px rgba(0,0,0,0.15)',
                            animation: `${fadeInUp} 1s ease-out 0.6s both`,
                        }}
                    >
                        قیمت‌های لحظه‌ای بازار را ببینید، درخواست فروش ثبت کنید و بهترین پیشنهادها را از خریداران معتبر دریافت کنید. ساده، سریع و سودآور!
                    </Typography>

                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        justifyContent="center"
                        spacing={4}
                        sx={{ mb: 7, animation: `${fadeInUp} 1s ease-out 0.8s both`, direction: 'ltr' }}
                    >
                        {[
                            { label: 'رضایت مشتری', value: '۹۸٪' },
                            { label: 'کاربر فعال', value: '+۱۰۰۰' },
                            { label: 'معامله موفق', value: '+۵۰۰۰' },
                        ].map((stat) => (
                            <Box
                                key={stat.value}
                                sx={{
                                    bgcolor: 'rgba(255,255,255,0.15)',
                                    backdropFilter: 'blur(10px)',
                                    px: { xs: 4, md: 6 },
                                    py: 3,
                                    borderRadius: 4,
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    minWidth: 180,
                                    transition: 'transform 0.3s',
                                    '&:hover': { transform: 'translateY(-8px)' },
                                }}
                            >
                                <Typography variant="h3" color="white" fontWeight="900" sx={{ fontSize: { xs: '2.2rem', md: '2.8rem' } }}>
                                    {stat.value}
                                </Typography>
                                <Typography variant="subtitle1" color="white" sx={{ opacity: 0.9 }}>
                                    {stat.label}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>

                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        justifyContent="center"
                        spacing={3}
                        sx={{ mb: 6, animation: `${fadeInUp} 1s ease-out 1s both` }}
                    >
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<Download />}
                            sx={{
                                bgcolor: 'white',
                                color: colors.light.primary,
                                fontWeight: 'bold',
                                px: { xs: 5, md: 7 },
                                py: 3,
                                fontSize: '1.3rem',
                                borderRadius: '20px',
                                boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                    bgcolor: 'white',
                                    transform: 'translateY(-6px) scale(1.03)',
                                    boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                                },
                            }}
                        >
                            دانلود اپ اندروید
                        </Button>


                    </Stack>

                    <Stack
                        direction="row"
                        justifyContent="center"
                        spacing={3}
                        sx={{ flexWrap: 'wrap', gap: 2, animation: `${fadeInUp} 1s ease-out 1.2s both` }}
                    >
                        <Typography variant="body2" color="white" sx={{ opacity: 0.85, alignSelf: 'center' }}>
                            مورد اعتماد:
                        </Typography>
                        {['مراکز بازیافت', 'کسب‌وکارهای بزرگ', 'افراد و فروشندگان'].map((item) => (
                            <Box
                                key={item}
                                sx={{
                                    px: 3,
                                    py: 1.5,
                                    borderRadius: '16px',
                                    bgcolor: 'rgba(255,255,255,0.15)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255,255,255,0.25)',
                                }}
                            >
                                <Typography variant="subtitle2" color="white" fontWeight="600">
                                    {item}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>
                </Box>
            </Container>

            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '200px',
                    background: 'white',
                    clipPath: 'ellipse(130% 100% at 50% 100%)',
                    zIndex: 1,
                }}
            />
        </Box>
    );
}