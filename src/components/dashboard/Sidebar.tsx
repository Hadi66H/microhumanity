'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Settings, 
  Info, 
  ChevronLeft, 
  ChevronRight,
  Menu
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      href: '#',
    },
    {
      icon: Settings,
      label: 'Settings',
      href: '#',
    },
    {
      icon: Info,
      label: 'About',
      href: '#',
    },
  ];

  return (
    <aside className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
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
      <nav className='p-4 space-y-2'>
        {menuItems.map((item, index) => (
          <Link key={index} href={item.href}>
            <Button
              variant='ghost'
              className={`w-full justify-start ${
                isCollapsed ? 'px-2' : 'px-3'
              }`}
            >
              <item.icon className={`w-4 h-4 ${isCollapsed ? '' : 'mr-3'}`} />
              {!isCollapsed && <span>{item.label}</span>}
            </Button>
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Button (hidden on desktop) */}
      <div className='lg:hidden p-4 border-t border-gray-200 dark:border-gray-700'>
        <Button
          variant='ghost'
          size='sm'
          onClick={onToggle}
          className='w-full'
        >
          <Menu className='w-4 h-4 mr-2' />
          {!isCollapsed && <span>Menu</span>}
        </Button>
      </div>
    </aside>
  );
}
