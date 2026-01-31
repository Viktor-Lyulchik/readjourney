import { isAxiosError } from 'axios';
import { nextServer } from './api';
import { LoginRequest, RegisterRequest } from '@/types/auth';
import { User } from '@/types/user';
import { FetchRecommendedResponse, FetchRecommendedParams } from '@/types/book';

import { serializeParams } from '../utils';

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

export async function fetchRecommended(
  params: FetchRecommendedParams
): Promise<FetchRecommendedResponse> {
  const { page = 1, limit = 10, author = '', title = '' } = params;

  try {
    const params: FetchRecommendedParams = {
      page: Number(page),
      limit: Number(limit),
    };
    if (author) params.author = author;
    if (title) params.title = title;

    const { data } = await nextServer.get<FetchRecommendedResponse>(
      '/books/recommend',
      {
        params,
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
