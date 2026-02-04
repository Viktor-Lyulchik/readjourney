import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '../../api';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';
import { serializeParams } from '@/lib/utils';

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    console.log('ROUTE token=', token);

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const page = Number(req.nextUrl.searchParams.get('page') ?? 1);
    const limit = Number(req.nextUrl.searchParams.get('limit') ?? 10);
    const author = req.nextUrl.searchParams.get('author') ?? '';
    const title = req.nextUrl.searchParams.get('title') ?? '';

    console.log('Route params:', { page, limit, author, title });

    const apiRes = await api.get('/books/recommend', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        limit,
        ...(author && { author }),
        ...(title && { title }),
      },
      paramsSerializer: {
        serialize: serializeParams,
      },
    });

    console.log('Backend response status:', apiRes.status);
    console.log('Backend URL:', apiRes.config.url);
    console.log('API response:', apiRes.data);

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      console.error('Backend error:', error.response?.data);
      return NextResponse.json(
        {
          error: error.message || 'Fetching recommended books failed',
          response: error.response?.data,
        },
        { status: error.response?.status || 500 }
      );
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
