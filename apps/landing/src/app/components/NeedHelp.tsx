'use client'

import Image from 'next/image';

import {
  Box,
  Button,
  Typography,
} from '@mui/material';

const NeedHelp = () => {
    return (
        <Box
            sx={{
                maxWidth: 1302,
                mx: 'auto',
                mt: { xs: 4, md: 8 },
                px: { xs: 2, sm: 3 },
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    minHeight: { xs: 180, md: 140 },
                    borderRadius: '18px',
                    backgroundColor: '#06975C',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { xs: 'flex-start', md: 'center' },
                    justifyContent: 'space-between',
                    gap: { xs: 3, md: 0 },
                    px: { xs: 3, md: 8 },
                    py: { xs: 3, md: 0 },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: { xs: 2, md: 3 },
                    }}
                >
                    <Image
                        src="/icons/bell.svg"
                        alt="bell"
                        width={50}
                        height={50}
                    />

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0.5,
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 900,
                                fontSize: { xs: 20, sm: 24, md: 32 },
                                color: '#FFFFFF',
                            }}
                        >
                            نیاز به راهنمایی دارید؟
                        </Typography>

                        <Typography
                            sx={{
                                fontWeight: 500,
                                fontSize: { xs: 14, sm: 16, md: 18 },
                                color: '#FFFFFF',
                            }}
                        >
                            کارشناسان ضایعات‌چی پاسخگوی شما هستند
                        </Typography>
                    </Box>
                </Box>

                <Button
                    sx={{
                        width: { xs: '100%', sm: 'auto' },
                        height: { xs: 56, md: 70 },
                        px: { xs: 3, md: 4 },
                        backgroundColor: '#FFFFFF',
                        color: '#000000',
                        fontWeight: 900,
                        fontSize: { xs: 16, md: 22 },
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        '&:hover': { backgroundColor: '#F5F5F5' },
                    }}
                >
                    با ما در تماس باشید
                    <Image
                        src="/icons/arrow-left.svg"
                        alt="arrow"
                        width={20}
                        height={20}
                    />
                </Button>
            </Box>
        </Box>
    )
}

export default NeedHelp
