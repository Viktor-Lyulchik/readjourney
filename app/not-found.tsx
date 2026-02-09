import { cn } from '@/lib/utils';
import type { Metadata } from 'next';

const SITE_URL = 'https://readjourney.vercel.app';

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

const NotFound = () => {
  return (
    <div className="pt-8">
      <h1
        className={cn('text-4xl font-bold text-destructive mb-15 text-center')}
      >
        404 - Page not found
      </h1>
      <p className={cn('text-foreground leading-7 mb-4 text-2xl text-center')}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
