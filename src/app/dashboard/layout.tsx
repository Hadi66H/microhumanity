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
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />

      {/* Main Content Area */}
      <div className='flex-1 flex flex-col overflow-hidden min-w-0'>
        {/* Header */}
        <Header />

        {/* Scrollable Content */}
        <main className='flex-1 overflow-y-auto p-2 sm:p-4 lg:p-6'>
          <div className='max-w-7xl mx-auto w-full'>{children}</div>
        </main>
      </div>
    </div>
  );
}
