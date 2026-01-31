import { cn } from '@/lib/utils';
import type { Metadata } from 'next';

const SITE_URL = 'https://nanny-services-mocha.vercel.app';

export const metadata: Metadata = {
  title: 'Nanny Services - Easy seeking babysitters Online',
  description: 'Find a trusted nanny for your child.',
  openGraph: {
    type: 'website',
    title: 'Nanny Services - Easy seeking babysitters Online',
    description: 'Find a trusted nanny for your child.',
    url: `${SITE_URL}/`,
    siteName: 'Nanny Services',
    images: [
      {
        url: `${SITE_URL}/img/hero.png`,
        width: 1200,
        height: 630,
        alt: 'Nanny Services - Easy seeking babysitters Online',
      },
    ],
  },
  twitter: {
    title: 'Nanny Services - Easy seeking babysitters Online',
    description: 'Find a trusted nanny for your child.',
    images: [`${SITE_URL}/img/hero.png`],
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
