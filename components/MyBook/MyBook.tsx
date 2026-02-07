'use client';

import { cn } from '@/lib/utils';
import { BookDetailsResponse } from '@/types/book';
import { useMemo } from 'react';
import Image from 'next/image';

type Props = {
  book: BookDetailsResponse;
};

export default function MyBook({ book }: Props) {
  // Find active reading session
  const isReading = useMemo(() => {
    return book.progress?.some(p => p.status === 'active') || false;
  }, [book.progress]);

  const timeLeft = useMemo(() => {
    if (!book.progress || book.progress.length === 0)
      return 'Unknown time left';

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
        'p-5 md:p-10',
        'flex flex-col items-center'
      )}
    >
      {/* Header section */}
      <div className="flex justify-between items-baseline w-full mb-8 md:mb-10">
        <h2 className="text-foreground text-[20px] font-bold leading-none tracking-[-0.02em]">
          My reading
        </h2>

        {/* Dynamic time */}
        <div className="text-(--grey1) text-[12px] font-medium leading-[1.16667] tracking-[-0.02em]">
          {timeLeft}
        </div>
      </div>

      {/* Book cover */}
      <div
        className={cn(
          'relative mb-5 md:mb-6',
          'w-[137px] h-[208px] md:w-[224px] md:h-[340px]'
        )}
      >
        {book.imageUrl ? (
          <Image
            src={book.imageUrl}
            alt={book.title}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 169px, 224px"
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
          'text-foreground text-base md:text-lg font-bold',
          'text-center mb-1 md:mb-2',
          'line-clamp-2'
        )}
      >
        {book.title}
      </h3>
      <p className={cn('text-(--grey1) text-xs md:text-sm', 'text-center')}>
        {book.author}
      </p>

      {/* Status indicator */}
      <div className={cn('mt-10 md:mt-12')}>
        <svg width="50" height="50">
          <use
            href={`/icons.svg#icon-${isReading ? 'stop_record' : 'record'}`}
            fill="#141414"
          />
        </svg>
      </div>
    </div>
  );
}
