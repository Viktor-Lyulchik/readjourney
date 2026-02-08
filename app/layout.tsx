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

export const metadata: Metadata = {
  title: 'readjourney',
  description:
    'An application for reading books and keeping statistics of what you read. Track your reading progress, set goals, and discover new books to read.',
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
