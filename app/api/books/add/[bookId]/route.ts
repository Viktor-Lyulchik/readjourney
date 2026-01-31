import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../../_utils/utils';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '../../../api';

type Props = {
  params: Promise<{ bookId: string }>;
};

export async function POST(request: NextRequest, { params }: Props) {
  const { bookId } = await params;

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    console.log('Adding book to library, token=', token);

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Call your backend API to add book to library
    // Adjust the endpoint according to your backend API structure
    // This might be: POST /books/add, POST /library, or POST /books/${bookId}/add
    const apiRes = await api.post(
      `/books/add`,
      { id: bookId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('Book added successfully:', apiRes.data);

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        {
          error:
            error.response?.data?.message ||
            `Adding book ${bookId} to library failed`,
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
