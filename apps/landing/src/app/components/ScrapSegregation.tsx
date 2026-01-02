'use client'

import Image from 'next/image';

import {
  Box,
  Button,
  Typography,
} from '@mui/material';

const ScrapSegregation = () => {
    return (
        <Box
            sx={{
                width: 1302,
                height: 140,
                borderRadius: '18px',
                backgroundColor: '#F5F5F5',
                mx: 'auto',
                my: 8,
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
                    src="/icons/truck.svg"
                    alt="truck"
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
                            color: 'black'
                        }}
                    >
                        راهنمای تفکیک صحیح ضایعات
                    </Typography>

                    <Typography
                        sx={{
                            fontWeight: 500,
                            fontSize: 18,
                            color: '#06975C'
                        }}
                    >
                        آموزش نحوه تفکیک صحیح ضایعات و حفظ محیط زیست                    </Typography>
                </Box>
            </Box>

            <Button
                sx={{
                    height: 70,
                    px: 4,
                    backgroundColor: 'black',
                    color: 'white',
                    fontWeight: 900,
                    fontSize: 22,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}
            >
                مشاهده کنید
                <Image
                    src="/icons/arrow-left-white.svg"
                    alt="arrow"
                    width={24}
                    height={24}
                />
            </Button>
        </Box>
    )
}

export default ScrapSegregation
