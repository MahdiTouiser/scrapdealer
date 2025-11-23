import './globals.css';

import ClientProviders from './ClientProviders';

export const metadata = {
  title: 'ضایعات چی',
  description: 'ScrapDealer admin platform',
  icons: {
    icon: '/icon/logo.png',
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
