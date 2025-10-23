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
      <header className='bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-3'>
            <div className='w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse'></div>
            <div className='space-y-1'>
              <div className='h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse'></div>
              <div className='h-3 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse'></div>
            </div>
          </div>
          <div className='w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse'></div>
        </div>
      </header>
    );
  }

  return (
    <header className='bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-3'>
          <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center'>
            <User className='w-5 h-5 text-white' />
          </div>
          <div>
            <h2 className='text-sm font-medium text-gray-900 dark:text-white'>
              {user?.full_name || 'User'}
            </h2>
            <p className='text-xs text-gray-500 dark:text-gray-400'>
              {user?.email}
            </p>
          </div>
        </div>
        
        <Button
          variant='outline'
          size='sm'
          onClick={handleLogout}
          className='flex items-center space-x-2'
        >
          <LogOut className='w-4 h-4' />
          <span>Logout</span>
        </Button>
      </div>
    </header>
  );
}
