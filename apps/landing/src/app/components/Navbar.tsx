'use client'

import Link from 'next/link';

import {
  Box,
  Button,
} from '@mui/material';

const Navbar = () => {
    return (
        <Box
            component="nav"
            sx={{
                height: { xs: 56, sm: 64 },
                overflowX: 'auto',
                display: 'flex',
                alignItems: 'center',
                px: 2,
                borderTop: '1px solid #e0e0e0',
                borderBottom: '1px solid #e0e0e0',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    gap: { xs: 2.5, sm: 4 },
                    mx: 'auto',
                    whiteSpace: 'nowrap',
                }}
            >
                {/* <Button sx={{ fontWeight: 700, color: '#000', fontSize: { xs: 14, sm: 15 } }} disableRipple>
                    خرید ضایعات
                </Button>
                <Button sx={{ fontWeight: 700, color: '#000', fontSize: { xs: 14, sm: 15 } }} disableRipple>
                    فروش ضایعات
                </Button> */}
                <Link href="/scraps" passHref>
                    <Button sx={{ fontWeight: 700, color: '#000', fontSize: { xs: 14, sm: 15 } }} disableRipple>
                        معرفی ضایعات
                    </Button>
                </Link>


                <Link href="/contact" passHref>
                    <Button sx={{ fontWeight: 700, color: '#000', fontSize: { xs: 14, sm: 15 } }} disableRipple>
                        ارتباط با ما
                    </Button>
                </Link>

                <Link href="/faqs" passHref>
                    <Button sx={{ fontWeight: 700, color: '#000', fontSize: { xs: 14, sm: 15 } }} disableRipple>
                        سوالات متداول
                    </Button>
                </Link>

            </Box>
        </Box>
    )
}

export default Navbar
