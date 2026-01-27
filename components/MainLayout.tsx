'use client';

import { ReactNode } from 'react';
import Header from '@/components/Header/Header';

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
    </>
  );
}
