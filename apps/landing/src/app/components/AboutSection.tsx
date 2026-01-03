'use client'

import Image from 'next/image';

import {
  Box,
  Typography,
} from '@mui/material';

const AboutSection = () => {
    return (
        <Box
            sx={{
                maxWidth: 1200,
                mx: 'auto',
                my: { xs: 6, sm: 8, md: 12 },
                p: { xs: 2, sm: 4, md: 0 },

                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                gap: { xs: 4, sm: 6, md: 8 },
                backgroundColor: '#F5F5F5',

            }}
        >
            <Box
                sx={{
                    width: { xs: 180, sm: 240, md: 320 },
                    height: { xs: 180, sm: 240, md: 320 },
                    borderRadius: { xs: 3, md: 4 },
                    overflow: 'hidden',
                    flexShrink: 0,
                    boxShadow: { xs: 2, md: 4 },
                }}
            >
                <Image
                    src="/images/banner.jpg"
                    alt="درباره ضایعات‌چی"
                    width={640}
                    height={640}
                    priority
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            </Box>

            <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 800,
                        fontSize: { xs: 28, sm: 32, md: 38 },
                        mb: { xs: 2, md: 3 },
                        color: '#1a1a1a',
                    }}
                >
                    ضایعات‌چی
                </Typography>

                <Typography
                    sx={{
                        fontSize: { xs: 15, sm: 16.5, md: 19 },
                        lineHeight: { xs: 1.95, md: 2.1 },
                        color: '#2d2d2d',
                        textAlign: { xs: 'center', md: 'justify' },
                        maxWidth: 680,
                        fontWeight: 400,
                    }}
                >
                    ضایعات‌چی یک بستر هوشمند برای خرید و فروش ضایعات است که فعالان این حوزه را به یکدیگر متصل می‌کند. این اپلیکیشن با هدف ساده‌سازی، شفاف‌سازی و نظم‌بخشی به فرآیند معاملات طراحی شده؛ بدون آن‌که نقش یا جایگاه هیچ‌یک از بازیگران این بازار را کمرنگ کند. ضایعات‌چی فضایی فراهم می‌کند تا خریداران، فروشندگان و واسطه‌ها در کنار هم تعامل مؤثرتری داشته باشند و با اطمینان و اعتماد بیشتری وارد معامله شوند.
                </Typography>
            </Box>
        </Box>
    );
};

export default AboutSection;