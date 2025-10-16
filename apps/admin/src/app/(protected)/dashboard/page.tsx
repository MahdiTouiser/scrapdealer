'use client';

import PageTitle from '@/components/common/PageTitle';
import BarChartCard from '@/components/dashboard/BarChartCard';
import DateTimeCard from '@/components/dashboard/DateTimeCard';
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

const dailyStats = {
    buyers: 125,
    sellers: 78,
    invoices: 210,
    income: 35600000,
};

const kpiStats = {
    appInstalls: 5400,
    topSellers: 18,
    topBuyers: 25,
};

const buyersMonthly = [
    { month: 'فروردین', count: 320 },
    { month: 'اردیبهشت', count: 280 },
    { month: 'خرداد', count: 450 },
    { month: 'تیر', count: 410 },
    { month: 'مرداد', count: 370 },
    { month: 'شهریور', count: 520 },
    { month: 'مهر', count: 610 },
];

const sellersMonthly = [
    { month: 'فروردین', count: 150 },
    { month: 'اردیبهشت', count: 180 },
    { month: 'خرداد', count: 210 },
    { month: 'تیر', count: 260 },
    { month: 'مرداد', count: 240 },
    { month: 'شهریور', count: 290 },
    { month: 'مهر', count: 340 },
];

const totalIncome = [
    { month: 'فروردین', income: 1200000 },
    { month: 'اردیبهشت', income: 1800000 },
    { month: 'خرداد', income: 2200000 },
    { month: 'تیر', income: 2600000 },
    { month: 'مرداد', income: 3100000 },
    { month: 'شهریور', income: 4000000 },
    { month: 'مهر', income: 4600000 },
];

const pieData = [
    { name: 'آهن', value: 45 },
    { name: 'مس', value: 35 },
    { name: 'فولاد', value: 20 },
];

export default function DashboardPage() {
    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <PageTitle title={fa.adminDashboard} />

            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid size={3}>
                    <Item>
                        <DateTimeCard locale="fa-IR" />
                    </Item>
                </Grid>
                <Grid size={3}>
                    <Item>
                        <KpiCard title="تعداد نفرات نصب‌کننده نرم‌افزار" value={kpiStats.appInstalls.toLocaleString()} />
                    </Item>
                </Grid>
                <Grid size={3}>
                    <Item>
                        <KpiCard title="فروشنده موفق" value={kpiStats.topSellers} />
                    </Item>
                </Grid>
                <Grid size={3}>
                    <Item>
                        <KpiCard title="خریدار موفق" value={kpiStats.topBuyers} />
                    </Item>
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid size={3}>
                    <Item>
                        <KpiCard title="تعداد خریداران در طول روز" value={dailyStats.buyers} />
                    </Item>
                </Grid>
                <Grid size={3}>
                    <Item>
                        <KpiCard title="تعداد فروشندگان در طول روز" value={dailyStats.sellers} />
                    </Item>
                </Grid>
                <Grid size={3}>
                    <Item>
                        <KpiCard title="تعداد فاکتور ثبت‌شده در طول روز" value={dailyStats.invoices} />
                    </Item>
                </Grid>
                <Grid size={3}>
                    <Item>
                        <KpiCard title="درآمد روزانه ضایعات‌چی" value={`${dailyStats.income.toLocaleString()} تومان`} />
                    </Item>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid size={3}>
                    <Item>
                        <PieChartCard title="سهم فلزات در معاملات" data={pieData} />
                    </Item>
                </Grid>
                <Grid size={3}>
                    <Item>
                        <BarChartCard
                            title="تعداد خریداران ماه‌به‌ماه"
                            data={buyersMonthly}
                            xDataKey="month"
                            dataKey="count"
                        />
                    </Item>
                </Grid>
                <Grid size={3}>
                    <Item>
                        <BarChartCard
                            title="تعداد فروشندگان ماه‌به‌ماه"
                            data={sellersMonthly}
                            xDataKey="month"
                            dataKey="count"
                        />
                    </Item>
                </Grid>
                <Grid size={3}>
                    <Item>
                        <LineChartCard
                            title="درآمد کل ضایعات‌چی به‌صورت نقطه‌ای"
                            data={totalIncome}
                            xDataKey="month"
                            dataKeys={[{ key: 'income', color: '#8884d8' }]}
                        />
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}