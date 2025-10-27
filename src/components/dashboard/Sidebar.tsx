'use client';

import { useState } from 'react';
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
  className?: string;
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
  setIsCollapsed,
  onMobileClose,
}: {
  isCollapsed?: boolean;
  isSmallScreen?: boolean;
  setIsCollapsed: () => void;
  onMobileClose?: () => void;
}) => (
  <nav className={`space-y-2 ${isSmallScreen ? 'pl-4' : ''}`}>
    {menuItems.map((item, index) => (
      <Link
        key={index}
        href={item.href}
        onClick={() => {
          setIsCollapsed();
          onMobileClose?.();
        }}
      >
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
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`h-full hidden md:block bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
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
          <MenuContent isCollapsed={isCollapsed} setIsCollapsed={onToggle} />
        </div>
      </aside>

      {/* Mobile Menu Button - Only the button, no floating */}
      <div className='md:hidden'>
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button size='sm' variant='ghost' className='rounded-md'>
              <Menu className='w-4 h-4' />
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
                <MenuContent
                  setIsCollapsed={onToggle}
                  onMobileClose={() => setIsMobileOpen(false)}
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
