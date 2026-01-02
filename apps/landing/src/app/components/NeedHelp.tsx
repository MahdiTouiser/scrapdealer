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
                width: 1302,
                height: 140,
                borderRadius: '18px',
                backgroundColor: '#06975C',
                mx: 'auto',
                mt: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 8
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3
                }}
            >
                <Image
                    src="/icons/bell.svg"
                    alt="bell"
                    width={70}
                    height={70}
                />

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0.5
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: 900,
                            fontSize: 32,
                            color: '#FFFFFF'
                        }}
                    >
                        نیاز به راهنمایی دارید؟
                    </Typography>

                    <Typography
                        sx={{
                            fontWeight: 500,
                            fontSize: 18,
                            color: '#FFFFFF'
                        }}
                    >
                        کارشناسان ضایعات‌چی پاسخگوی شما هستند
                    </Typography>
                </Box>
            </Box>

            <Button
                sx={{
                    height: 70,
                    px: 4,
                    backgroundColor: '#FFFFFF',
                    color: '#000000',
                    fontWeight: 900,
                    fontSize: 22,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    '&:hover': { backgroundColor: '#F5F5F5' }
                }}
            >
                با ما در تماس باشید
                <Image
                    src="/icons/arrow-left.svg"
                    alt="arrow"
                    width={16}
                    height={16}
                />
            </Button>
        </Box>
    )
}

export default NeedHelp
