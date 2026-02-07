import { useMutation, useQueryClient } from '@tanstack/react-query';
import { startReading, finishReading, deleteReading } from '../clientApi';
import { queryKeys } from '../queryKeys';
import { toast } from 'sonner';

/**
 * Mutation for starting reading
 */
export const useStartReading = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookId, page }: { bookId: string; page: number }) =>
      startReading(bookId, page),
    onSuccess: (data, variables) => {
      // Invalidate book details to refresh the data
      queryClient.invalidateQueries({
        queryKey: queryKeys.library.book(variables.bookId),
      });

      // Also invalidate all library books
      queryClient.invalidateQueries({
        queryKey: queryKeys.library.books(),
      });

      toast.success('Reading started! 📖');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to start reading');
    },
  });
};

/**
 * Mutation for finishing reading
 */
export const useFinishReading = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookId, page }: { bookId: string; page: number }) =>
      finishReading(bookId, page),
    onSuccess: (data, variables) => {
      // Invalidate book details to refresh the data
      queryClient.invalidateQueries({
        queryKey: queryKeys.library.book(variables.bookId),
      });

      // Also invalidate all library books
      queryClient.invalidateQueries({
        queryKey: queryKeys.library.books(),
      });

      toast.success('Reading session completed! ✅');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to finish reading');
    },
  });
};

/**
 * Mutation for deleting a reading session
 */
export const useDeleteReading = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      bookId,
      readingId,
    }: {
      bookId: string;
      readingId: string;
    }) => deleteReading(bookId, readingId),
    onSuccess: (data, variables) => {
      // Invalidate book details to refresh the data
      queryClient.invalidateQueries({
        queryKey: queryKeys.library.book(variables.bookId),
      });

      // Also invalidate all library books
      queryClient.invalidateQueries({
        queryKey: queryKeys.library.books(),
      });

      toast.success('Reading session deleted');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete reading session');
    },
  });
};
