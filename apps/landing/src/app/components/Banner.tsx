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
                maxWidth: 1440,
                height: 500,
                margin: '0 auto'
            }}
        >
            <Image
                src="/images/banner.jpg"
                alt="banner"
                width={1440}
                height={500}
                priority
            />

            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: 2
                }}
            >
                <Typography
                    sx={{
                        fontWeight: '900',
                        fontSize: 80,
                        color: '#06975C',
                        WebkitTextStroke: '3px #FFFFFF',
                        textAlign: 'center'
                    }}
                >
                    ضایعات‌چی!
                </Typography>
                <Typography
                    sx={{
                        fontWeight: 900,
                        fontSize: 24,
                        lineHeight: '28px',
                        color: '#fff',
                        textAlign: 'center'
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
                        fontSize: 24,
                        lineHeight: '28px',
                        color: '#fff',
                        textAlign: 'center'
                    }}
                >
                    جایی برای همکاری، شفافیت و رشد مشترک کسب‌وکارها
                </Typography>

                <Stack direction="row" sx={{ mt: 3, gap: '16px' }}>
                    <Button
                        sx={{
                            width: 220,
                            height: 50,
                            backgroundColor: '#06975C',
                            color: '#fff',
                            fontWeight: 900,
                            border: '1px solid #FFFFFF',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 1,
                            '&:hover': { backgroundColor: '#057749' }
                        }}
                    >
                        <Image
                            src="/icons/note.svg"
                            alt="icon"
                            width={24}
                            height={24}
                        />
                        آموزش رایگان
                    </Button>

                    <Button
                        sx={{
                            width: 220,
                            height: 50,
                            backgroundColor: '#ffffff',
                            color: '#06975C',
                            fontWeight: 900,
                            border: '1px solid #06975C',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 1,
                            '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                    >
                        <Image
                            src="/icons/direct-inbox.svg"
                            alt="icon"
                            width={24}
                            height={24}
                        />
                        دانلود اپلیکیشن اندرویدی
                    </Button>


                </Stack>
            </Box>
        </Box>
    )
}

export default Banner
