import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./layouts/stacked-layout').then((m) => m.StackedLayout),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home').then((m) => m.HomePage),
      },
      {
        path: 'about',
        loadComponent: () => import('./pages/about').then((m) => m.AboutPage),
      },
      // CMS Pages
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard').then((m) => m.default),
      },
      {
        path: 'articles',
        loadComponent: () => import('./pages/articles').then((m) => m.default),
      },
      {
        path: 'article-editor',
        loadComponent: () => import('./pages/article-editor').then((m) => m.default),
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings').then((m) => m.default),
      },
      {
        path: 'blog',
        loadComponent: () => import('./pages/blog').then((m) => m.default),
      },
      // Layout Demos
      {
        path: 'demos',
        children: [
          {
            path: 'center-layout',
            loadComponent: () =>
              import('./pages/layout-demos/center-layout-demo').then((m) => m.default),
          },
          {
            path: 'split-layout',
            loadComponent: () =>
              import('./pages/layout-demos/split-layout-demo').then((m) => m.default),
          },
          {
            path: '',
            redirectTo: 'center-layout',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
