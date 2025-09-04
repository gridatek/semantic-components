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
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];
