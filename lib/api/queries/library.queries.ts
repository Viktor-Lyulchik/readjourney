import { useQuery } from '@tanstack/react-query';
import { fetchLibraryBooks } from '../clientApi';
import { queryKeys } from '../queryKeys';

/**
 * Hook для отримання всіх книг з бібліотеки користувача
 * Автоматично рефетчиться після додавання/видалення книг
 */
export const useLibraryBooks = () => {
  return useQuery({
    queryKey: queryKeys.library.books(),
    queryFn: fetchLibraryBooks,
    staleTime: 1 * 60 * 1000, // 1 хвилина
    // Автоматично рефетчити при монтуванні компонента
    refetchOnMount: true,
  });
};
