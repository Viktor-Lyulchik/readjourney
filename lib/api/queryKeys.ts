import { FetchRecommendedParams } from '@/types/book';

/**
 * Centralized keys for React Query
 * Used for caching and invalidation
 */
export const queryKeys = {
  // Books (recommended, details, etc.)
  books: {
    all: ['books'] as const,
    recommended: (params: FetchRecommendedParams) =>
      [...queryKeys.books.all, 'recommended', params] as const,
    details: (id: string) => [...queryKeys.books.all, 'details', id] as const,
  },

  // User's library
  library: {
    all: ['library'] as const,
    books: () => [...queryKeys.library.all, 'books'] as const,
    book: (id: string) => [...queryKeys.library.all, 'book', id] as const,
  },

  // Authorization and user info
  auth: {
    user: ['auth', 'user'] as const,
  },
} as const;
