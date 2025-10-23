'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  validateEmail,
  validatePassword,
  validatePasswordMatch,
  validateName,
  validateZipCode,
  validateFormData,
  hasFormErrors,
} from '@/lib/utils/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { CountryDropdown, Country } from '@/components/ui/country-dropdown';
import { SignupFormData, SignupFormErrors as FormErrors } from '../utils/types';
import { auth } from '@/lib/supabase.client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [formData, setFormData] = useState<SignupFormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: {} as Country,
    zipCode: '',
  });

  const router = useRouter();
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

  const handleCountryChange = (country: Country) => {
    setFormData((prev) => ({
      ...prev,
      country: country,
    }));

    // Clear country error when user selects a country
    if (errors.country) {
      setErrors((prev) => ({
        ...prev,
        country: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    const validationErrors = validateFormData(formData, {
      fullName: (value) => validateName(value, 'Full name'),
      email: validateEmail,
      password: validatePassword,
      confirmPassword: (value) =>
        validatePasswordMatch(formData.password, value),
      country: (value) =>
        value
          ? { isValid: true }
          : { isValid: false, error: 'Country is required' },
      zipCode: validateZipCode,
    });

    if (hasFormErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const { error } = await auth.signUp({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        country: formData.country,
        zipCode: formData.zipCode,
      });

      if (error) {
        console.error('Signup failed:', error);
        setErrors({
          general: 'Signup failed. Please try again.',
        });
        setIsLoading(false);
      } else {
        toast.success('Signup successful! Redirecting to login...');
        setTimeout(() => {
          router.push('/auth/login?verifyEmail=true');
        }, 1000);
      }
    } catch (error) {
      toast.error('There was an error signing up. Please try again.', {
        description: (error as Error).message,
      });
      console.error('Signup failed:', error);
      setErrors({
        general: 'Signup failed. Please try again.',
      });
    }
  };

  return (
    <Card className='max-w-md w-full space-y-8 '>
      <CardContent>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white'>
            Create your account
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Or{' '}
            <Link href='/auth/login' className='link-primary'>
              sign in to your existing account
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
              <Label htmlFor='fullName' className='mb-1.5'>
                Full Name
              </Label>
              <Input
                id='fullName'
                name='fullName'
                type='text'
                autoComplete='name'
                required
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder='Enter your full name'
              />
              {errors.fullName && (
                <p className='mt-1 text-sm text-red-600'>{errors.fullName}</p>
              )}
            </div>

            <div>
              <Label htmlFor='email' className='mb-1.5'>
                Email address
              </Label>
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
              <Label htmlFor='password' className='mb-1.5'>
                Password
              </Label>
              <Input
                id='password'
                name='password'
                type='password'
                autoComplete='new-password'
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder='Enter your password'
              />
              {errors.password && (
                <p className='mt-1 text-sm text-red-600'>{errors.password}</p>
              )}
            </div>

            <div>
              <Label htmlFor='confirmPassword' className='mb-1.5'>
                Confirm Password
              </Label>
              <Input
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                autoComplete='new-password'
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder='Confirm your password'
              />
              {errors.confirmPassword && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div>
              <Label className='mb-1.5'>Country</Label>
              <CountryDropdown
                onChange={handleCountryChange}
                defaultValue={formData.country.alpha3}
                placeholder='Select your country'
              />
              {errors.country && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.country.alpha3}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor='zipCode' className='mb-1.5'>
                Zip Code
              </Label>
              <Input
                id='zipCode'
                name='zipCode'
                type='text'
                inputMode='numeric'
                pattern='[0-9]*'
                required
                value={formData.zipCode}
                onChange={handleInputChange}
                placeholder='Enter your zip code'
              />
              {errors.zipCode && (
                <p className='mt-1 text-sm text-red-600'>{errors.zipCode}</p>
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
                  Creating account...
                </div>
              ) : (
                'Sign up'
              )}
            </Button>
          </div>

          <div className='text-center'>
            <p className='text-sm text-gray-600'>
              Already have an account?{' '}
              <Link href='/auth/login' className='link-primary'>
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
