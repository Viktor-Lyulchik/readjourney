'use client';

import { cn } from '@/lib/utils';

type BookStatus = 'in-progress' | 'done' | 'unread';

type Props = {
  status: BookStatus;
  className?: string;
};

// Styles for different statuses
const STATUS_STYLES: Record<BookStatus, string> = {
  'in-progress': 'text-(--blue)',
  done: 'text-(--green)',
  unread: 'text-(--grey1)',
};

// Icons for different statuses
const STATUS_ICONS: Record<BookStatus, string> = {
  'in-progress': '⏳',
  done: '✓',
  unread: '📚',
};

// Text for different statuses
const STATUS_TEXT: Record<BookStatus, string> = {
  'in-progress': 'In progress',
  done: 'Completed',
  unread: 'Unread',
};

/**
 * Component for displaying book status badge.
 * Avoids duplication of if/else for statuses
 */
export default function StatusBadge({ status, className }: Props) {
  return (
    <div className={cn('mt-2 text-xs', STATUS_STYLES[status], className)}>
      {STATUS_ICONS[status]} {STATUS_TEXT[status]}
    </div>
  );
}
