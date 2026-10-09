import React from 'react';
import { Navigate } from 'react-router-dom';
import {
  Building2,
  Users,
  UserCircle,
  Wrench,
  Package,
  Ship,
  TrendingUp,
  Globe,
} from 'lucide-react';
import { ROUTES } from '@/utils/constants';

const stats = [
  { label: 'Total Branches', value: '12', icon: <Building2 size={20} />, color: 'bg-primary' },
  { label: 'Active Users', value: '48', icon: <Users size={20} />, color: 'bg-success' },
  { label: 'Clients', value: '156', icon: <UserCircle size={20} />, color: 'bg-info' },
  { label: 'Shipments', value: '1,024', icon: <Ship size={20} />, color: 'bg-warning' },
];

const quickLinks = [
  { label: 'Branch Master', path: ROUTES.BRANCHES, icon: <Building2 size={18} />, desc: 'Manage all branch offices' },
  { label: 'User Master', path: ROUTES.USERS, icon: <Users size={18} />, desc: 'Manage system users' },
  { label: 'Client Master', path: ROUTES.CLIENTS, icon: <UserCircle size={18} />, desc: 'Exporters & Consignees' },
  { label: 'Service Master', path: ROUTES.SERVICES, icon: <Wrench size={18} />, desc: 'Logistics services' },
  { label: 'Product Master', path: ROUTES.PRODUCTS, icon: <Package size={18} />, desc: 'Product catalog & HSN' },
];

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Welcome card */}
      <div className="bg-gradient-to-r from-primary to-primary-light rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold mb-1">Welcome to Cargo Management System</h1>
            <p className="text-blue-100 text-sm">Enterprise logistics & shipment management platform</p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-blue-100">
            <Globe size={18} />
            <span className="text-sm">v1.0.0</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-lg border border-border p-4 flex items-center gap-4 hover:shadow-sm transition-shadow"
          >
            <div className={`${stat.color} text-white w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
              <p className="text-xs text-text-muted">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="bg-white rounded-lg border border-border">
        <div className="px-5 py-3.5 bg-primary rounded-t-lg flex items-center gap-2">
          <TrendingUp size={16} className="text-white" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wide">Quick Access - Master Modules</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-border">
          {quickLinks.map((link) => (
            <a
              key={link.path}
              href={link.path}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = link.path;
              }}
              className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors group"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                {link.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">{link.label}</p>
                <p className="text-xs text-text-muted">{link.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

// Redirect /master to /master/branches
export const MasterRedirect: React.FC = () => {
  return <Navigate to={ROUTES.BRANCHES} replace />;
};
