'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BookDetailsResponse } from '@/types/book';
import { useBookDetails } from '@/lib/api/queries/books.queries';
import { CARD_CONTAINER } from '@/lib/styles/containers.styles';
import { HEADING_MD } from '@/lib/styles/typography.styles';

type Props = {
  book: BookDetailsResponse;
  isOpen: boolean;
  onClose: () => void;
};

export default function BookDetailsModal({ book, isOpen, onClose }: Props) {
  const router = useRouter();

  // Load details from the server
  const { data: fullBook } = useBookDetails(isOpen ? book._id : null);

  // Use fullBook if already loaded, otherwise use book from the list
  const displayBook = fullBook || book;

  // ESC
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className={cn(
          CARD_CONTAINER,
          'max-[375px]:w-full md:w-[calc(100%-32px)] max-w-83.75 md:max-w-125',
          'bg-(--dark-grey) rounded-xl border border-(--grey4)',
          'p-10 md:p-12 xxl:p-12.5',
          'relative'
        )}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-foreground hover:opacity-70 transition-opacity"
          aria-label="Close"
        >
          <X size={24} strokeWidth={2} />{' '}
        </button>

        <div className="flex flex-col justify-center items-center text-center">
          {/* Cover of the book */}
          <div
            className={cn(
              'relative rounded-lg overflow-hidden shrink-0',
              'w-35 h-53.25 md:w-38.25 md:h-58.25',
              'mb-4'
            )}
          >
            {displayBook.imageUrl ? (
              <Image
                src={displayBook.imageUrl}
                alt={displayBook.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-(--grey3) flex items-center justify-center">
                <span className="text-4xl">📖</span>
              </div>
            )}
          </div>

          {/* Information block */}
          <div
            className={cn(
              'flex flex-col items-center w-full',
              'mb-5 md:mb-8 xxl:mb-8'
            )}
          >
            <h2
              className={cn(
                HEADING_MD,
                'text-foreground font-bold text-lg md:text-xl leading-none tracking-[-0.02em] ',
                'mb-2 xxl:mb-2'
              )}
            >
              {displayBook.title}
            </h2>
            <p
              className={cn(
                'text-xs md:text-sm/4.5 font-medium tracking-[-0.02em] text-(--grey1)',
                'mb-1 xxl:mb-1'
              )}
            >
              {displayBook.author}
            </p>

            <p
              className={cn(
                'text-foreground',
                'text-[10px]/[12px] font-medium tracking-[-0.02em]'
              )}
            >
              {displayBook.totalPages} pages
            </p>
          </div>

          {/* "Start reading" button */}
          <button
            onClick={() => router.push(`/reading/${displayBook._id}`)}
            className={cn(
              'max-w-70',
              'py-3 md:py-3.5 xxl:py-4',
              'px-6 md:px-7',
              'rounded-full border border-(--grey1)',
              'text-foreground font-bold text-sm md:text-base leading-[1.28571] md:leading-tight',
              'hover:bg-foreground hover:text-background transition-all duration-300'
            )}
          >
            Start reading
          </button>
        </div>
      </div>
    </div>
  );
}
