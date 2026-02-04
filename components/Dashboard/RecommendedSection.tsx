'use client';

import { useRecommendedBooks } from '@/lib/api/queries/books.queries';
import BooksList from '../Books/BooksList';
import { RecommendedBook } from '@/types/book';

/**
 * Мінімальна секція рекомендованих книг (3 штуки) всередині LibraryDashboard.
 * Заголовок рендеряється батьком — тут тільки список.
 */
export default function RecommendedSection() {
  const { data: books, isLoading, isError } = useRecommendedBooks({
    page: 1,
    limit: 3,
  });

  if (isLoading) {
    return (
      <p className="text-sm text-(--grey1)">Loading...</p>
    );
  }

  if (isError) {
    return (
      <p className="text-sm text-destructive">Failed to load recommendations</p>
    );
  }

  const booksData = books?.results || [];

  if (booksData.length === 0) return null;

  return (
    <BooksList books={booksData as RecommendedBook[]} variant="compact" />
  );
}
