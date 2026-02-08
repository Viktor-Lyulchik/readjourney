'use client';

import { cn } from '@/lib/utils';
import { BookDetailsResponse } from '@/types/book';
import { useMemo } from 'react';

type Props = {
  book: BookDetailsResponse;
  hasProgress: boolean;
};

export default function ReadingStatistics({ book, hasProgress }: Props) {
  const totalPagesRead = useMemo(() => {
    if (!book.progress) return 0;
    return book.progress.reduce((total, session) => {
      if (session.status === 'inactive' && session.finishPage) {
        return total + (session.finishPage - session.startPage + 1);
      }
      return total;
    }, 0);
  }, [book.progress]);

  const percentage = useMemo(() => {
    if (!book.totalPages || book.totalPages === 0) return 0;
    return (totalPagesRead / book.totalPages) * 100;
  }, [totalPagesRead, book.totalPages]);

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className={cn(
        'bg-(--dark-grey) rounded-[15px] p-0 md:p-0 flex flex-col gap-10'
      )}
    >
      <div className="max-h-[373px]">
        <p
          className={cn(
            'hidden xxl:block',
            'text-(--grey1)',
            'w-full',
            'font-medium text-sm leading-[1.28571] tracking-[-0.04em]',
            'mb-5'
          )}
        >
          Each page, each chapter is a new round of knowledge, a new step
          towards understanding. By rewinding statistics, we create our own
          reading history.
        </p>

        <div
          className={cn(
            'bg-(--grey3)',
            'max-md:p-5 max-[1439px]:p-7 xxl:p-5',
            'rounded-xl',
            'flex flex-col items-center max-md:gap-5.25 max-[1439px]:gap-4 xxl:gap-2.5'
          )}
        >
          <div
            className={cn(
              'relative w-[116px] h-[116px] md:w-[138px] md:h-[138px] xxl:w-[189px] xxl:h-[189px]'
            )}
          >
            <svg
              viewBox="0 0 200 200"
              className={cn(
                'transform -rotate-90',
                'w-[116px] h-[116px] md:w-[138px] md:h-[138px] xxl:w-[189px] xxl:h-[189px]'
              )}
            >
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="#1F1F1F"
                strokeWidth="15"
              />
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="#30B94D"
                strokeWidth="15"
                strokeDasharray={circumference}
                strokeDashoffset={
                  hasProgress ? strokeDashoffset : circumference
                }
                strokeLinecap="round"
                className={cn('transition-all duration-700 ease-in-out')}
              />
            </svg>
            <div
              className={cn(
                'absolute inset-0 flex items-center justify-center'
              )}
            >
              <span
                className={cn(
                  'text-foreground',
                  'font-bold text-lg md:text-xl max-md:leading-[1.11] md:leading-none tracking-[-0.02em]'
                )}
              >
                100%
              </span>
            </div>
          </div>

          <div className={cn('flex flex-col items-center gap-1 md:gap-2')}>
            <div className={cn('flex items-center gap-4')}>
              <div
                className={cn('w-[14px] h-[14px] bg-(--green) rounded-[4px]')}
              />
              <span
                className={cn(
                  'text-white',
                  'font-medium text-sm md:text-xl max-md:leading-[1.28571] md:leading-none tracking-[-0.02em]'
                )}
              >
                {percentage.toFixed(2)}%
              </span>
            </div>
            <span
              className={cn(
                'text-(--grey1)',
                'font-medium text-[10px] md:text-xs max-md:leading-[1.2] md:leading-[1.16667] tracking-[-0.02em]'
              )}
            >
              {totalPagesRead} pages read
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
