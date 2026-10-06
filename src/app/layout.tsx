import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Oración de 20 Palabras - The Chosen Revelación',
  description:
    'Actor que interpreta a Jesús en la serie The Chosen revela la oración oculta por 2 mil años para atraer prosperidad y salud.',
  robots: 'noindex, nofollow',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#FAFAFA',
};

import MetaPixel from '@/components/MetaPixel';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-screen bg-[#FAFAFA] text-stone-900 antialiased selection:bg-amber-200 selection:text-amber-900">
        <MetaPixel />
        <main className="w-full min-h-screen flex flex-col justify-start items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
