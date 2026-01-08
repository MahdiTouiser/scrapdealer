'use client'

import Image from 'next/image';

import {
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';

const Banner = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: { xs: 420, sm: 480, md: 520 },
                overflow: 'hidden',
            }}
        >
            <Image
                src="/images/banner.jpg"
                alt="banner"
                fill
                priority
                style={{ objectFit: 'cover' }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    px: 2,
                    gap: { xs: 1.5, sm: 2 },
                    textAlign: 'center',
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 900,
                        fontSize: { xs: 48, sm: 64, md: 80 },
                        color: '#06975C',
                        WebkitTextStroke: { xs: '.5px #FFFFFF', md: '2px #FFFFFF' },
                        lineHeight: 1,
                    }}
                >
                    ضایعات‌چی!
                </Typography>

                <Typography
                    sx={{
                        fontWeight: 900,
                        fontSize: { xs: 16, sm: 20, md: 24 },
                        lineHeight: { xs: '22px', md: '28px' },
                        color: '#fff',
                    }}
                >
                    بستری حرفه‌ای برای{' '}
                    <Box component="span" sx={{ color: '#06975C' }}>
                        اتصال فعالان
                    </Box>{' '}
                    بازار ضایعات
                </Typography>

                <Typography
                    sx={{
                        fontWeight: 900,
                        fontSize: { xs: 15, sm: 18, md: 24 },
                        lineHeight: { xs: '22px', md: '28px' },
                        color: '#fff',
                        maxWidth: 600,
                    }}
                >
                    جایی برای همکاری، شفافیت و رشد مشترک کسب‌وکارها
                </Typography>

                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    sx={{
                        mt: { xs: 2, sm: 3 },
                        gap: 2,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Button
                        sx={{
                            width: { xs: '100%', sm: 220 },
                            height: 48,
                            maxWidth: 280,
                            backgroundColor: '#06975C',
                            color: '#fff',
                            fontWeight: 900,
                            fontSize: 15,
                            border: '1px solid #FFFFFF',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            '&:hover': { backgroundColor: '#057749' },
                        }}
                    >
                        <Image src="/icons/note.svg" alt="icon" width={22} height={22} />
                        آموزش رایگان
                    </Button>

                    <Button
                        sx={{
                            width: { xs: '100%', sm: 220 },
                            height: 48,
                            maxWidth: 280,
                            backgroundColor: '#ffffff',
                            color: '#06975C',
                            fontWeight: 900,
                            fontSize: 15,
                            border: '1px solid #06975C',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            '&:hover': { backgroundColor: '#f0f0f0' },
                        }}
                    >
                        <Image src="/icons/direct-inbox.svg" alt="icon" width={22} height={22} />
                        دانلود اپلیکیشن اندرویدی
                    </Button>
                </Stack>
            </Box>
        </Box>
    )
}

export default Banner
