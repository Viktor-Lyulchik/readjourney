import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addBookToLibrary, removeBookFromLibrary } from '../clientApi';
import { queryKeys } from '../queryKeys';
import { toast } from 'sonner';

/**
 * Mutation для додавання книги до бібліотеки
 * Автоматично інвалідує кеш бібліотеки після успішного додавання
 */
export const useAddBookToLibrary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookId: string) => addBookToLibrary(bookId),
    onSuccess: data => {
      // Інвалідуємо список книг бібліотеки - це спричинить автоматичний рефетч
      queryClient.invalidateQueries({
        queryKey: queryKeys.library.books(),
      });

      // Також інвалідуємо рекомендовані книги (опціонально)
      // щоб оновити статус книги в списку рекомендованих
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

/**
 * Mutation для видалення книги з бібліотеки
 * Автоматично інвалідує кеш бібліотеки після успішного видалення
 */
export const useRemoveBookFromLibrary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookId: string) => removeBookFromLibrary(bookId),
    onSuccess: () => {
      // Інвалідуємо список книг бібліотеки
      queryClient.invalidateQueries({
        queryKey: queryKeys.library.books(),
      });

      // Також інвалідуємо рекомендовані книги
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
 * Mutation з optimistic update для миттєвого відгуку UI
 * Використовуєм цей варіант для кращого UX
 */
export const useAddBookToLibraryOptimistic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookId: string) => addBookToLibrary(bookId),
    // Optimistic update - оновлюємо UI до того як сервер відповість
    onMutate: async bookId => {
      // Скасовуємо всі поточні рефетчі щоб не перезаписати наш optimistic update
      await queryClient.cancelQueries({
        queryKey: queryKeys.library.books(),
      });

      // Зберігаємо попередній стан для rollback у випадку помилки
      const previousBooks = queryClient.getQueryData(queryKeys.library.books());

      // Optimistically оновлюємо кеш
      // (тут би додали нову книгу, але нам потрібна повна інформація про книгу)

      return { previousBooks };
    },
    onError: (err, bookId, context) => {
      // Rollback до попереднього стану
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
    // Завжди рефетчимо після success або error
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.library.books(),
      });
    },
  });
};
