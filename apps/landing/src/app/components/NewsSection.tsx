'use client'
import { colors } from '@/colors';
import { news } from '@/data';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    Typography,
} from '@mui/material';

export default function NewsSection() {
    return (
        <Container sx={{ py: 10 }}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
                <Typography
                    variant="h3"
                    fontWeight="bold"
                    sx={{ mb: 2, color: colors.light.textPrimary }}
                >
                    اخبار و تبلیغات
                </Typography>
                <Typography variant="body1" sx={{ color: colors.light.textSecondary, fontSize: '1.1rem' }}>
                    آخرین اخبار و رویدادهای صنعت ضایعات
                </Typography>
            </Box>

            <Grid container spacing={4}>
                {news.map((item, i) => (
                    <Grid item xs={12} md={4} key={i}>
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
                                    boxShadow: `0 12px 30px rgba(0, 200, 83, 0.15)`,
                                    borderColor: colors.light.primary
                                }
                            }}
                        >
                            <CardContent sx={{ p: 4 }}>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        mb: 2,
                                        display: 'block',
                                        color: colors.light.textSecondary,
                                        fontSize: '0.85rem'
                                    }}
                                >
                                    {item.date}
                                </Typography>

                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    sx={{ mb: 2, color: colors.light.textPrimary }}
                                >
                                    {item.title}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{ mb: 3, color: colors.light.textSecondary, lineHeight: 1.8 }}
                                >
                                    {item.description}
                                </Typography>

                                <Button
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    sx={{
                                        bgcolor: colors.light.primary,
                                        py: 2,
                                        fontSize: '1.05rem',
                                        fontWeight: 'bold',
                                        '&:hover': { bgcolor: '#00a043' }
                                    }}
                                >
                                    ارسال پیام
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
