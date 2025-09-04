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
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];
