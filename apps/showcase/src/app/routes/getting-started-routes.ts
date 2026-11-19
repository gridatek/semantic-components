import { Route } from '@angular/router';
import { DocsLayout } from '../layouts/docs-layout/docs-layout';

export const gettingStartedRoutes: Route[] = [
  {
    path: 'docs/getting-started',
    component: DocsLayout,
    children: [
      {
        path: '',
        redirectTo: 'introduction',
        pathMatch: 'full',
      },
      {
        path: 'introduction',
        title: 'Introduction - Semantic Components',
        loadComponent: () =>
          import('../pages/getting-started/introduction-page'),
      },
      {
        path: 'installation',
        title: 'Installation - Semantic Components',
        loadComponent: () =>
          import('../pages/getting-started/installation-page'),
      },
      // Their old addresses.
      { path: 'ui', redirectTo: 'installation' },
      { path: 'prerequisites', redirectTo: 'installation' },
      { path: 'styles', redirectTo: '/docs/packages/styles' },
      { path: 'mcp-server', redirectTo: '/docs/packages/mcp-server' },
      {
        path: 'custom-style',
        title: 'Custom style - Semantic Components',
        loadComponent: () =>
          import('../pages/getting-started/custom-style-page'),
      },
      {
        path: 'i18n',
        title: 'Internationalization - Semantic Components',
        loadComponent: () => import('../pages/getting-started/i18n-page'),
      },
      {
        path: 'rtl',
        title: 'Right to left - Semantic Components',
        loadComponent: () => import('../pages/getting-started/rtl-page'),
      },
    ],
  },
];
