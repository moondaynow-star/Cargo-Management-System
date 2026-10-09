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
  User,
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

const itemBase = 'flex items-center gap-3 px-3 h-10 rounded-control text-[13px] font-medium transition-colors';

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, isCollapsed }) => {
  const location = useLocation();
  const isMasterActive = location.pathname.startsWith('/master');
  const [masterExpanded, setMasterExpanded] = useState(isMasterActive);

  // Keep Master expanded when navigating within Master routes
  useEffect(() => {
    if (isMasterActive) setMasterExpanded(true);
  }, [isMasterActive]);

  return (
    <>
      {/* Mobile overlay (sits below the header) */}
      {isOpen && (
        <div
          className="fixed inset-x-0 bottom-0 top-[var(--header-h)] bg-black/50 z-40 lg:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed left-0 bottom-0 top-[var(--header-h)] z-50 bg-sidebar
          flex flex-col transition-all duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto lg:top-auto
          ${isCollapsed ? 'lg:w-[var(--sidebar-w-collapsed)]' : 'lg:w-[var(--sidebar-w)]'}
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          w-[var(--sidebar-w)] flex-shrink-0
        `}
      >
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 sidebar-scroll">
          <NavLink
            to={ROUTES.DASHBOARD}
            end
            onClick={() => {
              if (window.innerWidth < 1024) onClose();
            }}
            title="Dashboard"
            className={({ isActive }) =>
              `${itemBase} mb-1 ${
                isActive
                  ? 'bg-sidebar-active text-white'
                  : 'text-text-light hover:bg-sidebar-hover hover:text-white'
              }`
            }
          >
            <LayoutDashboard size={17} className="flex-shrink-0" />
            {!isCollapsed && <span>Dashboard</span>}
          </NavLink>

          {!isCollapsed ? (
            <div className="mt-5 mb-2 px-3">
              <span className="text-[10px] font-semibold text-text-muted/80 uppercase tracking-[0.15em]">
                Modules
              </span>
            </div>
          ) : (
            <div className="mt-4" />
          )}

          {/* Master group */}
          <div>
            <button
              onClick={() => setMasterExpanded(!masterExpanded)}
              title="Master"
              className={`${itemBase} w-full justify-between ${
                isMasterActive
                  ? 'bg-sidebar-active text-white'
                  : 'text-text-light hover:bg-sidebar-hover hover:text-white'
              }`}
            >
              <span className="flex items-center gap-3">
                <Database size={17} className="flex-shrink-0" />
                {!isCollapsed && <span>Master</span>}
              </span>
              {!isCollapsed && (masterExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
            </button>

            {!isCollapsed && (
              <div
                className={`overflow-hidden transition-all duration-200 ease-in-out ${
                  masterExpanded ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="ml-4 pl-3 mt-1 space-y-0.5 border-l border-white/10">
                  {masterSubItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => {
                        if (window.innerWidth < 1024) onClose();
                      }}
                      className={({ isActive }) =>
                        `flex items-center gap-2.5 px-3 h-9 rounded-control text-[13px] transition-colors ${
                          isActive
                            ? 'bg-primary text-white font-semibold'
                            : 'text-text-light/75 hover:bg-sidebar-hover hover:text-white'
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

        {/* Bottom user profile area */}
        <div className="flex-shrink-0 border-t border-white/10 px-3 py-3">
          <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : 'px-1'}`}>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0">
              <User size={15} />
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-white leading-tight truncate">Admin</p>
                <p className="text-[11px] text-text-muted leading-tight truncate">Administrator</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
