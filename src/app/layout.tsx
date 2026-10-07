import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://el-portal-oficial.online'),
  title: 'Portal Oficial - Acervo y Documentos Históricos',
  description:
    'Portal oficial para consulta, archivo y preservación de documentos y registros históricos digitalizados.',
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Portal Oficial - Acervo y Documentos Históricos',
    description:
      'Portal oficial para consulta, archivo y preservación de documentos y registros históricos digitalizados.',
    url: 'https://el-portal-oficial.online',
    siteName: 'Portal Oficial',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary',
    title: 'Portal Oficial - Acervo y Documentos Históricos',
    description:
      'Portal oficial para consulta, archivo y preservación de documentos y registros históricos digitalizados.',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.jpg', type: 'image/jpeg' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/icon.jpg', type: 'image/jpeg' },
    ],
  },
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
