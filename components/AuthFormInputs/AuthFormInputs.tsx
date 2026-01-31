'use client';

import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  FieldPath,
} from 'react-hook-form';

type AuthFormInputFieldsProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};

export default function AuthFormInputFields<T extends FieldValues>({
  register,
  errors,
}: AuthFormInputFieldsProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const [securePassword, setSecurePassword] = useState(false);

  return (
    <>
      {/* Email */}
      <div className="w-full">
        <div className="relative">
          <input
            type="email"
            placeholder="Email"
            className={cn(
              'input bg-(--grey3) text-foreground focus:outline-none',
              errors.email?.message ? 'border border-destructive' : ''
            )}
            {...register('email' as FieldPath<T>)}
          />
          <span
            className={cn(
              'absolute left-2 top-1/2 -translate-y-1/2',
              'text-(--grey1) text-[12px] pointer-events-none'
            )}
          >
            Email
          </span>
        </div>
        {errors.email?.message && (
          <p className="text-destructive text-[12px] md:text-[14px] mb-1">
            {errors.email.message as string}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="w-full">
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className={cn(
              'input input-password bg-(--grey3) text-foreground pl-40 pr-12 focus:outline-none',
              errors.password?.message ? 'border border-destructive' : ''
            )}
            {...register('password' as FieldPath<T>)}
          />
          <span
            className={cn(
              'absolute left-2 top-1/2 -translate-y-1/2 text-(--grey1) text-[12px] pointer-events-none'
            )}
          >
            Password
          </span>
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 outline-none"
            aria-label="Toggle password visibility"
          >
            {errors.password?.message ? (
              <svg className="w-4 h-4 md:w-5 md:h-5 xxl:w-6 xxl:h-6">
                <use
                  href={
                    securePassword
                      ? '/icons.svg#icon-gg_check-o'
                      : '/icons.svg#icon-pajamas_error'
                  }
                  fill={securePassword ? '#30B94D' : '#E90516'}
                />
              </svg>
            ) : (
              <svg className="w-4 h-4 md:w-5 md:h-5 xxl:w-6 xxl:h-6">
                <use
                  href={
                    showPassword
                      ? '/icons.svg#icon-eye-off'
                      : '/icons.svg#icon-eye'
                  }
                  fill="#141414"
                  stroke="#F9F9F9"
                />
              </svg>
            )}
          </button>
        </div>
        {errors.password?.message && (
          <p
            className={cn(
              securePassword ? 'text-(--green)' : 'text-destructive',
              'text-[12px] md:text-[14px] mb-1'
            )}
          >
            {errors.password.message as string}
          </p>
        )}
      </div>
    </>
  );
}
