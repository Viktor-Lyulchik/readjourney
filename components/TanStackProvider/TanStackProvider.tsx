'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type Props = {
  children: React.ReactNode;
};

const TanStackProvider = ({ children }: Props) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Data are considered fresh for 1 minute
            staleTime: 60 * 1000,
            // Data are cached for 5 minutes
            gcTime: 5 * 60 * 1000,
            // One retry attempt on error
            retry: 1,
            // Do not refetch on window focus
            refetchOnWindowFocus: false,
          },
          mutations: {
            // One retry attempt for mutations
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* DevTools only in development mode */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};

export default TanStackProvider;
