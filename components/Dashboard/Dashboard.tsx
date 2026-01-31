'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function Dashboard({ children }: Props) {
  return (
    <aside
      className={cn(
        'w-full xxl:w-88',
        'shrink-0',
        'bg-(--dark-grey)',
        'rounded-2xl',
        'p-5 md:p-5 xxl:p-5'
      )}
    >
      {children}
    </aside>
  );
}
