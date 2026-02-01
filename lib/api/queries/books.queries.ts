import { useQuery } from '@tanstack/react-query';
import { fetchRecommended, fetchBookDetails } from '../clientApi';
import { queryKeys } from '../queryKeys';
import { FetchRecommendedParams } from '@/types/book';

/**
 * Hook для отримання рекомендованих книг
 * Автоматично кешує результати на основі параметрів
 */
export const useRecommendedBooks = (params: FetchRecommendedParams) => {
  return useQuery({
    queryKey: queryKeys.books.recommended(params),
    queryFn: () => fetchRecommended(params),
    staleTime: 2 * 60 * 1000, // 2 хвилини для списку книг
  });
};

/**
 * Hook для отримання деталей книги
 * Використовується в модальному вікні
 */
export const useBookDetails = (bookId: string | null) => {
  return useQuery({
    queryKey: queryKeys.books.details(bookId || ''),
    queryFn: () => fetchBookDetails(bookId!),
    enabled: !!bookId, // Запит тільки якщо є ID
    staleTime: 5 * 60 * 1000, // 5 хвилин для деталей книги
  });
};
