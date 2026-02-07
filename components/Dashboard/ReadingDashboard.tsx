'use client';

import { useState, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type { ObjectSchema } from 'yup';
import { cn } from '@/lib/utils';
import {
  useStartReading,
  useFinishReading,
} from '@/lib/api/mutations/reading.mutations';
import { BookDetailsResponse, ActiveProgress } from '@/types/book';
import ReadingDiary from './ReadingDiary';
import ReadingStatistics from './ReadingStatistics';

type AddReadingFormValues = {
  page: string;
};

type Props = {
  book: BookDetailsResponse;
  onBookCompleted: () => void;
};

const addReadingSchema: ObjectSchema<AddReadingFormValues> = yup.object({
  page: yup
    .string()
    .default('')
    .trim()
    .matches(/^\d+$/, 'Must be a valid number')
    .min(1, 'Page number is required'),
});

export default function ReadingDashboard({ book, onBookCompleted }: Props) {
  const [viewMode, setViewMode] = useState<'diary' | 'statistics'>('diary');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddReadingFormValues>({
    resolver: yupResolver(addReadingSchema),
    defaultValues: { page: '' },
  });

  const { mutateAsync: startReading, isPending: isStarting } =
    useStartReading();
  const { mutateAsync: finishReading, isPending: isFinishing } =
    useFinishReading();

  // Find active reading session
  const activeProgress = useMemo<ActiveProgress | null>(() => {
    return (
      (book.progress?.find(p => p.status === 'active') as
        | ActiveProgress
        | undefined) || null
    );
  }, [book.progress]);

  const isReading = !!activeProgress;

  // Submit handler
  const onSubmit = async (data: AddReadingFormValues) => {
    try {
      const page = parseInt(data.page, 10);

      if (isReading) {
        // Finish reading
        const result = await finishReading({ bookId: book._id, page });

        // Check if book is completed
        if (result.status === 'done') {
          onBookCompleted();
        }
      } else {
        // Start reading
        await startReading({ bookId: book._id, page });
      }

      reset();
    } catch {
      // Errors are handled in mutations
    }
  };

  // Shared input styles
  const inputBase = cn(
    'input',
    'bg-(--grey3) text-foreground focus:outline-none'
  );
  const labelBase = cn(
    'absolute left-2 top-1/2 -translate-y-1/2',
    'text-(--grey1) text-[12px] pointer-events-none'
  );
  const errorBase = 'text-destructive text-[12px] md:text-[14px] mt-1';

  return (
    <div className={cn('flex flex-col gap-10', 'p-0 pt-5!')}>
      {/* AddReading form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn('flex flex-col gap-2')}
      >
        <p className="pl-2 text-sm font-medium">
          {isReading ? 'Stop page:' : 'Start page:'}
        </p>

        {/* Page number input */}
        <div>
          <div className="relative">
            <input
              type="text"
              placeholder={isReading ? 'Page number' : '0'}
              disabled={isSubmitting || isStarting || isFinishing}
              className={cn(
                inputBase,
                'pl-24!',
                errors.page && 'border border-destructive'
              )}
              {...register('page')}
            />
            <span className={labelBase}>Page number:</span>
          </div>
          {errors.page && <p className={errorBase}>{errors.page.message}</p>}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting || isStarting || isFinishing}
          className={cn(
            'mt-3',
            'main-button logout-button py-2 px-4',
            'w-28.5!',
            (isSubmitting || isStarting || isFinishing) &&
              'opacity-50 cursor-not-allowed'
          )}
        >
          {isStarting || isFinishing
            ? isReading
              ? 'Stopping...'
              : 'Starting...'
            : isReading
              ? 'To stop'
              : 'To start'}
        </button>
      </form>

      {/* Details section with tabs */}
      <div className={cn('flex flex-col gap-5')}>
        {/* Tab switcher */}
        <div className={cn('flex items-center justify-between')}>
          <h3
            className={cn(
              'text-lg font-bold leading-none tracking-[-0.02em]',
              'text-foreground'
            )}
          >
            {viewMode === 'diary' ? 'Diary' : 'Statistics'}
          </h3>

          <div className={cn('flex gap-2')}>
            {/* Diary button */}
            <button
              onClick={() => setViewMode('diary')}
              className={cn(
                'w-5 h-5 flex items-center justify-center rounded-full',
                'transition-colors'
              )}
              aria-label="View diary"
            >
              <svg width="20" height="20">
                <use
                  href="/icons.svg#icon-hourglass"
                  fill="none"
                  stroke={viewMode === 'diary' ? '#F9F9F9' : '#686868'}
                />
              </svg>
            </button>

            {/* Statistics button */}
            <button
              onClick={() => setViewMode('statistics')}
              className={cn(
                'w-5 h-5 flex items-center justify-center rounded-full',
                'transition-colors'
              )}
              aria-label="View statistics"
            >
              <svg width="20" height="20">
                <use
                  href="/icons.svg#icon-pie-chart"
                  fill="none"
                  stroke={viewMode === 'statistics' ? '#F9F9F9' : '#686868'}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content based on view mode */}
        {viewMode === 'diary' ? (
          book.progress && book.progress.length > 0 ? (
            <ReadingDiary
              bookId={book._id}
              progress={book.progress}
              totalPages={book.totalPages}
            />
          ) : (
            <div className={cn('bg-(--grey3) rounded-2xl p-5')}>
              <p className="text-(--grey1) text-sm text-center">
                Here you will see when and how much you read. To record, click
                on the red button above.
              </p>
            </div>
          )
        ) : (
          <ReadingStatistics
            book={book}
            hasProgress={!!book.progress && book.progress.length > 0}
          />
        )}
      </div>
    </div>
  );
}
