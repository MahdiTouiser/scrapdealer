'use client'
import { colors } from '@/colors';
import { prices } from '@/data';
import {
    Box,
    Card,
    CardContent,
    Chip,
    Container,
    Grid,
    Stack,
    Typography,
} from '@mui/material';

export default function PricesSection() {
    return (
        <Container sx={{ py: 10 }}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
                <Typography
                    variant="h3"
                    fontWeight="bold"
                    sx={{ mb: 2, color: colors.light.textPrimary }}
                >
                    قیمت و انواع ضایعات
                </Typography>
                <Typography variant="body1" sx={{ color: colors.light.textSecondary, fontSize: '1.1rem' }}>
                    قیمت‌های بروز شده هر ساعت
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {prices.map((item, i) => (
                    <Grid item xs={12} sm={6} md={4} key={i}>
                        <Card
                            elevation={0}
                            sx={{
                                height: '100%',
                                transition: 'all 0.3s',
                                bgcolor: colors.light.surface,
                                border: `2px solid ${colors.light.secondary}`,
                                borderRadius: 3,
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: `0 12px 30px rgba(0, 200, 83, 0.2)`,
                                    borderColor: colors.light.primary
                                }
                            }}
                        >
                            <CardContent sx={{ p: 3 }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                    <Typography
                                        variant="h5"
                                        fontWeight="bold"
                                        sx={{ color: colors.light.textPrimary }}
                                    >
                                        {item.name}
                                    </Typography>
                                    <Chip
                                        label={item.trend}
                                        size="small"
                                        sx={{
                                            bgcolor: item.up ? '#e8f5e9' : '#ffebee',
                                            color: item.up ? '#2e7d32' : '#c62828',
                                            fontWeight: 'bold',
                                            fontSize: '0.85rem'
                                        }}
                                    />
                                </Stack>

                                <Box sx={{ mb: 2, p: 2, bgcolor: colors.light.secondary, borderRadius: 2 }}>
                                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 1.5 }}>
                                        <Typography variant="body2" sx={{ color: colors.light.textSecondary }}>
                                            حداقل:
                                        </Typography>
                                        <Typography variant="h6" fontWeight="bold" sx={{ color: colors.light.textPrimary }}>
                                            {item.minPrice.toLocaleString()}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="body2" sx={{ color: colors.light.textSecondary }}>
                                            حداکثر:
                                        </Typography>
                                        <Typography variant="h6" fontWeight="bold" sx={{ color: colors.light.textPrimary }}>
                                            {item.maxPrice.toLocaleString()}
                                        </Typography>
                                    </Stack>
                                </Box>

                                <Typography
                                    variant="caption"
                                    sx={{ color: colors.light.textSecondary, fontSize: '0.9rem' }}
                                >
                                    {item.unit}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}