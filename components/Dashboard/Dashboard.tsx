'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { CARD_CONTAINER, CARD_PADDING } from '@/lib/styles/containers.styles';

type Props = {
  children: ReactNode;
};

// Специфічні стилі для Dashboard
const DASHBOARD_STYLES = cn('w-full xxl:w-88', 'shrink-0');

export default function Dashboard({ children }: Props) {
  return (
    <aside className={cn(DASHBOARD_STYLES, CARD_CONTAINER, CARD_PADDING)}>
      {children}
    </aside>
  );
}
