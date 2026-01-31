'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { BookDetailsResponse } from '@/types/book';
import Loading from '@/app/loading';
import { useRouter } from 'next/navigation';

type Props = {
  bookId: string;
  onClose?: () => void;
};

export default function BookDetails({ bookId, onClose }: Props) {
  const router = useRouter();
  const [book, setBook] = useState<BookDetailsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    async function fetchBook() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/books/${bookId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch book');
        }

        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load book');
      } finally {
        setIsLoading(false);
      }
    }

    fetchBook();
  }, [bookId]);

  const handleAddToLibrary = async () => {
    if (!book) return;

    try {
      setIsAdding(true);

      const response = await fetch(`/api/books/${bookId}/library`, {
        method: 'POST',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to add book to library');
      }

      // Success
      if (onClose) {
        onClose();
      }

      // Refresh to update the page
      router.refresh();

      // You can add toast notification here instead of alert
      // toast.success('Book successfully added to your library!');
    } catch (err) {
      console.error('Error adding book:', err);
      // toast.error(err instanceof Error ? err.message : 'Failed to add book');
    } finally {
      setIsAdding(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-50">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <p className={cn('font-semibold mb-2 text-red-600')}>
          Failed to load book
        </p>
        <p className={cn('text-sm text-muted-foreground mb-4')}>{error}</p>
      </div>
    );
  }

  if (!book) {
    return (
      <p className={cn('text-center text-muted-foreground')}>Book not found</p>
    );
  }

  return (
    <div className={cn('flex flex-col')}>
      {/* Book Image */}
      {book.imageUrl && (
        <div className={cn('mb-4 flex justify-center')}>
          <img
            src={book.imageUrl}
            alt={book.title}
            className={cn('max-w-50 w-full h-auto rounded-lg shadow-md')}
          />
        </div>
      )}

      {/* Book Title */}
      <h2 className={cn('font-semibold text-xl mb-3')}>{book.title}</h2>

      {/* Book Info */}
      <div className={cn('space-y-2 mb-6')}>
        <p className={cn('text-sm')}>
          <span className={cn('text-muted-foreground')}>Author:</span>{' '}
          <span className={cn('font-medium')}>{book.author}</span>
        </p>

        <p className={cn('text-sm')}>
          <span className={cn('text-muted-foreground')}>Total Pages:</span>{' '}
          <span className={cn('font-medium')}>{book.totalPages}</span>
        </p>
      </div>

      {/* Add to Library Button */}
      <button
        onClick={handleAddToLibrary}
        disabled={isAdding}
        className={cn(
          'btn-primary',
          isAdding && 'opacity-50 cursor-not-allowed'
        )}
      >
        {isAdding ? 'Adding...' : 'Add to library'}
      </button>
    </div>
  );
}
