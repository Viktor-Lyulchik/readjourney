import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '../../api';

export async function DELETE(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Get query parameters from URL
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get('bookId');
    const readingId = searchParams.get('readingId');

    console.log(`Deleting reading session ${readingId} for book ${bookId}, token=`, token);

    if (!bookId || !readingId) {
      return NextResponse.json(
        { error: 'bookId and readingId are required' },
        { status: 400 }
      );
    }

    // Call backend API: DELETE /books/reading?bookId=...&readingId=...
    const apiRes = await api.delete(`/books/reading`, {
      params: {
        bookId,
        readingId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Reading session deleted successfully:', apiRes.data);

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        {
          error:
            error.response?.data?.message ||
            'Deleting reading session failed',
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
