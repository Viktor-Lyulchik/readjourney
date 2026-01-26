'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '@/types/user';

type AuthState = {
  user: User | null;
  isLoading: boolean;
  isChecked: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isChecked: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch('/api/users/signin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(
              data.response?.message || data.error || 'Помилка входу'
            );
          }

          set({
            user: { email: data.email, name: data.name },
            isLoading: false,
            error: null,
          });
        } catch (err: any) {
          set({
            error: err?.message || 'Щось пішло не так',
            isLoading: false,
          });
          throw err;
        }
      },

      register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch('/api/users/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(
              data.response?.message || data.error || 'Помилка реєстрації'
            );
          }

          set({
            user: { email: data.email, name: data.name },
            isLoading: false,
            error: null,
          });
        } catch (err: any) {
          set({
            error: err?.message || 'Щось пішло не так',
            isLoading: false,
          });
          throw err;
        }
      },

      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          await fetch('/api/users/signout', {
            method: 'POST',
          });

          set({ user: null, isLoading: false, error: null });
        } catch (err: any) {
          set({
            error: err?.message || 'Помилка виходу',
            isLoading: false,
          });
        }
      },

      checkAuth: async () => {
        if (get().isChecked) {
          return;
        }

        set({ isLoading: true });

        try {
          const res = await fetch('/api/users/refresh', {
            credentials: 'include',
          });

          if (res.ok) {
            const data = await res.json();
            set({
              user: { email: data.email, name: data.name },
              isChecked: true,
              isLoading: false,
            });
          } else {
            set({ user: null, isChecked: true, isLoading: false });
          }
        } catch (error) {
          set({ user: null, isChecked: true, isLoading: false });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({ user: state.user }),
    }
  )
);
