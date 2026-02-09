'use client';

import { cn } from '@/lib/utils';
import { BookDetailsResponse } from '@/types/book';
import { useMemo } from 'react';
import Image from 'next/image';

type Props = {
  book: BookDetailsResponse;
  isDiaryActive?: boolean;
};

export default function MyBook({ book, isDiaryActive }: Props) {
  // Find active reading session
  const isReading = useMemo(() => {
    return book.progress?.some(p => p.status === 'active') || false;
  }, [book.progress]);

  const timeLeft = useMemo(() => {
    if (!book.progress || book.progress.length === 0) return '';

    // 1. Calculate total time spent (ms) and total pages read
    let totalMs = 0;
    let totalPagesRead = 0;

    book.progress.forEach(session => {
      if (session.startReading && session.finishReading) {
        const duration =
          new Date(session.finishReading).getTime() -
          new Date(session.startReading).getTime();
        const pagesInSession = session.finishPage! - session.startPage!;

        if (duration > 0 && pagesInSession > 0) {
          totalMs += duration;
          totalPagesRead += pagesInSession;
        }
      }
    });

    // 2. Determine how many pages are left
    const lastSession = book.progress[book.progress.length - 1];
    const currentPage = lastSession?.finishPage || 0;
    const pagesLeft = book.totalPages - currentPage;

    if (pagesLeft <= 0) return 'Finished';

    // 3. Calculate time left based on average time per page
    let predictedMinutesLeft = 0;

    if (totalPagesRead > 0) {
      // Average time per page in milliseconds
      const msPerPage = totalMs / totalPagesRead;
      predictedMinutesLeft = (pagesLeft * msPerPage) / (1000 * 60);
    } else {
      // If nothing has been read yet, use a default value (e.g., 3 minutes)
      predictedMinutesLeft = pagesLeft * 3;
    }

    const hours = Math.floor(predictedMinutesLeft / 60);
    const minutes = Math.round(predictedMinutesLeft % 60);

    return `${hours} hours and ${minutes} minutes left`;
  }, [book]);

  return (
    <div
      className={cn(
        'bg-(--dark-grey) rounded-2xl',
        'p-5 py-10 md:p-10',
        'flex flex-col items-center'
      )}
    >
      {/* Header section */}
      <div className="flex justify-between items-baseline w-full max-md:mb-10 max-[1439px]:mb-8 xxl:mb-11">
        <h2 className="text-foreground font-bold text-xl md:text-[28px] leading-none md:leading-[1.14286] tracking-[-0.02em]">
          My reading
        </h2>

        {/* Dynamic time */}
        {!isDiaryActive && (
          <div className="text-(--grey1) text-xs md:text-sm font-medium max-md:leading-[1.33] md:leading-[1.28571] tracking-[-0.02em]">
            {timeLeft}
          </div>
        )}
      </div>

      {/* Book cover */}
      <div
        className={cn(
          'relative mb-2.5 md:mb-6.25',
          'max-md:w-[137px] max-md:h-[208px] max-[1439px]:w-[169px] max-[1439px]:h-[256px] xxl:w-[224px] xxl:h-[340px]'
        )}
      >
        {book.imageUrl ? (
          <Image
            src={book.imageUrl}
            alt={book.title}
            fill
            className="object-cover rounded-lg"
            sizes="(min-width: 300px)"
          />
        ) : (
          <div
            className={cn(
              'w-full h-full bg-(--grey3) rounded-lg',
              'flex items-center justify-center',
              'bg-(--grey3)'
            )}
          >
            <picture
              className={cn(
                'block w-[111px] md:w-[174px] h-[72px] md:h-[112px]'
              )}
            >
              {/* Desktop */}
              <source
                srcSet="
                        /img/book-opened.png 1x,
                        /img/book-opened.png 2x
                      "
                media="(min-width: 300px)"
              />

              <img
                src="/img/book-opened.png"
                alt="Book opened icon"
                className={cn('w-full h-full object-contain')}
              />
            </picture>
          </div>
        )}
      </div>

      {/* Book info */}
      <h3
        className={cn(
          'text-foreground text-sm md:text-xl font-bold max-md:leading-[1.28571] md:leading-none',
          'max-md:max-w-[146px] md:max-w-[317px]',
          'text-center mb-1 md:mb-2',
          'line-clamp-2'
        )}
      >
        {book.title}
      </h3>
      <p
        className={cn(
          'text-(--grey1)',
          'font-medium md:font-bold text-[10px] md:text-xs leading-[1.2] md:leading-[1.28571]',
          'text-center'
        )}
      >
        {book.author}
      </p>

      {/* Status indicator */}
      <div className={cn('max-md:mt-5 max-[1439px]:mt-5 xxl:mt-6.25')}>
        <svg className="w-10 h-10 md:w-12.5 md:h-12.5">
          <use
            href={`/icons.svg#icon-${isReading ? 'stop_record' : 'record'}`}
            fill="#141414"
          />
        </svg>
      </div>
    </div>
  );
}
