'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { BookDetailsResponse } from '@/types/book';
import { HEADING_SM, TEXT_HELPER_XSS } from '@/lib/styles/typography.styles';

type Props = {
  book: BookDetailsResponse;
  onDetails: (book: BookDetailsResponse) => void;
  onRemove: (bookId: string) => void;
};

// Local styles for LibraryBookCard
const IMAGE_CONTAINER = cn(
  'relative aspect-2/3 w-full rounded-xl overflow-hidden mb-2',
  'cursor-pointer'
);

const CARD_HOVER = cn(
  'cursor-pointer hover:scale-105 transition-all duration-250 ease-in-out',
  'flex flex-col'
);

export default function LibraryBookCard({ book, onDetails, onRemove }: Props) {
  return (
    <div className={CARD_HOVER}>
      {/* Cover → click opens modal */}
      <div className={IMAGE_CONTAINER} onClick={() => onDetails(book)}>
        {book.imageUrl ? (
          <Image
            src={book.imageUrl}
            alt={book.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-(--grey3) flex items-center justify-center">
            <span className="text-3xl">📖</span>
          </div>
        )}
      </div>
      <div className={cn('flex items-center justify-between')}>
        {/* Title + author */}
        <div className={cn('max-w-37')}>
          <h3 className={cn(HEADING_SM, 'truncate mb-0.5')}>{book.title}</h3>
          <p className={cn(TEXT_HELPER_XSS, 'truncate')}>{book.author}</p>
        </div>

        {/* Remove button */}
        <button
          className={cn(
            'w-7 h-7',
            'rounded-full border border-destructive/10 bg-destructive/20',
            'flex items-center justify-center',
            'hover:scale-105 transition-transform duration-250'
          )}
          onClick={() => onRemove(book._id)}
        >
          <svg width="16" height="16">
            <use
              href={'/icons.svg#icon-trash'}
              fill="#e85050/20"
              stroke="#e85050"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
