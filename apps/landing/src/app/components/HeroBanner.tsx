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
        surface: '#ffffff'
    }
};

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default function HeroBanner() {
    return (
        <Box
            sx={{
                minHeight: { xs: '80vh', md: '90vh' },
                background: `linear-gradient(135deg, ${colors.light.primary} 0%, #00a043 50%, #008c38 100%)`,
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
                    background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.04\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                },
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '-50%',
                    right: '-10%',
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                    animation: `${pulse} 8s ease-in-out infinite`,
                }
            }}
        >
            <Box sx={{ position: 'absolute', top: '15%', left: '10%', opacity: 0.15, animation: `${float} 6s ease-in-out infinite` }}>
                <Recycling sx={{ fontSize: 80, color: 'white' }} />
            </Box>
            <Box sx={{ position: 'absolute', bottom: '20%', right: '15%', opacity: 0.15, animation: `${float} 7s ease-in-out infinite 1s` }}>
                <LocalShipping sx={{ fontSize: 100, color: 'white' }} />
            </Box>
            <Box sx={{ position: 'absolute', top: '40%', right: '8%', opacity: 0.15, animation: `${float} 8s ease-in-out infinite 2s` }}>
                <TrendingUp sx={{ fontSize: 70, color: 'white' }} />
            </Box>

            <Container sx={{ position: 'relative', zIndex: 1 }}>
                <Box
                    sx={{
                        maxWidth: 900,
                        animation: `${fadeInUp} 1s ease-out`
                    }}
                >
                    {/* Badge */}
                    <Box
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 1,
                            bgcolor: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(10px)',
                            px: 3,
                            py: 1,
                            borderRadius: '50px',
                            mb: 3,
                            border: '1px solid rgba(255,255,255,0.3)'
                        }}
                    >
                        <Box
                            sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: '#fff',
                                animation: `${pulse} 2s ease-in-out infinite`
                            }}
                        />
                        <Typography
                            variant="body2"
                            color="white"
                            fontWeight="600"
                            sx={{ fontSize: '0.95rem' }}
                        >
                            پلتفرم شماره ۱ خرید و فروش ضایعات
                        </Typography>
                    </Box>

                    <Typography
                        variant="h1"
                        color="white"
                        fontWeight="900"
                        sx={{
                            mb: 3,
                            fontSize: { xs: '3rem', sm: '4rem', md: '5.5rem' },
                            lineHeight: 1.1,
                            textShadow: '0 4px 20px rgba(0,0,0,0.2)',
                            letterSpacing: '-0.02em'
                        }}
                    >
                        ضایعات چی
                    </Typography>

                    <Typography
                        variant="h4"
                        color="white"
                        fontWeight="700"
                        sx={{
                            mb: 3,
                            opacity: 0.95,
                            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                            textShadow: '0 2px 10px rgba(0,0,0,0.15)'
                        }}
                    >
                        راه حل هوشمند خرید و فروش ضایعات
                    </Typography>

                    <Typography
                        variant="body1"
                        color="white"
                        sx={{
                            mb: 5,
                            opacity: 0.92,
                            fontSize: { xs: '1.1rem', md: '1.3rem' },
                            lineHeight: 1.9,
                            maxWidth: 700,
                            textShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                    >
                        با ضایعات چی، قیمت‌های روز بازار را ببینید، درخواست فروش ثبت کنید و بهترین پیشنهاد را دریافت کنید. همین حالا شروع کنید!
                    </Typography>

                    {/* Stats */}
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={4}
                        sx={{ mb: 5 }}
                    >
                        {[
                            { label: 'کاربر فعال', value: '+۱۰۰۰' },
                            { label: 'معامله موفق', value: '+۵۰۰۰' },
                            { label: 'رضایت مشتری', value: '۹۸٪' }
                        ].map((stat, index) => (
                            <Box key={index} sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
                                <Typography
                                    variant="h3"
                                    color="white"
                                    fontWeight="900"
                                    sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}
                                >
                                    {stat.value}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="white"
                                    sx={{ opacity: 0.9, fontSize: '1rem' }}
                                >
                                    {stat.label}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<Download />}
                            sx={{
                                bgcolor: colors.light.surface,
                                color: colors.light.primary,
                                fontWeight: 'bold',
                                px: 5,
                                py: 2.5,
                                fontSize: '1.2rem',
                                borderRadius: '16px',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                                '&:hover': {
                                    bgcolor: colors.light.surface,
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 12px 40px rgba(0,0,0,0.3)'
                                },
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                        >
                            دانلود اندروید
                        </Button>

                        <Button
                            variant="outlined"
                            size="large"
                            sx={{
                                color: 'white',
                                borderColor: 'rgba(255,255,255,0.5)',
                                fontWeight: 'bold',
                                px: 5,
                                py: 2.5,
                                fontSize: '1.2rem',
                                borderRadius: '16px',
                                borderWidth: '2px',
                                backdropFilter: 'blur(10px)',
                                bgcolor: 'rgba(255,255,255,0.1)',
                                '&:hover': {
                                    borderColor: 'white',
                                    bgcolor: 'rgba(255,255,255,0.2)',
                                    borderWidth: '2px',
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
                                },
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                        >
                            مشاهده قیمت‌ها
                        </Button>
                    </Stack>

                    {/* Trust Badges */}
                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        sx={{ mt: 5, flexWrap: 'wrap', gap: 2 }}
                    >
                        <Typography variant="body2" color="white" sx={{ opacity: 0.8 }}>
                            قابل اعتماد برای:
                        </Typography>
                        {['مراکز بازیافت', 'کسب‌وکارها', 'افراد'].map((item, index) => (
                            <Box
                                key={index}
                                sx={{
                                    px: 2.5,
                                    py: 1,
                                    borderRadius: '12px',
                                    bgcolor: 'rgba(255,255,255,0.15)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255,255,255,0.2)'
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    color="white"
                                    fontWeight="600"
                                    sx={{ fontSize: '0.9rem' }}
                                >
                                    {item}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>
                </Box>
            </Container>

            {/* Bottom Wave */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '120px',
                    background: 'white',
                    clipPath: 'ellipse(100% 100% at 50% 100%)',
                    zIndex: 1
                }}
            />
        </Box>
    );
}