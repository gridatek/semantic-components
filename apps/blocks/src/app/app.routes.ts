import { Route } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';

export const appRoutes: Route[] = [
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page'),
  },
  {
    path: 'gallery',
    loadComponent: () => import('./pages/gallery/gallery.page'),
  },
  {
    path: 'data-table',
    loadComponent: () => import('./pages/data-table/data-table.page'),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page'),
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.page'),
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./pages/forgot-password/forgot-password.page'),
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page'),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.page'),
  },
  {
    path: 'server-error',
    loadComponent: () => import('./pages/server-error/server-error.page'),
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home'),
      },
      {
        path: 'pricing',
        loadComponent: () => import('./pages/pricing/pricing.page'),
      },
      {
        path: 'blog',
        loadComponent: () => import('./pages/blog/blog.page'),
      },
      {
        path: 'blog/:slug',
        loadComponent: () => import('./pages/blog-article/blog-article.page'),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.page'),
  },
];
