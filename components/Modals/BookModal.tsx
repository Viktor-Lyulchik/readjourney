'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BookDetailsResponse, RecommendedBook } from '@/types/book';
import { CARD_CONTAINER } from '@/lib/styles/containers.styles';
import { HEADING_MD } from '@/lib/styles/typography.styles';

/**
 * Universal component for displaying book details in a modal window
 *
 * Supports two usage modes:
 * 1. MyLibrary - shows "Start reading" button for reading
 * 2. RecommendedBooks - shows "Add to library" button for adding a book
 *
 * IMPORTANT CHANGE:
 * - No longer makes additional requests through useBookDetails
 * - Uses only data passed through props
 * - The book type can now be either BookDetailsResponse or RecommendedBook
 *
 * @example
 * // Usage in MyLibrary
 * <BookModal
 *   book={selectedBook}
 *   isOpen={!!selectedBook}
 *   onClose={() => setSelectedBook(null)}
 *   actionType="start-reading"
 *   onAction={() => router.push(`/reading/${selectedBook._id}`)}
 * />
 *
 * @example
 * // Usage in RecommendedBooks
 * <BookModal
 *   book={book}
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   actionType="add-to-library"
 *   onAction={handleAddToLibrary}
 *   actionPending={isPending}
 * />
 */

type ActionType = 'start-reading' | 'add-to-library';

type Props = {
  /** Book object to display (BookDetailsResponse or RecommendedBook) */
  book: BookDetailsResponse | RecommendedBook;
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback to close the modal */
  onClose: () => void;
  /** Button action type: "start-reading" or "add-to-library" */
  actionType: ActionType;
  /** Callback for the main action (reading or adding) */
  onAction: () => void;
  /** Pending state for the action button (optional) */
  actionPending?: boolean;
};

export default function BookModal({
  book,
  isOpen,
  onClose,
  actionType,
  onAction,
  actionPending = false,
}: Props) {
  // Handling ESC key to close the modal
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // Do not render if the modal is closed
  if (!isOpen) return null;

  // Determine button text based on action type
  const buttonText = (() => {
    if (actionType === 'start-reading') {
      return 'Start reading';
    }
    if (actionType === 'add-to-library') {
      return actionPending ? 'Adding...' : 'Add to library';
    }
    return '';
  })();

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
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-foreground hover:opacity-70 transition-opacity"
          aria-label="Close"
        >
          <X size={24} strokeWidth={2} />
        </button>

        <div className="flex flex-col justify-center items-center text-center">
          {/* Book cover */}
          <div
            className={cn(
              'relative rounded-lg overflow-hidden shrink-0',
              'w-35 h-53.25 md:w-38.25 md:h-58.25',
              'mb-4'
            )}
          >
            {book.imageUrl ? (
              <Image
                src={book.imageUrl}
                alt={book.title}
                fill
                className="object-cover"
              />
            ) : (
              // Fallback for books without a cover
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
            {/* Book title */}
            <h2
              className={cn(
                HEADING_MD,
                'text-foreground font-bold text-lg md:text-xl leading-none tracking-[-0.02em]',
                'mb-2 xxl:mb-2'
              )}
            >
              {book.title}
            </h2>

            {/* Author */}
            <p
              className={cn(
                'text-xs md:text-sm/4.5 font-medium tracking-[-0.02em] text-(--grey1)',
                'mb-1 xxl:mb-1'
              )}
            >
              {book.author}
            </p>

            {/* Number of pages */}
            <p
              className={cn(
                'text-foreground',
                'text-[10px]/[12px] font-medium tracking-[-0.02em]'
              )}
            >
              {book.totalPages} pages
            </p>
          </div>

          {/* Action button (Start reading / Add to library) */}
          <button
            onClick={onAction}
            disabled={actionPending}
            className={cn(
              'max-w-70',
              'py-3 md:py-3.5 xxl:py-4',
              'px-6 md:px-7',
              'rounded-full border border-(--grey1)',
              'text-foreground font-bold text-sm md:text-base leading-[1.28571] md:leading-tight',
              'hover:bg-foreground hover:text-background transition-all duration-300',
              // Styles for disabled state
              actionPending && 'opacity-50 cursor-not-allowed'
            )}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
