import React from 'react';
import { Menu, Bell, User } from 'lucide-react';
import { Breadcrumb } from './Breadcrumb';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="h-[60px] bg-white border-b border-border flex items-center justify-between px-5 lg:px-6 sticky top-0 z-30 flex-shrink-0">
      {/* Left section */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-md text-text-secondary hover:bg-gray-100 transition-colors focus-ring"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        <div className="hidden sm:block">
          <Breadcrumb />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button
          className="relative p-2 rounded-md text-text-secondary hover:bg-gray-100 transition-colors focus-ring"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full ring-2 ring-white" />
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-border" />

        {/* User avatar & info */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block text-right">
            <p className="text-[13px] font-medium text-text-primary leading-tight">Welcome, Admin</p>
            <p className="text-[11px] text-text-muted leading-tight">Administrator</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white cursor-pointer hover:bg-primary-dark transition-colors">
            <User size={16} />
          </div>
        </div>
      </div>
    </header>
  );
};
