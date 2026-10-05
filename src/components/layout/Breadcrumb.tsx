import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { ROUTES } from '@/utils/constants';

const routeLabels: Record<string, string> = {
  '/master': 'Master',
  '/master/branches': 'Branch',
  '/master/users': 'User',
  '/master/clients': 'Client',
  '/master/services': 'Service',
  '/master/products': 'Product',
};

export const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const crumbs: { label: string; path: string }[] = [];
  let currentPath = '';

  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    const label = routeLabels[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1);
    crumbs.push({ label, path: currentPath });
  });

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px]">
      <Link
        to={ROUTES.DASHBOARD}
        className="flex items-center gap-1.5 text-text-muted hover:text-primary transition-colors"
      >
        <Home size={15} />
        <span className="hidden sm:inline">Home</span>
      </Link>

      {crumbs.map((crumb, idx) => (
        <React.Fragment key={crumb.path}>
          <ChevronRight size={13} className="text-text-muted/60" />
          {idx === crumbs.length - 1 ? (
            <span className="font-semibold text-text-primary">{crumb.label}</span>
          ) : (
            <Link to={crumb.path} className="text-text-muted hover:text-primary transition-colors">
              {crumb.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
