import { cookies } from 'next/headers';
import { nextServer } from './api';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../app/api/_utils/utils';
import { FetchRecommendedParams } from '@/types/book';
import { serializeParams } from '../utils';

export async function fetchRecommendedServer(params: FetchRecommendedParams) {
  const cookieStore = await cookies(); // Server Component only
  const token = cookieStore.get('token')?.value;
  if (!token) throw new Error('Not authenticated');

  try {
    const res = await nextServer.get(`/books/recommend`, {
      params,
      paramsSerializer: {
        serialize: serializeParams,
      },
      headers: { Authorization: `Bearer ${token}`, cookie: `token=${token}` },
    });

    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      logErrorResponse(err.response?.data);
      console.error('Server API error:', err.response?.data);
      throw new Error(
        err.response?.data?.message || 'Fetching recommended books failed'
      );
    }
    throw new Error('Fetching recommended books failed');
  }
}

export async function fetchBookByIdServer(bookId: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) throw new Error('Not authenticated');

  try {
    const res = await nextServer.get(`/books/${bookId}`, {
      headers: { Authorization: `Bearer ${token}`, cookie: `token=${token}` },
    });
    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      logErrorResponse(err.response?.data);
      throw new Error(
        err.response?.data?.message || 'Fetching book details failed'
      );
    }
    throw err;
  }
}
