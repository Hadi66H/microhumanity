'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  LayoutDashboard,
  Settings,
  Info,
  ChevronLeft,
  ChevronRight,
  Menu,
  User,
  LogOut,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { auth } from '@/lib/supabase.client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

interface UserData {
  email?: string;
  full_name?: string;
}

const menuItems = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    icon: Settings,
    label: 'Settings',
    href: '/dashboard/settings',
  },
  {
    icon: Info,
    label: 'About',
    href: '/dashboard/about',
  },
];

const MenuContent = ({
  isCollapsed = false,
  isSmallScreen = false,
}: {
  isCollapsed?: boolean;
  isSmallScreen?: boolean;
}) => (
  <nav className={`space-y-2 ${isSmallScreen ? 'pl-4' : ''}`}>
    {menuItems.map((item, index) => (
      <Link key={index} href={item.href}>
        <Button
          variant='ghost'
          className={`w-full px-3 py-2 ${
            isCollapsed ? 'justify-center' : 'justify-start'
          }`}
        >
          <item.icon className={`w-4 h-4 ${isCollapsed ? '' : 'mr-3'}`} />
          {!isCollapsed && <span>{item.label}</span>}
        </Button>
      </Link>
    ))}
  </nav>
);

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
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

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:block bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        {/* Toggle Button */}
        <div className='p-4 border-b border-gray-200 dark:border-gray-700'>
          <Button
            variant='ghost'
            size='sm'
            onClick={onToggle}
            className='w-full justify-start'
          >
            {isCollapsed ? (
              <ChevronRight className='w-4 h-4' />
            ) : (
              <>
                <ChevronLeft className='w-4 h-4 mr-2' />
                <span>Collapse</span>
              </>
            )}
          </Button>
        </div>

        {/* Navigation Links */}
        <div className='p-4 space-y-2'>
          <MenuContent isCollapsed={isCollapsed} />
        </div>
      </aside>

      {/* Mobile Header */}
      <div className='md:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700'>
        <div className='flex items-center justify-between px-4 py-3'>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size='sm'
                variant='ghost'
                className='rounded-md'
              >
                <Menu className='w-5 h-5' />
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='w-64 p-0'>
              <div className='flex flex-col h-full'>
                {/* Header */}
                <div className='p-4 border-b border-gray-200 dark:border-gray-700'>
                  <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
                    Menu
                  </h2>
                </div>
                
                {/* Navigation Links */}
                <div className='flex-1 p-4'>
                  <MenuContent />
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          {/* User Info and Logout */}
          <div className='flex items-center space-x-2 min-w-0 flex-1 justify-end'>
            {isLoading ? (
              <div className='flex items-center space-x-2'>
                <div className='w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse'></div>
                <div className='w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse'></div>
                <div className='w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse'></div>
              </div>
            ) : (
              <>
                <div className='flex items-center space-x-2 min-w-0 flex-1 justify-end'>
                  <div className='w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shrink-0'>
                    <User className='w-3 h-3 text-white' />
                  </div>
                  <div className='min-w-0 flex-1 text-left'>
                    <h2 className='text-sm font-medium text-gray-900 dark:text-white truncate'>
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
                  className='flex items-center space-x-1 shrink-0'
                >
                  <LogOut className='w-4 h-4' />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
