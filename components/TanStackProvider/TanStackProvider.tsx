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
            // Дані вважаються свіжими протягом 1 хвилини
            staleTime: 60 * 1000,
            // Дані зберігаються в кеші 5 хвилин
            gcTime: 5 * 60 * 1000,
            // Одна спроба повтору при помилці
            retry: 1,
            // Не рефетчити при фокусі на вікно
            refetchOnWindowFocus: false,
          },
          mutations: {
            // Одна спроба повтору для мутацій
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* DevTools тільки в development режимі */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};

export default TanStackProvider;
