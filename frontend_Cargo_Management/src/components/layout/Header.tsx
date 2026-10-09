import React from 'react';
import { Menu, Bell, User } from 'lucide-react';
import { Breadcrumb } from './Breadcrumb';
import logo from '@/assets/logo.png';
import logoMark from '@/assets/logo-mark.png';

interface HeaderProps {
  onToggleSidebar: () => void;
  isCollapsed: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, isCollapsed }) => {
  return (
    <header className="h-[var(--header-h)] bg-white border-b border-border flex items-stretch flex-shrink-0 z-40">
      {/* Logo area — same width as the sidebar so the two line up */}
      <div
        className={`hidden lg:flex items-center justify-center flex-shrink-0 border-r border-border overflow-hidden transition-[width] duration-300 ease-in-out ${
          isCollapsed ? 'w-[var(--sidebar-w-collapsed)]' : 'w-[var(--sidebar-w)]'
        }`}
      >
        {isCollapsed ? (
          <img src={logoMark} alt="Vanakkam Express" className="h-9 w-9 object-contain" />
        ) : (
          <img src={logo} alt="Vanakkam Express" className="h-14 w-auto object-contain" />
        )}
      </div>

      {/* Left section */}
      <div className="flex items-center gap-3 px-4 lg:px-5 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="p-2 -ml-2 rounded-control text-text-secondary hover:bg-gray-100 transition-colors focus-ring"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        <img
          src={logo}
          alt="Vanakkam Express"
          className="lg:hidden h-9 w-auto object-contain"
        />
        <div className="hidden sm:block">
          <Breadcrumb />
        </div>
      </div>

      {/* Right section */}
      <div className="ml-auto flex items-center gap-3 pr-4 lg:pr-5">
        <button
          className="relative p-2 rounded-control text-text-secondary hover:bg-gray-100 transition-colors focus-ring"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full ring-2 ring-white" />
        </button>

        <div className="w-px h-8 bg-border" />

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
