import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

export const Providers: React.FC = () => {
  return <RouterProvider router={router} />;
};
