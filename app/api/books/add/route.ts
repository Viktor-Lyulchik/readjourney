import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '../../api';

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    console.log('Adding book to library, token=', token);

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const apiRes = await api.post(`/books/add`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Book added successfully:', apiRes.data);

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        {
          error:
            error.response?.data?.message ||
            `Adding book ${JSON.stringify(body)} to library failed`,
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
