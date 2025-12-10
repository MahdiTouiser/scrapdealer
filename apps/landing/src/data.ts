import { LocalShipping, Recycling, Speed, TrendingUp } from '@mui/icons-material';

export const prices = [
  { name: 'آهن قراضه', minPrice: 250000, maxPrice: 550000, unit: 'تومان/کیلو', trend: '+5%', up: true },
  { name: 'مس', minPrice: 750000, maxPrice: 1100000, unit: 'تومان/کیلو', trend: '+12%', up: true },
  { name: 'آلومینیوم', minPrice: 350000, maxPrice: 600000, unit: 'تومان/کیلو', trend: '+3%', up: true },
  { name: 'برنج', minPrice: 180000, maxPrice: 320000, unit: 'تومان/کیلو', trend: '-2%', up: false },
  { name: 'استیل', minPrice: 420000, maxPrice: 680000, unit: 'تومان/کیلو', trend: '+8%', up: true },
  { name: 'کابل', minPrice: 550000, maxPrice: 850000, unit: 'تومان/کیلو', trend: '+6%', up: true },
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
