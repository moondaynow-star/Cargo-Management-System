import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    // On mobile, toggle overlay; on desktop, toggle collapse
    if (window.innerWidth < 1024) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      {/* Fixed full-width header */}
      <Header onToggleSidebar={toggleSidebar} isCollapsed={sidebarCollapsed} />

      <div className="flex flex-1 min-h-0">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} isCollapsed={sidebarCollapsed} />

        <main className="flex-1 min-w-0 overflow-y-auto p-[var(--page-pad)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
