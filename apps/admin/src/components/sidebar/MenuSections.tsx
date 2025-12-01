import fa from '@/i18n/fa';
import {
    AdminPanelSettings,
    Dashboard,
    Description,
    History,
    Home,
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
            { text: fa.mainPage, icon: <Home />, path: '/dashboard/main', key: 'Permissions.Menu.Dashboard' },
            { text: fa.adminDashboard, icon: <Dashboard />, path: '/dashboard/admin-dashboard', key: 'Permissions.Menu.Dashboard' },
        ],
    },
    {
        section: fa.sellersManagement,
        collapsible: true,
        items: [
            { text: 'فروشندگان ', icon: <Store />, path: '/sellers', key: 'Permissions.Menu.Sellers' },
            { text: 'احراز هویت فروشندگان', icon: <VerifiedUser />, path: '/sellers/verification', key: 'Permissions.Menu.SellersVerification' },
        ],
    },
    {
        section: fa.buyersManagement,
        collapsible: true,
        items: [
            { text: 'خریداران', icon: <ShoppingCart />, path: '/buyers', key: 'Permissions.Menu.RetailBuyer' },
            { text: 'احراز هویت خریداران', icon: <VerifiedUser />, path: '/buyers/verification', key: 'Permissions.Menu.BuyersVerification' },
        ],
    },
    {
        section: fa.supports,
        collapsible: true,
        items: [
            { text: 'لیست پشتیبان‌ها', icon: <SupportAgent />, path: '/supports', key: 'Permissions.Menu.Supports' },
            { text: 'مدیریت سطح دسترسی', icon: <AdminPanelSettings />, path: '/supports/permissions', key: 'Permissions.Menu.Permissions' },
            // { text: 'پیگیری فعالیت‌ها', icon: <History />, path: '/supports/activity', key: 'Permissions.Menu.SupportsActivity' },
        ],
    },
    {
        section: fa.adminRequests,
        collapsible: true,
        items: [
            { text: 'درخواست‌های جدید', icon: <AdminPanelSettings />, path: '/admin-requests/new', key: 'Permissions.Menu.NewRequests' },
            { text: 'درخواست‌های بررسی شده', icon: <History />, path: '/admin-requests/reviewed', key: 'Permissions.Menu.ReviewedRequests' },
        ],
    },
    {
        section: fa.financialManagement,
        collapsible: true,
        items: [
            // { text: 'تراکنش‌ها', icon: <ReceiptLong />, path: '/finance/transactions', key: 'Permissions.Menu.Transactions' },
            { text: 'فاکتورها', icon: <Description />, path: '/finance/invoices', key: 'Permissions.Menu.Invoices' },
        ],
    },
    {
        section: 'پرسش‌ها و پاسخ‌ها',
        collapsible: true,
        items: [
            { text: 'سوالات کاربران', icon: <AdminPanelSettings />, path: '/questions', key: 'Permissions.Menu.FAQ' },
            { text: 'پاسخ‌های ثبت شده', icon: <History />, path: '/questions/answers', key: 'Permissions.Menu.FAQ' },
        ],
    },
    {
        section: 'اخبار',
        collapsible: true,
        items: [
            { text: 'لیست اخبار', icon: <Description />, path: '/news', key: 'Permissions.Menu.News' },
        ],
    },
    {
        section: fa.settings,
        collapsible: true,
        items: [
            { text: 'تنظیمات سیستم', icon: <Settings />, path: '/settings', key: 'Permissions.Menu.Settings' },
        ],
    },
];
