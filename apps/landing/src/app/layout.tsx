import './globals.css';

import ThemeProvider from './components/ThemeProvider';

export const metadata = {
  title: 'ضایعات چی',
  description: 'پلتفرم آنلاین خرید و فروش ضایعات به صورت عمده',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/icons/logo.png" />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
