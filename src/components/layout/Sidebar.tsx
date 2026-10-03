import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Database,
  Building2,
  Users,
  UserCircle,
  Wrench,
  Package,
  ChevronDown,
  ChevronUp,
  X,
  Ship,
} from 'lucide-react';
import { ROUTES } from '@/utils/constants';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const masterSubItems: NavItem[] = [
  { label: 'Branch', path: ROUTES.BRANCHES, icon: <Building2 size={16} /> },
  { label: 'User', path: ROUTES.USERS, icon: <Users size={16} /> },
  { label: 'Client', path: ROUTES.CLIENTS, icon: <UserCircle size={16} /> },
  { label: 'Service', path: ROUTES.SERVICES, icon: <Wrench size={16} /> },
  { label: 'Product', path: ROUTES.PRODUCTS, icon: <Package size={16} /> },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, isCollapsed }) => {
  const location = useLocation();
  const isMasterActive = location.pathname.startsWith('/master');
  const [masterExpanded, setMasterExpanded] = useState(isMasterActive);

  // Keep Master expanded when navigating within Master routes
  useEffect(() => {
    if (isMasterActive) {
      setMasterExpanded(true);
    }
  }, [isMasterActive]);

  const toggleMaster = () => {
    setMasterExpanded(!masterExpanded);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full bg-sidebar
          flex flex-col transition-all duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isCollapsed ? 'lg:w-[68px]' : 'lg:w-[240px]'}
          ${isOpen ? 'translate-x-0 w-[240px]' : '-translate-x-full w-[240px]'}
        `}
      >
        {/* Brand / Logo */}
        <div className="flex items-center justify-between h-[60px] px-4 border-b border-white/8 flex-shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <Ship size={20} className="text-white" />
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <h1 className="text-[15px] font-bold text-white leading-tight tracking-tight">
                  CARGO
                </h1>
                <p className="text-[10px] text-text-light leading-tight tracking-[0.15em] uppercase">
                  Management
                </p>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-text-light hover:text-white hover:bg-sidebar-hover transition-colors lg:hidden focus-ring"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 sidebar-scroll">
          {/* Dashboard */}
          <NavLink
            to={ROUTES.DASHBOARD}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors mb-1
              ${
                isActive
                  ? 'bg-sidebar-active text-white'
                  : 'text-text-light hover:bg-sidebar-hover hover:text-white'
              }`
            }
          >
            <LayoutDashboard size={17} className="flex-shrink-0" />
            {!isCollapsed && <span>Dashboard</span>}
          </NavLink>

          {/* Modules label */}
          {!isCollapsed && (
            <div className="mt-6 mb-3 px-3">
              <span className="text-[10px] font-semibold text-text-muted/70 uppercase tracking-[0.15em]">
                Modules
              </span>
            </div>
          )}

          {isCollapsed && <div className="mt-4" />}

          {/* Master menu */}
          <div>
            <button
              onClick={toggleMaster}
              className={`
                w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium
                transition-colors mb-0.5
                ${
                  isMasterActive
                    ? 'bg-sidebar-active text-white'
                    : 'text-text-light hover:bg-sidebar-hover hover:text-white'
                }
              `}
            >
              <span className="flex items-center gap-3">
                <Database size={17} className="flex-shrink-0" />
                {!isCollapsed && <span>Master</span>}
              </span>
              {!isCollapsed && (
                masterExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />
              )}
            </button>

            {/* Sub items with smooth expand/collapse */}
            {!isCollapsed && (
              <div
                className={`
                  overflow-hidden transition-all duration-250 ease-in-out
                  ${masterExpanded ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}
                `}
              >
                <div className="ml-3 pl-3 mt-1 space-y-0.5 border-l border-white/10">
                  {masterSubItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => {
                        if (window.innerWidth < 1024) onClose();
                      }}
                      className={({ isActive }) =>
                        `relative flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] transition-all
                        ${
                          isActive
                            ? 'bg-primary/30 text-white font-semibold'
                            : 'text-text-light/70 hover:bg-sidebar-hover hover:text-white'
                        }`
                      }
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="px-4 py-3 border-t border-white/8 flex-shrink-0">
            <p className="text-[10px] text-text-muted/50 text-center">
              © 2026 Cargo Management
            </p>
          </div>
        )}
      </aside>
    </>
  );
};
