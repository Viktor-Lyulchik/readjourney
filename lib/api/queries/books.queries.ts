import { useQuery } from '@tanstack/react-query';
import { fetchRecommended, fetchBookDetails } from '../clientApi';
import { queryKeys } from '../queryKeys';
import { FetchRecommendedParams } from '@/types/book';

/**
 * Hook for fetching recommended books
 * Automatically caches results based on parameters
 */
export const useRecommendedBooks = (params: FetchRecommendedParams) => {
  return useQuery({
    queryKey: queryKeys.books.recommended(params),
    queryFn: () => fetchRecommended(params),
    staleTime: 2 * 60 * 1000, // 2 minutes for the book list
  });
};

/**
 * Hook for fetching book details
 * Used in a modal window
 */
export const useBookDetails = (bookId: string | null) => {
  return useQuery({
    queryKey: queryKeys.books.details(bookId || ''),
    queryFn: () => fetchBookDetails(bookId!),
    enabled: !!bookId, // Fetch only if there is an ID
    staleTime: 5 * 60 * 1000, // 5 minutes for book details
  });
};
