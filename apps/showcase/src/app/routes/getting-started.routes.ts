import { Route } from '@angular/router';
import { DocsLayout } from '../layouts/docs-layout/docs-layout';

export const gettingStartedRoutes: Route[] = [
  {
    path: 'docs/getting-started',
    component: DocsLayout,
    children: [
      {
        path: '',
        redirectTo: 'prerequisites',
        pathMatch: 'full',
      },
      {
        path: 'prerequisites',
        loadComponent: () =>
          import('../pages/getting-started/prerequisites.page'),
      },
      {
        path: 'core',
        loadComponent: () => import('../pages/getting-started/core.page'),
      },
      {
        path: 'carousel',
        loadComponent: () => import('../pages/getting-started/carousel.page'),
      },
    ],
  },
];
