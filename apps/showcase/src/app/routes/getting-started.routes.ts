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
        loadComponent: () => import('../pages/getting-started/ui.page'),
      },
      {
        path: 'ui-lab',
        loadComponent: () => import('../pages/getting-started/ui-lab.page'),
      },
      {
        path: 'editor',
        loadComponent: () => import('../pages/getting-started/editor.page'),
      },
      {
        path: 'carousel',
        loadComponent: () => import('../pages/getting-started/carousel.page'),
      },
      {
        path: 'code',
        loadComponent: () => import('../pages/getting-started/code.page'),
      },
    ],
  },
];
