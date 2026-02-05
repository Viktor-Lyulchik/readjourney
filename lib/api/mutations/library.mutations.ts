import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addBookAsObjectToLibrary,
  addBookToLibrary,
  removeBookFromLibrary,
} from '../clientApi';
import { queryKeys } from '../queryKeys';
import { toast } from 'sonner';
import { BookObject } from '@/types/book';

/**
 * Mutation for adding a book to the library
 * Automatically invalidates the library cache after successful addition
 */
export const useAddBookToLibrary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookId: string) => addBookToLibrary(bookId),
    onSuccess: data => {
      // Invalidate the library books list - this will trigger an automatic refetch
      queryClient.invalidateQueries({
        queryKey: queryKeys.library.books(),
      });

      // Also invalidate recommended books (optional)
      // to update the status of the book in the recommended list
      queryClient.invalidateQueries({
        queryKey: queryKeys.books.all,
      });

      toast.success('Book added to library! 📚');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to add book');
    },
  });
};

export const useAddBookAsObjectToLibrary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (book: BookObject) => addBookAsObjectToLibrary(book),
    onSuccess: data => {
      // Invalidate the library books list - this will trigger an automatic refetch
      queryClient.invalidateQueries({
        queryKey: queryKeys.library.books(),
      });

      // Also invalidate recommended books (optional)
      // to update the status of the book in the recommended list
      queryClient.invalidateQueries({
        queryKey: queryKeys.books.all,
      });

      toast.success('Book added to library! 📚');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to add book');
    },
  });
};

export const useAddBookAsObjectToLibraryOptimistic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (book: BookObject) => addBookAsObjectToLibrary(book),

    // ✅ OPTIMISTIC UPDATE
    onMutate: async newBook => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.library.books(),
      });

      const previousBooks = queryClient.getQueryData(queryKeys.library.books());

      // Create a temporary optimistic book entry
      const optimisticBook = {
        _id: `temp-${Date.now()}`,
        title: newBook.title,
        author: newBook.author,
        imageUrl: '',
        totalPages: newBook.totalPages,
        status: 'unread',
        owner: 'me',
        progress: [],
      };

      queryClient.setQueryData(queryKeys.library.books(), (old: any) =>
        Array.isArray(old) ? [optimisticBook, ...old] : old
      );

      return { previousBooks };
    },

    onError: (error: Error, _, context) => {
      if (context?.previousBooks) {
        queryClient.setQueryData(
          queryKeys.library.books(),
          context.previousBooks
        );
      }

      toast.error(error.message || 'Failed to add book');
    },

    onSuccess: () => {
      toast.success('Book added to library! 📚');
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.library.books(),
      });
    },
  });
};

/**
 * Mutation for removing a book from the library
 * Automatically invalidates the library cache after successful removal
 */
export const useRemoveBookFromLibrary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookId: string) => removeBookFromLibrary(bookId),
    onSuccess: () => {
      // Invalidate the library books list
      queryClient.invalidateQueries({
        queryKey: queryKeys.library.books(),
      });

      // Also invalidate recommended books
      queryClient.invalidateQueries({
        queryKey: queryKeys.books.all,
      });

      toast.success('Book removed from library');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to remove book');
    },
  });
};

/**
 * Mutation with optimistic update for immediate UI feedback
 * We use this variant for better UX
 */
export const useAddBookToLibraryOptimistic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookId: string) => addBookToLibrary(bookId),
    // Optimistic update - update UI before the server responds
    onMutate: async bookId => {
      // Cancel any ongoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({
        queryKey: queryKeys.library.books(),
      });

      // Save the previous state for rollback in case of error
      const previousBooks = queryClient.getQueryData(queryKeys.library.books());

      // Optimistically update the cache
      // (here we would add the new book, but we need full book information)

      return { previousBooks };
    },
    onError: (err, bookId, context) => {
      // Rollback to previous state
      if (context?.previousBooks) {
        queryClient.setQueryData(
          queryKeys.library.books(),
          context.previousBooks
        );
      }
      toast.error('Failed to add book');
    },
    onSuccess: () => {
      toast.success('Book added to library! 📚');
    },
    // Always refetch after success or error
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.library.books(),
      });
    },
  });
};
