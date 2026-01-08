'use client'
import React from 'react';

import Link from 'next/link';

import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/LocalPhone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

const primaryGreen = '#06975C';

const contactLinks = [
    {
        label: 'واتساپ',
        text: 'چت مستقیم',
        icon: <WhatsAppIcon />,
        href: 'https://wa.me/your-number',
        color: '#25D366',
    },
    {
        label: 'اینستاگرام',
        text: '@your-profile',
        icon: <InstagramIcon />,
        href: 'https://instagram.com/your-profile',
        color: '#E4405F',
    },
    {
        label: 'ایمیل',
        text: 'info@scrapdealer.com',
        icon: <EmailIcon />,
        href: 'mailto:info@scrapdealer.com',
        color: primaryGreen,
    },
    {
        label: 'تماس تلفنی',
        text: '+98 912 345 6789',
        icon: <PhoneIcon />,
        href: 'tel:+989123456789',
        color: primaryGreen,
    },
];

const ContactPage = () => {

    return (
        <Box
            dir="ltr"
            sx={{
                minHeight: '100vh',
                background: `linear-gradient(135deg, #f5f7fa 0%, #e4efe8 100%)`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                py: { xs: 8, md: 12 },
                px: 3,
            }}
        >
            <Box sx={{ maxWidth: 1100, mx: 'auto', textAlign: 'center', flexGrow: 1 }}>
                <Typography
                    variant="h3"
                    component="h1"
                    fontWeight={700}
                    color={primaryGreen}
                    mb={3}
                    sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}
                >
                    ارتباط با ما
                </Typography>
                <Typography
                    variant="h6"
                    color="text.secondary"
                    mb={10}
                    maxWidth={700}
                    mx="auto"
                    sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}
                >
                    ما همیشه در دسترس هستیم. از راه‌های زیر با ما تماس بگیرید:
                </Typography>

                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 5, sm: 8 }}
                    justifyContent="center"
                    alignItems="center"
                >
                    {contactLinks.map((item) => (
                        <Card
                            key={item.label}
                            elevation={4}
                            sx={{
                                width: { xs: '100%', sm: 260 },
                                height: 320,
                                borderRadius: 5,
                                background: 'rgba(255, 255, 255, 0.65)',
                                backdropFilter: 'blur(12px)',
                                border: `1px solid rgba(255, 255, 255, 0.3)`,
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                    transform: 'translateY(-16px) scale(1.05)',
                                    boxShadow: `0 24px 48px rgba(6, 151, 92, 0.25)`,
                                },
                            }}
                        >
                            <CardActionArea
                                component="a"
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 5,
                                    p: 3,
                                }}
                            >
                                <Box
                                    sx={{
                                        mb: 4,
                                        p: 3,
                                        borderRadius: '50%',
                                        backgroundColor: `${item.color}15`,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: `${item.color}30`,
                                            transform: 'scale(1.1)',
                                        },
                                    }}
                                >
                                    <IconButton
                                        sx={{
                                            color: item.color,
                                            pointerEvents: 'none',
                                        }}
                                        disableRipple
                                    >
                                        {React.cloneElement(item.icon, { sx: { fontSize: 64 } })}
                                    </IconButton>
                                </Box>

                                <Typography variant="h5" fontWeight={700} color="text.primary" gutterBottom>
                                    {item.label}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color={item.color}
                                    fontWeight={600}
                                    sx={{
                                        fontSize: '1.1rem',
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    {item.text}
                                </Typography>
                            </CardActionArea>
                        </Card>
                    ))}
                </Stack>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 10, pb: { xs: 4, md: 6 } }}>
                <Button
                    component={Link}
                    href="/"
                    variant="contained"
                    size="large"
                    endIcon={<HomeIcon />}
                    sx={{
                        bgcolor: primaryGreen,
                        color: 'white',
                        px: 5,
                        py: 1.5,
                        borderRadius: 4,
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        boxShadow: '0 8px 24px rgba(6, 151, 92, 0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            bgcolor: '#057a4a',
                            transform: 'translateY(-4px)',
                            boxShadow: '0 12px 32px rgba(6, 151, 92, 0.4)',
                        },
                    }}
                >
                    بازگشت به صفحه اصلی
                </Button>
            </Box>
        </Box>
    );
};

export default ContactPage;