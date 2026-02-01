import { isAxiosError } from 'axios';
import { nextServer } from './api';
import { LoginRequest, RegisterRequest } from '@/types/auth';
import { User } from '@/types/user';
import {
  FetchRecommendedResponse,
  FetchRecommendedParams,
  BookDetailsResponse,
} from '@/types/book';

import { serializeParams } from '../utils';

// Auth API
export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/users/signup', data);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/users/signin', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/users/signout');
};

export const currentUser = async (): Promise<void> => {
  await nextServer.post('/users/current');
};

export const refreshTokens = async (): Promise<void> => {
  await nextServer.post('/users/current/refresh');
};

// Books API
export async function fetchRecommended(
  params: FetchRecommendedParams
): Promise<FetchRecommendedResponse> {
  const { page = 1, limit = 10, author = '', title = '' } = params;

  try {
    const requestParams: FetchRecommendedParams = {
      page: Number(page),
      limit: Number(limit),
    };
    if (author) requestParams.author = author;
    if (title) requestParams.title = title;

    const { data } = await nextServer.get<FetchRecommendedResponse>(
      '/books/recommend',
      {
        params: requestParams,
        paramsSerializer: {
          serialize: serializeParams,
        },
      }
    );

    return data;
  } catch (error) {
    console.log('error:', error);

    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Fetching recommended books failed'
      );
    }

    throw new Error('Fetching recommended books failed');
  }
}

// Library API functions
export async function fetchLibraryBooks(): Promise<BookDetailsResponse[]> {
  try {
    const { data } = await nextServer.get('/books/own');
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Fetching library books failed'
      );
    }
    throw new Error('Fetching library books failed');
  }
}

export async function fetchBookDetails(
  bookId: string
): Promise<BookDetailsResponse> {
  try {
    const { data } = await nextServer.get(`/books/${bookId}`);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Fetching book details failed'
      );
    }
    throw new Error('Fetching book details failed');
  }
}

export async function addBookToLibrary(
  bookId: string
): Promise<BookDetailsResponse> {
  try {
    const { data } = await nextServer.post(`/books/add/${bookId}`);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Adding book to library failed'
      );
    }
    throw new Error('Adding book to library failed');
  }
}

export async function removeBookFromLibrary(bookId: string): Promise<void> {
  try {
    await nextServer.delete(`/books/remove/${bookId}`);
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Removing book from library failed'
      );
    }
    throw new Error('Removing book from library failed');
  }
}
