'use client';

import PageTitle from '@/components/common/PageTilte';
import BarChartCard from '@/components/dashboard/BarChartCard';
import KpiCard from '@/components/dashboard/KpiCard';
import LineChartCard from '@/components/dashboard/LineChartCard';
import PieChartCard from '@/components/dashboard/PieChartCard';
import fa from '@/i18n/fa';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    borderRadius: 8,
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

const salesData = [
    { month: 'فروردین', sales: 4000, revenue: 2400 },
    { month: 'اردیبهشت', sales: 3000, revenue: 1398 },
    { month: 'خرداد', sales: 2000, revenue: 9800 },
    { month: 'تیر', sales: 2780, revenue: 3908 },
    { month: 'مرداد', sales: 1890, revenue: 4800 },
    { month: 'شهریور', sales: 2390, revenue: 3800 },
    { month: 'مهر', sales: 3490, revenue: 4300 },
];

const projectsData = [
    { name: 'پروژه A', value: 400 },
    { name: 'پروژه B', value: 300 },
    { name: 'پروژه C', value: 300 },
    { name: 'پروژه D', value: 200 },
];

export default function DashboardPage() {
    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <PageTitle title={fa.adminDashboard} />
            {/* <Typography
                variant="h4"
                component="h1"
                sx={{ mb: 4, fontWeight: "bold" }}
            >
                {fa.adminDashboard}
            </Typography> */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid size={3}>
                    <Item>
                        <KpiCard title="تعداد خریداران" value={1234} />
                    </Item>
                </Grid>
                <Grid size={3}>
                    <Item>
                        <KpiCard title="درآمد کل" value="5,678,000 تومان" />
                    </Item>
                </Grid>
                <Grid size={3}>
                    <Item>
                        <KpiCard title="پروژه‌ها" value={24} />
                    </Item>
                </Grid>
                <Grid size={3}>
                    <Item>
                        <KpiCard title="سفارشات امروز" value={56} />
                    </Item>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid size={4}>
                    <Item>
                        <LineChartCard
                            title="فروش ماهانه"
                            data={salesData}
                            xDataKey="month"
                            dataKeys={[
                                { key: 'sales', color: '#8884d8' },
                                { key: 'revenue', color: '#82ca9d' },
                            ]}
                        />
                    </Item>
                </Grid>
                <Grid size={4}>
                    <Item>
                        <BarChartCard title="درآمد پروژه‌ها" data={salesData} xDataKey="month" dataKey="revenue" />
                    </Item>
                </Grid>
                <Grid size={4}>
                    <Item>
                        <PieChartCard title="توزیع پروژه‌ها" data={projectsData} />
                    </Item>
                </Grid>

            </Grid>
        </Box>
    );
}
