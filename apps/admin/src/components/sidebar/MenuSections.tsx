import fa from '@/i18n/fa';
import {
    AdminPanelSettings,
    BarChart,
    Campaign,
    CardGiftcard,
    Category,
    Chat,
    Dashboard,
    Feedback,
    History,
    Inventory,
    Newspaper,
    Percent,
    PriceChange,
    ReceiptLong,
    ReportProblem,
    Security,
    Settings,
    ShoppingCart,
    StarHalf,
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
            { text: 'لیست فروشندگان', icon: <Store />, path: '/sellers' },
            { text: 'احراز هویت فروشندگان', icon: <VerifiedUser />, path: '/sellers/verification' },
            { text: 'آگهی‌های ثبت‌شده', icon: <Inventory />, path: '/sellers/ads' },
            { text: 'تخفیف‌ها', icon: <Percent />, path: '/sellers/discounts' },
            { text: 'اخبار', icon: <Newspaper />, path: '/sellers/news' },
            { text: 'قیمت‌ها', icon: <PriceChange />, path: '/sellers/prices' },
            { text: 'تبلیغات', icon: <Campaign />, path: '/sellers/ads-management' },
            { text: 'شکایات فروشندگان', icon: <ReportProblem />, path: '/sellers/complaints' },
        ],
    },
    {
        section: 'مدیریت خریداران',
        collapsible: true,
        items: [
            {
                text: 'خریداران خرد',
                icon: <ShoppingCart />,
                path: '/buyers/retail',
            },
            {
                text: 'خریداران عمده',
                icon: <ShoppingCart />,
                path: '/buyers/wholesale',
            },
            { text: 'احراز هویت خریداران', icon: <VerifiedUser />, path: '/buyers/verification' },
            { text: 'طرح‌های تشویقی', icon: <CardGiftcard />, path: '/buyers/incentives' },
            { text: 'پیام‌ها', icon: <Chat />, path: '/buyers/messages' },
            { text: 'امتیازدهی و غیرفعالسازی', icon: <StarHalf />, path: '/buyers/rating' },
            { text: 'شکایات خریداران', icon: <Feedback />, path: '/buyers/complaints' },
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