'use client'
import { colors } from '@/colors';
import { features } from '@/data';
import {
    Box,
    Container,
    Grid,
    Paper,
    Typography,
} from '@mui/material';

export default function FeaturesSection() {
    return (
        <Container sx={{ py: 10 }}>
            <Grid container spacing={4}>
                {features.map((item, i) => {
                    const IconComponent = item.icon;
                    return (
                        <Grid item xs={12} sm={6} md={3} key={i}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 4,
                                    textAlign: 'center',
                                    height: '100%',
                                    bgcolor: colors.light.surface,
                                    borderRadius: 3,
                                    transition: 'all 0.3s',
                                    border: `2px solid ${colors.light.secondary}`,
                                    '&:hover': {
                                        transform: 'translateY(-10px)',
                                        boxShadow: `0 12px 30px rgba(0, 200, 83, 0.15)`,
                                        borderColor: colors.light.primary
                                    }
                                }}
                            >
                                <Box sx={{ color: colors.light.primary, mb: 2 }}>
                                    <IconComponent sx={{ fontSize: 56 }} />
                                </Box>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    sx={{ mb: 1, color: colors.light.textPrimary }}
                                >
                                    {item.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: colors.light.textSecondary, lineHeight: 1.7 }}
                                >
                                    {item.desc}
                                </Typography>
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
}