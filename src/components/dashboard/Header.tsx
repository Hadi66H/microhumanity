'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/supabase.client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { LogOut, User } from 'lucide-react';

interface UserData {
  email?: string;
  full_name?: string;
}

export function Header() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await auth.getUser();
        if (user) {
          setUser({
            email: user.email,
            full_name: user.user_metadata?.full_name || user.user_metadata?.fullName
          });
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success('Logged out successfully');
      router.push('/auth/login');
    } catch (error) {
      toast.error('Error logging out');
      console.error('Logout error:', error);
    }
  };

  if (isLoading) {
    return (
      <header className='bg-white dark:bg-gray-800 px-2 sm:px-2 py-3 sm:py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2 sm:space-x-3'>
            <div className='w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse'></div>
            <div className='space-y-1'>
              <div className='h-3 sm:h-4 w-24 sm:w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse'></div>
              <div className='h-2 sm:h-3 w-32 sm:w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse'></div>
            </div>
          </div>
          <div className='w-16 sm:w-20 h-6 sm:h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse'></div>
        </div>
      </header>
    );
  }

  return (
    <header className='bg-white dark:bg-gray-800 px-4 sm:px-2 py-3 sm:py-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1'>
          <div className='w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center shrink-0'>
            <User className='w-3 h-3 sm:w-5 sm:h-5 text-white' />
          </div>
          <div className='min-w-0 flex-1'>
            <h2 className='text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate'>
              {user?.full_name || 'User'}
            </h2>
            <p className='text-xs text-gray-500 dark:text-gray-400 truncate'>
              {user?.email}
            </p>
          </div>
        </div>
        
        <Button
          variant='outline'
          size='sm'
          onClick={handleLogout}
          className='flex items-center space-x-1 sm:space-x-2 shrink-0'
        >
          <LogOut className='w-3 h-3 sm:w-4 sm:h-4' />
          <span className='hidden sm:inline'>Logout</span>
        </Button>
      </div>
    </header>
  );
}
