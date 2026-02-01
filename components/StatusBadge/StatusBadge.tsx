'use client';

import { cn } from '@/lib/utils';

type BookStatus = 'in-progress' | 'done' | 'unread';

type Props = {
  status: BookStatus;
  className?: string;
};

// Стилі для різних статусів
const STATUS_STYLES: Record<BookStatus, string> = {
  'in-progress': 'text-(--blue)',
  done: 'text-(--green)',
  unread: 'text-(--grey1)',
};

// Іконки для статусів
const STATUS_ICONS: Record<BookStatus, string> = {
  'in-progress': '⏳',
  done: '✓',
  unread: '📚',
};

// Текст для статусів
const STATUS_TEXT: Record<BookStatus, string> = {
  'in-progress': 'In progress',
  done: 'Completed',
  unread: 'Unread',
};

/**
 * Компонент для відображення статусу книги
 * Уникає дублювання if/else для статусів
 */
export default function StatusBadge({ status, className }: Props) {
  return (
    <div className={cn('mt-2 text-xs', STATUS_STYLES[status], className)}>
      {STATUS_ICONS[status]} {STATUS_TEXT[status]}
    </div>
  );
}
