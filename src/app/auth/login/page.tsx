'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  validateEmail,
  validatePassword,
  validateFormData,
  hasFormErrors,
} from '@/lib/utils/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface LoginFormData {
  email: string;
  password: string;
  [key: string]: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    const validationErrors = validateFormData(formData, {
      email: validateEmail,
      password: validatePassword,
    });

    if (hasFormErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // TODO: Implement actual login logic here
      console.log('Login attempt:', formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For now, just show success (replace with actual redirect)
      alert('Login successful! (This is a placeholder)');
    } catch {
      setErrors({
        general: 'Login failed. Please check your credentials and try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // TODO: Implement forgot password functionality
    alert('Forgot password functionality will be implemented here');
  };

  return (
    <div className='full-space flex items-center justify-center min-h-screen'>
      <Card className='max-w-md w-full space-y-8'>
        <CardContent>
          <div>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white'>
              Sign in to your account
            </h2>
            <p className='mt-2 text-center text-sm text-gray-600'>
              Or{' '}
              <Link href='/auth/signup' className='link-primary'>
                create a new account
              </Link>
            </p>
          </div>

          <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
            {errors.general && (
              <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md'>
                {errors.general}
              </div>
            )}

            <div className='space-y-4'>
              <div>
                <Label htmlFor='email' className='mb-1.5'>Email address</Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder='Enter your email'
                />
                {errors.email && (
                  <p className='mt-1 text-sm text-red-600'>{errors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor='password' className='mb-1.5'>Password</Label>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder='Enter your password'
                />
                {errors.password && (
                  <p className='mt-1 text-sm text-red-600'>{errors.password}</p>
                )}
              </div>
            </div>

            <div>
              <Button
                className='w-full'
                variant='default'
                type='submit'
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className='flex items-center'>
                    <svg
                      className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </Button>
            </div>

            <div className='flex items-center justify-end'>
              <Button variant='link' onClick={handleForgotPassword}>
                Forgot your password?
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
