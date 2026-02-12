import { Route } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';

export const appRoutes: Route[] = [
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page'),
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home'),
      },
    ],
  },
];
