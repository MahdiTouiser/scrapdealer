'use client'

import {
  Box,
  Button,
} from '@mui/material';

const Navbar = () => {
    return (
        <Box
            component="nav"
            sx={{
                height: 64,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    gap: 4
                }}
            >
                <Button sx={{ fontWeight: 700, color: 'black' }} disableRipple>خرید ضایعات</Button>
                <Button sx={{ fontWeight: 700, color: 'black' }} disableRipple>فروش ضایعات</Button>
                <Button sx={{ fontWeight: 700, color: 'black' }} disableRipple>بلاگ</Button>
                <Button sx={{ fontWeight: 700, color: 'black' }} disableRipple>ارتباط با ما</Button>
                <Button sx={{ fontWeight: 700, color: 'black' }} disableRipple>درباره ضایعات چی</Button>
            </Box>
        </Box>
    )
}

export default Navbar
