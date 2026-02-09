'use client';

import { cn } from '@/lib/utils';
import { SUBTITLE_GREY } from '@/lib/styles/typography.styles';

type Props = {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const SPINNER_SIZES = {
  sm: 'w-6 h-6 border-2',
  md: 'w-10 h-10 border-3',
  lg: 'w-16 h-16 border-4',
};

/**
 * Component for loading spinner
 * Used to indicate loading states in the UI
 */
export default function LoadingSpinner({
  message = 'Loading...',
  size = 'md',
  className,
}: Props) {
  return (
    <div
      className={cn(
        'flex flex-col justify-center items-center py-20',
        className
      )}
    >
      <div
        className={cn(
          'animate-spin rounded-full border-t-transparent border-(--grey1)',
          SPINNER_SIZES[size],
          'mb-4'
        )}
      />
      {message && <p className={SUBTITLE_GREY}>{message}</p>}
    </div>
  );
}
