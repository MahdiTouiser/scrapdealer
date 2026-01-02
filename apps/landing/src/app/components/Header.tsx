'use client'

import Image from 'next/image';

import { Box } from '@mui/material';

const Header = () => {
    return (
        <Box
            component="header"
            sx={{
                height: '72px',
                backgroundColor: '#F5F5F5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Image
                src="/icons/headerIcon.png"
                alt="logo"
                width={130}
                height={36}
                priority
            />
        </Box>
    )
}

export default Header
