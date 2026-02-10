'use client';

import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

type Props = {
  page: number;
  totalPages: number;
};

const paginationBtnStyles = cn(
  'w-8 md:w-10 h-8 md:h-10',
  'flex items-center justify-center',
  'rounded-full border',
  'transition-all duration-250 ease-in-out',
  'hover:border-none hover:bg-foreground hover:text-background disabled:opacity-50 disabled:cursor-not-allowed',
  'text-xl'
);

export default function Pagination({ page, totalPages }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));

    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className={cn('flex gap-2 items-center justify-center')}>
      {/* Previous Button */}
      <button
        disabled={page === 1 || isPending}
        onClick={() => changePage(page - 1)}
        className={paginationBtnStyles}
        aria-label="Previous page"
      >
        &lt;
      </button>

      {/* Next Button */}
      <button
        disabled={page >= totalPages || isPending}
        onClick={() => changePage(page + 1)}
        className={paginationBtnStyles}
        aria-label="Next page"
      >
        &gt;
      </button>
    </div>
  );
}
