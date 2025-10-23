import { Country } from '@/components/ui/country-dropdown';

export type SignupFormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: Country;
  zipCode: string;
};

export type SignupFormErrors = {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  country?: Country;
  zipCode?: string;
  general?: string;
};

export type LoginFormData = {
  email: string;
  password: string;
  [key: string]: string;
};

export type LoginFormErrors = {
  email?: string;
  password?: string;
  general?: string;
};
