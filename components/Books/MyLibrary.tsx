'use client';

import { useLibraryBooks } from '@/lib/api/queries/library.queries';
import { useRemoveBookFromLibrary } from '@/lib/api/mutations/library.mutations';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { CARD_LG } from '@/lib/styles/containers.styles';
import {
  HEADING_LG,
  HEADING_SM,
  TEXT_HELPER,
} from '@/lib/styles/typography.styles';
import StatusBadge from '@/components/StatusBadge/StatusBadge';
import EmptyState from '@/components/EmptyState/EmptyState';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';

// Константи для MyLibrary
const IMAGE_CONTAINER = cn(
  'relative aspect-2/3 w-full rounded-xl overflow-hidden mb-3'
);

const ACTION_BUTTON = cn('text-xs underline transition-colors duration-200');

const DETAILS_BUTTON = cn(
  ACTION_BUTTON,
  'text-(--grey1) hover:text-foreground'
);

const REMOVE_BUTTON = cn(ACTION_BUTTON, 'text-destructive hover:text-red-400');

export default function MyLibrary() {
  const { data: books, isLoading, error } = useLibraryBooks();
  const { mutate: removeBook } = useRemoveBookFromLibrary();

  const handleRemoveBook = (bookId: string) => {
    if (confirm('Are you sure you want to remove this book?')) {
      removeBook(bookId);
    }
  };

  return (
    <div className={CARD_LG}>
      <h1 className={cn(HEADING_LG, 'mb-8')}>My Library</h1>

      {/* Loading state */}
      {isLoading && <LoadingSpinner message="Loading your books..." />}

      {/* Error state */}
      {error && (
        <EmptyState
          title="Failed to load your library"
          icon="⚠️"
          description="Please try again later"
        />
      )}

      {/* Empty state */}
      {books && books.length === 0 && (
        <EmptyState
          title="Your library is empty"
          description="Start adding books from the recommended section!"
        />
      )}

      {/* Books grid */}
      {books && books.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 xxl:grid-cols-4 gap-6">
          {books.map(book => (
            <div key={book._id} className="flex flex-col">
              {/* Book Cover */}
              <div className={IMAGE_CONTAINER}>
                <Image
                  src={book.imageUrl}
                  alt={book.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Book Info */}
              <h3 className={cn(HEADING_SM, 'truncate mb-1')}>{book.title}</h3>
              <p className={cn(TEXT_HELPER, 'truncate mb-3')}>{book.author}</p>

              {/* Actions */}
              <div className="flex gap-2 mt-auto">
                <button
                  className={DETAILS_BUTTON}
                  onClick={() => {
                    /* Open details */
                  }}
                >
                  Details
                </button>
                <button
                  className={REMOVE_BUTTON}
                  onClick={() => handleRemoveBook(book._id)}
                >
                  Remove
                </button>
              </div>

              {/* Status Badge */}
              <StatusBadge status={book.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
