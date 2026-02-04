'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useLibraryBooks } from '@/lib/api/queries/library.queries';
import { useRemoveBookFromLibrary } from '@/lib/api/mutations/library.mutations';
import { BookDetailsResponse } from '@/types/book';
import { CARD_LG } from '@/lib/styles/containers.styles';
import { HEADING_LG } from '@/lib/styles/typography.styles';
import EmptyState from '@/components/EmptyState/EmptyState';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import BooksFilter from './BooksFilter';
import BookModal from '@/components/Modals/BookModal';
import LibraryBooksList from './LibraryBooksList';

type FilterValue = 'all' | BookDetailsResponse['status'];

export default function MyLibrary() {
  const router = useRouter();
  const { data: books, isLoading, error } = useLibraryBooks();
  const { mutate: removeBook } = useRemoveBookFromLibrary();

  // --- filter state ---
  const [filter, setFilter] = useState<FilterValue>('all');

  // --- details modal ---
  const [selectedBook, setSelectedBook] = useState<BookDetailsResponse | null>(
    null
  );

  // --- filtering list ---
  const filteredBooks = useMemo(() => {
    if (!books) return [];
    if (filter === 'all') return books;
    return books.filter(b => b.status === filter);
  }, [books, filter]);

  // --- removing ---
  const handleRemoveBook = (bookId: string) => {
    removeBook(bookId);
  };

  // --- action handler для модалки ---
  // Обробник для кнопки "Start reading" - переходить на сторінку читання
  const handleStartReading = () => {
    if (selectedBook) {
      router.push(`/reading/${selectedBook._id}`);
    }
  };

  return (
    <div className={CARD_LG}>
      {/* Header: title + filter */}
      <div className="flex justify-between items-center mb-8">
        <h1 className={HEADING_LG}>My Library</h1>
        <BooksFilter value={filter} onChange={setFilter} />
      </div>

      {/* Loading */}
      {isLoading && <LoadingSpinner message="Loading your books..." />}

      {/* Empty State */}
      {!isLoading && !error && filteredBooks.length === 0 && (
        <EmptyState
          description={
            <p className="text-foreground">
              To start training, add{' '}
              <span className="text-(--grey1)">some of your books</span> or from
              the recommended ones
            </p>
          }
        />
      )}

      {/* Books grid */}
      {filteredBooks.length > 0 && (
        <LibraryBooksList
          books={filteredBooks}
          onDetails={setSelectedBook}
          onRemove={handleRemoveBook}
        />
      )}

      {/* 
        Універсальна BookModal у режимі "start-reading"
        - actionType="start-reading" - визначає текст кнопки
        - onAction викликається при натисканні кнопки
      */}
      {selectedBook && (
        <BookModal
          book={selectedBook}
          isOpen={!!selectedBook}
          onClose={() => setSelectedBook(null)}
          actionType="start-reading"
          onAction={handleStartReading}
        />
      )}
    </div>
  );
}
