'use client';

import { useState } from 'react';
import { Header } from '@/components/dashboard/Header';
import { Sidebar } from '@/components/dashboard/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className='h-screen flex bg-gray-50 dark:bg-gray-900'>
      {/* Sidebar - Desktop only */}
      <div className='h-full hidden md:block'>
        <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      </div>

      {/* Main Content Area */}
      <div className='flex-1 flex flex-col overflow-hidden min-w-0 '>
        {/* Header with Mobile Menu Button */}
        <div className='flex items-center border-b border-gray-200  dark:border-gray-700 dark:background-gray-900 bg-white'>
          {/* Mobile Menu Button */}
          <div className='md:hidden p-2 bg-white dark:background-gray-900'>
            <Sidebar isCollapsed={false} onToggle={() => {}} />
          </div>
          {/* Header */}
          <div className='flex-1'>
            <Header />
          </div>
        </div>

        {/* Scrollable Content */}
        <main className='flex-1 overflow-y-auto p-2 sm:p-4 lg:p-6'>
          <div className='max-w-7xl mx-auto w-full'>{children}</div>
        </main>
      </div>
    </div>
  );
}
