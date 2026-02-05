'use client';

import { createContext, useContext, ReactNode } from 'react';
import { RecommendedBook } from '@/types/book';

type RecommendedBooksContextType = {
  books: RecommendedBook[];
  getBookById: (id: string) => RecommendedBook | undefined;
};

const RecommendedBooksContext = createContext<
  RecommendedBooksContextType | undefined
>(undefined);

type Props = {
  books: RecommendedBook[];
  children: ReactNode;
};

/**
 * Provider for saving and passing an array of recommended books through the component tree.
 * Allows retrieving book data by ID without backend requests
 */
export function RecommendedBooksProvider({ books, children }: Props) {
  const getBookById = (id: string) => {
    return books.find(book => book._id === id);
  };

  return (
    <RecommendedBooksContext.Provider value={{ books, getBookById }}>
      {children}
    </RecommendedBooksContext.Provider>
  );
}

/**
 * Hook for accessing recommended books data from the context
 */
export function useRecommendedBooks() {
  const context = useContext(RecommendedBooksContext);
  if (context === undefined) {
    throw new Error(
      'useRecommendedBooks must be used within RecommendedBooksProvider'
    );
  }
  return context;
}
