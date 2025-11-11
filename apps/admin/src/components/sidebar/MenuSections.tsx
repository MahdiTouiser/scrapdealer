import fa from '@/i18n/fa';
import {
    AdminPanelSettings,
    Dashboard,
    History,
    Home,
    LocationOn,
    ReceiptLong,
    Settings,
    ShoppingCart,
    Store,
    SupportAgent,
    VerifiedUser,
} from '@mui/icons-material';

import { MenuSection } from '../types';

export const MENU_SECTIONS: MenuSection[] = [
    {
        section: fa.main,
        collapsible: true,
        items: [
            { text: fa.mainPage, icon: <Home />, path: '/dashboard/main' },
            { text: fa.adminDashboard, icon: <Dashboard />, path: '/dashboard/admin-dashboard' },
        ],
    },
    {
        section: fa.sellersManagement,
        collapsible: true,
        items: [
            { text: 'فروشندگان خرد', icon: <Store />, path: '/sellers/retail' },
            { text: 'فروشندگان عمده', icon: <Store />, path: '/sellers/whole' },
            { text: 'احراز هویت فروشندگان', icon: <VerifiedUser />, path: '/sellers/verification' },
        ],
    },
    {
        section: fa.buyersManagement,
        collapsible: true,
        items: [
            { text: 'خریداران خرد', icon: <ShoppingCart />, path: '/buyers/retail' },
            { text: 'خریداران عمده', icon: <ShoppingCart />, path: '/buyers/whole' },
            { text: 'خریداران مکان ثابت', icon: <LocationOn />, path: '/buyers/fixed-location' },
            { text: 'احراز هویت خریداران', icon: <VerifiedUser />, path: '/buyers/verification' },
        ],
    },
    {
        section: fa.supports,
        collapsible: true,
        items: [
            { text: 'لیست پشتیبان‌ها', icon: <SupportAgent />, path: '/supports' },
            { text: 'مدیریت سطح دسترسی', icon: <AdminPanelSettings />, path: '/supports/permissions' },
            { text: 'پیگیری فعالیت‌ها', icon: <History />, path: '/supports/activity' },
        ],
    },
    {
        section: fa.adminRequests,
        collapsible: true,
        items: [
            { text: 'درخواست‌های جدید', icon: <AdminPanelSettings />, path: '/admin-requests/new' },
            { text: 'درخواست‌های بررسی شده', icon: <History />, path: '/admin-requests/reviewed' },
        ],
    },
    {
        section: fa.financialManagement,
        collapsible: true,
        items: [
            { text: 'تراکنش‌ها', icon: <ReceiptLong />, path: '/finance/transactions' },
        ],
    },
    {
        section: fa.settings,
        collapsible: true,
        items: [
            { text: 'تنظیمات سیستم', icon: <Settings />, path: '/settings' },
        ],
    },
];
