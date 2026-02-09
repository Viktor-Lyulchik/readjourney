import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { AuthProvider } from '@/components/AuthProvider/AuthProvider';
import { Toaster } from 'sonner';

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const SITE_URL = 'https://readjourney-khaki.vercel.app';

export const metadata: Metadata = {
  title: 'Read Journey - Track Your Reading Progress and Discover New Books',
  description:
    'An application for reading books and keeping statistics of what you read. Track your reading progress, set goals, and discover new books to read.',
  openGraph: {
    type: 'website',
    title: 'Read Journey - Track Your Reading Progress and Discover New Books',
    description:
      'An application for reading books and keeping statistics of what you read. Track your reading progress, set goals, and discover new books to read.',
    url: `${SITE_URL}/`,
    siteName: 'Read Journey',
    images: [
      {
        url: `${SITE_URL}/img/hero.webp`,
        width: 1200,
        height: 630,
        alt: 'Read Journey - Track Your Reading Progress and Discover New Books',
      },
    ],
  },
  twitter: {
    title: 'Read Journey - Track Your Reading Progress and Discover New Books',
    description:
      'An application for reading books and keeping statistics of what you read. Track your reading progress, set goals, and discover new books to read.',
    images: [`${SITE_URL}/img/hero.webp`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <TanStackProvider>
          <AuthProvider>{children}</AuthProvider>
        </TanStackProvider>
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
