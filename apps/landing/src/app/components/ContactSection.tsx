'use client'
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from '@mui/material';

export default function Footer() {
    return (
        <Box sx={{ bgcolor: '#0a0a0a', color: 'white', py: 5 }}>
            <Container>
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                        © ۱۴۰۴ ضایعات چی. تمامی حقوق محفوظ است.
                    </Typography>
                    <Stack direction="row" spacing={3}>
                        <Button size="small" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                            حریم خصوصی
                        </Button>
                        <Button size="small" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                            قوانین و مقررات
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
}