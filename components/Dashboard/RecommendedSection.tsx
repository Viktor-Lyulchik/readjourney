'use client';

import { useRecommendedBooks } from '@/lib/api/queries/books.queries';
import BooksList from '../Books/BooksList';
import { RecommendedBook } from '@/types/book';

/**
 * Minimal section of recommended books (3 items) inside LibraryDashboard.
 * The header is rendered by the parent — here is only the list.
 */
export default function RecommendedSection() {
  const {
    data: books,
    isLoading,
    isError,
  } = useRecommendedBooks({
    page: 1,
    limit: 3,
  });

  if (isLoading) {
    return <p className="text-sm text-(--grey1)">Loading...</p>;
  }

  if (isError) {
    return (
      <p className="text-sm text-destructive">Failed to load recommendations</p>
    );
  }

  const booksData = books?.results || [];

  if (booksData.length === 0) return null;

  return <BooksList books={booksData as RecommendedBook[]} variant="compact" />;
}
