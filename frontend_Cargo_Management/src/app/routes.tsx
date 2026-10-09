import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { DashboardPage, MasterRedirect } from '@/features/dashboard/DashboardPage';
import { BranchPage } from '@/features/master/branch/pages/BranchPage';
import { UserPage } from '@/features/master/user/pages/UserPage';
import { ClientPage } from '@/features/master/client/pages/ClientPage';
import { ServicePage } from '@/features/master/service/pages/ServicePage';
import { ProductPage } from '@/features/master/product/pages/ProductPage';
import { SignInPage } from '@/features/auth/SignInPage';

export const router = createBrowserRouter([
  {
    path: '/sign-in',
    element: <SignInPage />,
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'master',
        element: <MasterRedirect />,
      },
      {
        path: 'master/branches',
        element: <BranchPage />,
      },
      {
        path: 'master/users',
        element: <UserPage />,
      },
      {
        path: 'master/clients',
        element: <ClientPage />,
      },
      {
        path: 'master/services',
        element: <ServicePage />,
      },
      {
        path: 'master/products',
        element: <ProductPage />,
      },
    ],
  },
]);
