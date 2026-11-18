import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    title: 'Custom style',
    loadComponent: () => import('./pages/shadcn/shadcn-page'),
  },
  { path: '**', redirectTo: '' },
];
