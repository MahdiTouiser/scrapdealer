import { LocalShipping, Recycling, Speed, TrendingUp } from '@mui/icons-material';

export const prices = [
  {
    category: 'ضایعات آهنی',
    items: [
      { name: 'آهن سنگین', price: 15800, change: 350, percent: 1.8, up: true },
      { name: 'آهن سبک', price: 13200, change: -120, percent: -0.9, up: false },
      { name: 'پروفیل ضایعاتی', price: 18900, change: 420, percent: 2.3, up: true },
    ],
  },
  {
    category: 'ضایعات مس و آلومینیوم',
    items: [
      { name: 'مس درجه یک', price: 398000, change: 5500, percent: 1.4, up: true },
      { name: 'مس درجه دو', price: 365000, change: -3200, percent: -0.8, up: false },
      { name: 'آلومینیوم ضایعاتی', price: 72000, change: 800, percent: 1.1, up: true },
    ],
  },
  {
    category: 'ضایعات استیل و برنج',
    items: [
      { name: 'استیل ۳۰۴', price: 118000, change: 900, percent: 0.7, up: true },
      { name: 'استیل ۲۰۱', price: 68000, change: -500, percent: -0.6, up: false },
      { name: 'برنج ضایعاتی', price: 210000, change: 2400, percent: 1.2, up: true },
    ],
  },
];

export const news = [
  {
    title: 'افزایش قیمت مس در بازار امروز',
    description: 'طبق گزارشات جدید بازار جهانی، قیمت مس ۱۲ درصد رشد داشته و پیش‌بینی می‌شود این روند ادامه یابد.',
    date: '۲ روز پیش',
  },
  {
    title: 'تغییرات جدید در نحوه جمع‌آوری ضایعات',
    description: 'سیستم جدید جمع‌آوری با قابلیت ردیابی آنلاین و زمان‌بندی دقیق راه‌اندازی شد.',
    date: '۵ روز پیش',
  },
  {
    title: 'راهنمای تفکیک صحیح ضایعات',
    description: 'آموزش نحوه تفکیک صحیح ضایعات برای دریافت بهترین قیمت و حفظ محیط زیست.',
    date: '۱ هفته پیش',
  },
];

export const features = [
  { icon: TrendingUp, title: 'قیمت‌های لحظه‌ای', desc: 'بروزترین قیمت‌های بازار ضایعات' },
  { icon: Speed, title: 'پاسخ سریع', desc: 'پاسخگویی در کمتر از ۲۴ ساعت' },
  { icon: LocalShipping, title: 'حمل رایگان', desc: 'حمل‌ونقل رایگان برای مقادیر بالا' },
  { icon: Recycling, title: 'صدیق محیط زیست', desc: 'بازیافت اصولی و حفظ محیط زیست' },
];
