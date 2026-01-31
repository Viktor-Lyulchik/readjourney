'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

export default function ResponsivePaginationWrapper({ children }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const updateLimit = () => {
      const width = window.innerWidth;
      let newLimit: number;

      if (width < 768) {
        newLimit = 2; // Мобілка
      } else if (width < 1440) {
        newLimit = 4; // Планшет
      } else {
        newLimit = 10; // Десктоп
      }

      const currentLimit = Number(searchParams.get('limit')) || 10;

      if (currentLimit !== newLimit) {
        const params = new URLSearchParams(searchParams.toString());
        params.set('limit', String(newLimit));
        params.set('page', '1'); // Скидаємо на першу сторінку при зміні limit
        router.replace(`?${params.toString()}`);
      }
    };

    updateLimit();
    window.addEventListener('resize', updateLimit);

    return () => window.removeEventListener('resize', updateLimit);
  }, [searchParams, router]);

  return <>{children}</>;
}
