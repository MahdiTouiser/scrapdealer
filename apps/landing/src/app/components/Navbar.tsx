'use client'
import Image from 'next/image';

import { colors } from '@/colors';
import { Menu as MenuIcon } from '@mui/icons-material';
import {
    AppBar,
    Box,
    Button,
    Container,
    IconButton,
    Stack,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';

export default function Navbar() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                bgcolor: colors.light.surface,
                borderBottom: `1px solid ${colors.light.secondary}`
            }}
        >
            <Container>
                <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box
                            sx={{
                                width: 50,
                                height: 50,
                                bgcolor: colors.light.secondary,
                                borderRadius: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Image src="/icons/logo.png" alt="icon" width={30} height={30} />
                        </Box>
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            sx={{ color: colors.light.textPrimary }}
                        >
                            ضایعات چی
                        </Typography>
                    </Box>

                    {!isMobile && (
                        <Stack direction="row" spacing={3}>
                            <Button sx={{ color: colors.light.textPrimary }}>خانه</Button>
                            <Button sx={{ color: colors.light.textPrimary }}>قیمت‌ها</Button>
                            <Button sx={{ color: colors.light.textPrimary }}>درباره ما</Button>
                            <Button sx={{ color: colors.light.textPrimary }}>تماس با ما</Button>
                        </Stack>
                    )}

                    {isMobile && (
                        <IconButton>
                            <MenuIcon sx={{ color: colors.light.textPrimary }} />
                        </IconButton>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}