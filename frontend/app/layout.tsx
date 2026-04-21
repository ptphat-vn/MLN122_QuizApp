import type { Metadata } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';
import { Toaster } from 'sonner';

import './globals.css';

const beVietnamPro = Be_Vietnam_Pro({
  variable: '--font-be-vietnam-pro',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'MLN122 — Kinh Tế Chính Trị Mác-Lênin',
  description:
    'Hệ thống ôn tập và kiểm tra Kinh Tế Chính Trị Mác-Lênin — Phiên Bản Số Hoá.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} h-full antialiased`}>
      <body className="min-h-full bg-(--quiz-bg) text-white">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
