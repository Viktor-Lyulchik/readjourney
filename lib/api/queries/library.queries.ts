import { useQuery } from '@tanstack/react-query';
import { fetchLibraryBooks } from '../clientApi';
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
