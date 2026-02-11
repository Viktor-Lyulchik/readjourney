import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addBookAsObjectToLibrary,
  addBookToLibrary,
  removeBookFromLibrary,
} from '../clientApi';
import { queryKeys } from '../queryKeys';
import { toast } from 'sonner';
import { BookObject, BookDetailsResponse } from '@/types/book';

const isBookInLibrary = (
  libraryBooks: BookDetailsResponse[] | undefined,
  title: string,
  author: string
): boolean => {
  if (!libraryBooks || !Array.isArray(libraryBooks)) {
    return false;
  }

  const normalizedTitle = title.trim().toLowerCase();
  const normalizedAuthor = author.trim().toLowerCase();

  return libraryBooks.some(
    book =>
      book.title.trim().toLowerCase() === normalizedTitle &&
      book.author.trim().toLowerCase() === normalizedAuthor
  );
};

export const useAddBookToLibrary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bookId,
      title,
      author,
    }: {
      bookId: string;
      title: string;
      author: string;
    }) => {
      const cachedBooks = queryClient.getQueryData<BookDetailsResponse[]>(
        queryKeys.library.books()
      );

      if (isBookInLibrary(cachedBooks, title, author)) {
        throw new Error(
          `Book "${title}" by ${author} is already in your library`
        );
      }

      return addBookToLibrary(bookId);
    },
    onSuccess: async data => {
      await queryClient.refetchQueries({
        queryKey: queryKeys.library.books(),
      });

      await queryClient.refetchQueries({
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
    mutationFn: async (book: BookObject) => {
      const cachedBooks = queryClient.getQueryData<BookDetailsResponse[]>(
        queryKeys.library.books()
      );

      if (isBookInLibrary(cachedBooks, book.title, book.author)) {
        throw new Error(
          `Book "${book.title}" by ${book.author} is already in your library`
        );
      }

      return addBookAsObjectToLibrary(book);
    },
    onSuccess: async data => {
      await queryClient.refetchQueries({
        queryKey: queryKeys.library.books(),
      });

      await queryClient.refetchQueries({
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
    mutationFn: async (book: BookObject) => {
      const cachedBooks = queryClient.getQueryData<BookDetailsResponse[]>(
        queryKeys.library.books()
      );

      if (isBookInLibrary(cachedBooks, book.title, book.author)) {
        throw new Error(
          `Book "${book.title}" by ${book.author} is already in your library`
        );
      }

      return addBookAsObjectToLibrary(book);
    },

    onMutate: async newBook => {
      // Cancel all current queries to prevent them from overwriting our update
      await queryClient.cancelQueries({
        queryKey: queryKeys.library.books(),
      });

      // Save the previous state for potential rollback
      const previousBooks = queryClient.getQueryData(queryKeys.library.books());

      // Create a temporary optimistic book entry
      // This is a temporary book that the user will see immediately
      const optimisticBook: BookDetailsResponse = {
        _id: `temp-${Date.now()}`, // temporary ID
        title: newBook.title,
        author: newBook.author,
        imageUrl: '', // no image yet
        totalPages: newBook.totalPages,
        status: 'unread' as const,
        owner: 'me',
        progress: [],
      };

      // Optimistically add the book to the cache
      // This allows the next check to see the book IMMEDIATELY
      queryClient.setQueryData(
        queryKeys.library.books(),
        (old: BookDetailsResponse[] | undefined) =>
          Array.isArray(old) ? [optimisticBook, ...old] : [optimisticBook]
      );

      // Return context for potential rollback
      return { previousBooks };
    },

    onError: (error: Error, _, context) => {
      // If something goes wrong - rollback changes
      if (context?.previousBooks) {
        queryClient.setQueryData(
          queryKeys.library.books(),
          context.previousBooks
        );
      }

      toast.error(error.message || 'Failed to add book');
    },

    onSuccess: async serverBook => {
      // Replace the optimistic book with the real one from the backend
      queryClient.setQueryData(
        queryKeys.library.books(),
        (old: BookDetailsResponse[] | undefined) => {
          if (!Array.isArray(old)) return [serverBook];

          // Find and replace the temporary book with the real one
          return old.map(book =>
            book._id.startsWith('temp-') &&
            book.title === serverBook.title &&
            book.author === serverBook.author
              ? serverBook
              : book
          );
        }
      );

      toast.success('Book added to library! 📚');
    },

    onSettled: async () => {
      // Wait for the refetch to complete
      // This ensures the cache is up-to-date before any other operations
      await queryClient.refetchQueries({
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
    onSuccess: async () => {
      // Use refetchQueries instead of invalidateQueries
      await queryClient.refetchQueries({
        queryKey: queryKeys.library.books(),
      });

      await queryClient.refetchQueries({
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
 *
 * Even for this version, we check by title + author!
 * Use refetchQueries for synchronous updates
 */
export const useAddBookToLibraryOptimistic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bookId,
      title,
      author,
    }: {
      bookId: string;
      title: string;
      author: string;
    }) => {
      const cachedBooks = queryClient.getQueryData<BookDetailsResponse[]>(
        queryKeys.library.books()
      );

      if (isBookInLibrary(cachedBooks, title, author)) {
        throw new Error(
          `Book "${title}" by ${author} is already in your library`
        );
      }

      return addBookToLibrary(bookId);
    },
    // Optimistic update - update UI before the server responds
    onMutate: async ({ bookId, title, author }) => {
      // Cancel any ongoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({
        queryKey: queryKeys.library.books(),
      });

      // Save the previous state for rollback in case of error
      const previousBooks = queryClient.getQueryData(queryKeys.library.books());

      // Add the optimistic book to the cache
      const optimisticBook: BookDetailsResponse = {
        _id: `temp-${Date.now()}`,
        title,
        author,
        imageUrl: '',
        totalPages: 0,
        status: 'unread' as const,
        owner: 'me',
        progress: [],
      };

      queryClient.setQueryData(
        queryKeys.library.books(),
        (old: BookDetailsResponse[] | undefined) =>
          Array.isArray(old) ? [optimisticBook, ...old] : [optimisticBook]
      );

      return { previousBooks };
    },
    onError: (err, bookData, context) => {
      // Rollback to previous state
      if (context?.previousBooks) {
        queryClient.setQueryData(
          queryKeys.library.books(),
          context.previousBooks
        );
      }
      toast.error(err.message || 'Failed to add book');
    },
    onSuccess: async serverBook => {
      // Replace the optimistic book with the real one from the backend
      queryClient.setQueryData(
        queryKeys.library.books(),
        (old: BookDetailsResponse[] | undefined) => {
          if (!Array.isArray(old)) return [serverBook];

          return old.map(book =>
            book._id.startsWith('temp-') &&
            book.title === serverBook.title &&
            book.author === serverBook.author
              ? serverBook
              : book
          );
        }
      );

      toast.success('Book added to library! 📚');
    },
    // Always refetch after success or error
    onSettled: async () => {
      // Wait for the refetch to complete
      await queryClient.refetchQueries({
        queryKey: queryKeys.library.books(),
      });
    },
  });
};
