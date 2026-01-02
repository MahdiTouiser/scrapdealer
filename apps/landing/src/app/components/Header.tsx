'use client'

import Image from 'next/image';

import { Box } from '@mui/material';

const Header = () => {
    return (
        <Box
            component="header"
            sx={{
                height: { xs: 56, sm: 64, md: 72 },
                px: { xs: 2, sm: 3 },
                backgroundColor: '#F5F5F5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Image
                    src="/icons/headerIcon.png"
                    alt="logo"
                    width={110}
                    height={32}
                    priority
                />
            </Box>
        </Box>
    )
}

export default Header
