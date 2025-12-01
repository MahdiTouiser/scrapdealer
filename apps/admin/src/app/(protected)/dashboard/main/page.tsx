'use client';

import React from 'react';

import PageTitle from '@/components/common/PageTitle';
import CategoryPriceManager
  from '@/components/dashboard/categories/CategoryPriceManager';
import CommissionControl from '@/components/dashboard/CommissionControl';
import KpiCard from '@/components/dashboard/KpiCard';
import NotificationsPanel from '@/components/dashboard/NotificationsPanel';
import TransactionsTable from '@/components/dashboard/TransactionsTable';
import fa from '@/i18n/fa';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import {
  Item,
  kpiStats,
} from '../admin-dashboard/page';

const MainPage: React.FC = () => {
    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <PageTitle title={fa.mainPage} />

            <Grid container spacing={2} mb={3}>
                <Grid size={2.4}>
                    <Item>
                        <KpiCard title="تعداد خریدها" value="142" />
                    </Item>
                </Grid>
                <Grid size={2.4}>
                    <Item>
                        <KpiCard title="تعداد فروش‌ها" value="98" />
                    </Item>
                </Grid>
                <Grid size={2.4}>
                    <Item>
                        <KpiCard title="درصد کمیسیون فعلی" value="4%" />
                    </Item>

                </Grid>
                <Grid size={2.4}>
                    <Item>
                        <KpiCard title="فروشنده موفق" value={kpiStats.topSellers} />
                    </Item>
                </Grid>
                <Grid size={2.4}>
                    <Item>
                        <KpiCard title="خریدار موفق" value={kpiStats.topBuyers} />
                    </Item>
                </Grid>

            </Grid>

            <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" mb={1}>مدیریت قیمت ضایعات</Typography>
                <Divider sx={{ mb: 2 }} />
                <CategoryPriceManager />
            </Paper>

            <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" mb={1}>تراکنش‌های خرید و فروش</Typography>
                <Divider sx={{ mb: 2 }} />
                <TransactionsTable />
            </Paper>

            <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" mb={1}>تنظیم درصد کمیسیون</Typography>
                <Divider sx={{ mb: 2 }} />
                <CommissionControl />
            </Paper>

            <Paper sx={{ p: 2 }}>
                <Typography variant="h6" mb={1}>ارسال اعلان به کاربران</Typography>
                <Divider sx={{ mb: 2 }} />
                <NotificationsPanel />
            </Paper>
        </Box>
    );
};

export default MainPage;
