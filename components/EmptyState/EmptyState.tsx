'use client';

import { cn } from '@/lib/utils';
import { SUBTITLE_GREY } from '@/lib/styles/typography.styles';

type Props = {
  title: string;
  description?: string;
  icon?: string;
  action?: React.ReactNode;
  className?: string;
};

/**
 * Компонент для відображення порожнього стану
 * Використовується коли немає даних для відображення
 */
export default function EmptyState({
  title,
  description,
  icon = '📚',
  action,
  className,
}: Props) {
  return (
    <div className={cn('text-center py-20', className)}>
      {icon && <div className="text-4xl mb-4">{icon}</div>}
      <p className={cn(SUBTITLE_GREY, 'mb-4')}>{title}</p>
      {description && (
        <p className={cn('text-sm', SUBTITLE_GREY)}>{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
