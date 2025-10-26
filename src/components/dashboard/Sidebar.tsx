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
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
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

      {/* Mobile Floating Menu Button */}
      <div className='md:hidden fixed bottom-6 right-6 z-50'>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size='lg'
              className='rounded-full w-14 h-14 shadow-lg bg-blue-600 hover:bg-blue-700 text-white'
            >
              <Menu className='w-6 h-6' />
            </Button>
          </SheetTrigger>
          <SheetContent side='bottom' className='h-[50vh]'>
            <div className='flex flex-col h-full'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-lg font-semibold text-gray-900 dark:text-white pl-3 pt-3'>
                  Menu
                </h2>
              </div>
              <div className='flex-1'>
                <MenuContent isSmallScreen={true} />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
