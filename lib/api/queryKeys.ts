import { FetchRecommendedParams } from '@/types/book';

/**
 * Централізовані ключі для React Query
 * Використовуємо їх для кешування та інвалідації
 */
export const queryKeys = {
  // Книги (рекомендовані)
  books: {
    all: ['books'] as const,
    recommended: (params: FetchRecommendedParams) =>
      [...queryKeys.books.all, 'recommended', params] as const,
    details: (id: string) => [...queryKeys.books.all, 'details', id] as const,
  },

  // Бібліотека користувача
  library: {
    all: ['library'] as const,
    books: () => [...queryKeys.library.all, 'books'] as const,
    book: (id: string) => [...queryKeys.library.all, 'book', id] as const,
  },

  // Авторизація
  auth: {
    user: ['auth', 'user'] as const,
  },
} as const;
