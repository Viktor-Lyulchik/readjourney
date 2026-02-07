import { useQuery } from '@tanstack/react-query';
import { fetchBookDetails, fetchLibraryBooks } from '../clientApi';
import { queryKeys } from '../queryKeys';

/**
 * Hook for fetching all books from the user's library
 * Automatically refetches after adding/removing books
 */
export const useLibraryBooks = () => {
  return useQuery({
    queryKey: queryKeys.library.books(),
    queryFn: fetchLibraryBooks,
    staleTime: 1 * 60 * 1000, // 1 minute for library books
    // Automatically refetch on component mount
    refetchOnMount: true,
  });
};

/**
 * Hook for fetching details of a specific book
 * Used on reading page to get book progress and statistics
 */
export const useBookDetails = (bookId: string) => {
  return useQuery({
    queryKey: queryKeys.library.book(bookId),
    queryFn: () => fetchBookDetails(bookId),
    staleTime: 30 * 1000, // 30 seconds - shorter stale time for reading page
    refetchOnMount: true,
    enabled: !!bookId, // Only fetch if bookId is provided
  });
};
