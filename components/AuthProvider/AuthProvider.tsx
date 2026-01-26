'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/auth.store';
import { usePathname, useRouter } from 'next/navigation';

const publicRoutes = ['/login', '/register', '/'];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { checkAuth, user, isLoading, isChecked } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  // ✅ ОДИН РАЗ
  useEffect(() => {
    if (!isChecked) {
      checkAuth();
    }
  }, [isChecked, checkAuth]);

  // ✅ тільки після check
  useEffect(() => {
    if (!isChecked || isLoading) return;

    const isPublic = publicRoutes.some(r => pathname.startsWith(r));

    if (!user && !isPublic) {
      router.replace('/login');
    }

    if (user && isPublic && pathname !== '/') {
      // router.replace('/recommended');
    }
  }, [user, isChecked, isLoading, pathname, router]);

  if (!isChecked || isLoading) return null;

  return <>{children}</>;
}
