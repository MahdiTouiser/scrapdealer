'use client'
import { prices } from '@/data';
import {
    Box,
    Card,
    Container,
    Divider,
    Stack,
    Typography,
} from '@mui/material';

export default function PricesSection() {
    return (
        <Container sx={{ py: 6 }}>
            <Stack spacing={4}>
                {prices.map((cat, i) => (
                    <Card
                        key={i}
                        sx={{
                            p: 2,
                            borderRadius: 3,
                            border: '1px solid #e0e0e0',
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}
                        >
                            {cat.category}
                        </Typography>

                        <Stack spacing={2}>
                            {cat.items.map((item, idx) => (
                                <Box key={idx}>
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        sx={{ py: 1 }}
                                    >
                                        <Typography sx={{ fontSize: '1rem' }}>{item.name}</Typography>

                                        <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                            {item.price.toLocaleString()}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontSize: '0.9rem',
                                                fontWeight: 'bold',
                                                color: item.up ? '#2e7d32' : '#c62828'
                                            }}
                                        >
                                            {item.change.toLocaleString()} ({item.percent}%)
                                        </Typography>
                                    </Stack>

                                    {idx !== cat.items.length - 1 && <Divider />}
                                </Box>
                            ))}
                        </Stack>
                    </Card>
                ))}
            </Stack>
        </Container>
    )
}
