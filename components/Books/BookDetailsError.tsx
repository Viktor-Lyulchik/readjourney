'use client';

import { cn } from '@/lib/utils';

type Props = {
  error: Error;
  reset: () => void;
};

export default function BookDetailsError({ error, reset }: Props) {
  return (
    <div className="text-center">
      <p className={cn('font-semibold mb-2 text-red-600')}>
        Failed to load book
      </p>

      <p className={cn('text-sm text-muted-foreground mb-4')}>
        {error.message}
      </p>

      <div className="flex gap-3 justify-center">
        <button onClick={reset} className={cn('btn-primary')}>
          Retry
        </button>
      </div>
    </div>
  );
}
