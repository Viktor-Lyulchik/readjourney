'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type { ObjectSchema } from 'yup';
import { cn } from '@/lib/utils';

import AuthFormInputFields from '../AuthFormInputs/AuthFormInputs';
import Link from 'next/link';
import { useAuthStore } from '@/stores/auth.store';

type AuthFormValues = {
  name?: string;
  email: string;
  password: string;
};

type Props = {
  type: 'login' | 'register';
};

const authSchema: ObjectSchema<AuthFormValues> = yup.object({
  name: yup
    .string()
    .optional()
    .when('$type', {
      is: 'register',
      then: schema =>
        schema
          .required('Name is required')
          .matches(/^[A-Za-z]+$/, 'Only letters are allowed')
          .min(2, 'Min 2 characters'),
      otherwise: schema => schema.notRequired(),
    }),
  email: yup
    .string()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Invalid email format')
    .required('This field is required'),
  password: yup
    .string()
    .min(7, 'Must be at least 7 characters')
    .required('This field is required'),
});

export default function AuthForm({ type }: Props) {
  const [localError, setLocalError] = useState('');
  const {
    login,
    register: registerUser,
    isLoading,
    error,
    clearError,
  } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    resolver: yupResolver(authSchema),
    context: { type },
  });

  const onSubmit = async (data: AuthFormValues) => {
    setLocalError('');
    clearError(); // Очищаємо попередні помилки зі стору

    try {
      if (type === 'register') {
        await registerUser(data.name!, data.email.toLowerCase(), data.password);
      } else {
        await login(data.email.toLowerCase(), data.password);
      }
      window.location.href = '/recommended';
    } catch (err: any) {
      // Помилка вже збережена в стейті через store
      // Можна додати локальну обробку якщо потрібно
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div
        className={cn(
          'flex flex-col gap-2 md:gap-3.5',
          'mb-5 md:mb-20.5 xxl:mb-20.5',
          'w-full md:w-118'
        )}
      >
        {/* Name показуємо тільки для реєстрації */}
        {type === 'register' && (
          <div>
            <div className="relative">
              <input
                type="text"
                placeholder="Name"
                className={cn(
                  'input bg-(--grey3) text-foreground focus:outline-none',
                  errors.name?.message ? 'border border-destructive' : ''
                )}
                {...register('name')}
              />
              <span
                className={cn(
                  'absolute left-2 top-1/2 -translate-y-1/2',
                  'text-(--grey1) text-[12px] pointer-events-none'
                )}
              >
                Name
              </span>
            </div>
            {errors.name?.message && (
              <p className="text-destructive text-[12px] md:text-[14px] mt-1">
                {errors.name.message as string}
              </p>
            )}
          </div>
        )}

        {/* Email / Password через generic компонент */}
        <AuthFormInputFields<AuthFormValues>
          register={register}
          errors={errors}
        />
      </div>

      <div className="flex justify-start items-center gap-3.5 mb-2">
        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className={cn(
            'main-button py-4 w-full',
            (isSubmitting || isLoading) && 'opacity-50 cursor-not-allowed'
          )}
        >
          {isSubmitting || isLoading
            ? type === 'register'
              ? 'Registering...'
              : 'Logging in...'
            : type === 'register'
              ? 'Registration'
              : 'Log in'}
        </button>

        <Link
          href={type === 'register' ? '/login' : '/register'}
          className={cn(
            'text-(--grey1) hover:text-foreground text-[12px] md:text-[14px]',
            'underline leading-[1.17] md:leading-[1.28571] tracking-[-0.02em] font-medium decoration-skip-ink-none',
            'transition-all duration-[250ms] ease-in-out'
          )}
        >
          {type === 'register'
            ? 'Already have an account?'
            : "Don't have an account?"}
        </Link>
      </div>

      {/* Відображення помилок */}
      {(localError || error) && (
        <div className="mt-2">
          <p className="text-destructive text-[12px] md:text-[14px]">
            {localError || error}
          </p>
        </div>
      )}
    </form>
  );
}
