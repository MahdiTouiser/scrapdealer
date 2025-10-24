import fa from '@/i18n/fa';
import {
    AdminPanelSettings,
    BarChart,
    Category,
    Dashboard,
    History,
    ReceiptLong,
    Security,
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
        items: [
            { text: fa.dashboard, icon: <Dashboard />, path: '/dashboard' },
        ],
    },
    {
        section: 'مدیریت فروشندگان',
        collapsible: true,
        items: [
            { text: 'فروشندگان خرد', icon: <Store />, path: '/sellers/retail' },
            { text: 'فروشندگان عمده', icon: <Store />, path: '/sellers/whole' },
            { text: 'احراز هویت فروشندگان', icon: <VerifiedUser />, path: '/sellers/verification' },
        ],
    },
    {
        section: 'مدیریت خریداران',
        collapsible: true,
        items: [
            { text: 'خریداران خرد', icon: <ShoppingCart />, path: '/buyers/retail' },
            { text: 'خریداران عمده', icon: <ShoppingCart />, path: '/buyers/whole' },
            { text: 'احراز هویت خریداران', icon: <VerifiedUser />, path: '/buyers/verification' },
        ],
    },
    {
        section: 'پشتیبان‌ها',
        collapsible: true,
        items: [
            { text: 'لیست پشتیبان‌ها', icon: <SupportAgent />, path: '/supports' },
            { text: 'مدیریت سطح دسترسی', icon: <AdminPanelSettings />, path: '/supports/permissions' },
            { text: 'پیگیری فعالیت‌ها', icon: <History />, path: '/supports/activity' },
        ],
    },
    {
        section: 'مدیریت مالی',
        collapsible: true,
        items: [
            { text: 'تراکنش‌ها', icon: <ReceiptLong />, path: '/finance/transactions' },
            { text: 'گزارشات مالی', icon: <BarChart />, path: '/finance/reports' },
        ],
    },
    {
        section: 'تنظیمات سیستم',
        collapsible: true,
        items: [
            { text: 'تنظیمات کلی', icon: <Settings />, path: '/settings' },
            { text: 'دسته‌بندی‌ها', icon: <Category />, path: '/categories' },
            { text: 'مدیریت نقش‌ها', icon: <Security />, path: '/roles' },
        ],
    },
];
