import type { Metadata } from 'next';
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-fraunces',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { template: '%s | Verity', default: 'Verity Docs' },
  description: 'The governance layer for compliance program effectiveness',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
