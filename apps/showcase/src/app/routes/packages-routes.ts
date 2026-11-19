import { Route } from '@angular/router';
import { DocsLayout } from '../layouts/docs-layout/docs-layout';

export const packagesRoutes: Route[] = [
  {
    path: 'docs/packages',
    component: DocsLayout,
    children: [
      {
        path: '',
        redirectTo: 'ui',
        pathMatch: 'full',
      },
      {
        path: 'ui',
        title: 'UI - Semantic Components',
        loadComponent: () => import('../pages/packages/ui-package-page'),
      },
      {
        path: 'styles',
        title: 'Styles - Semantic Components',
        loadComponent: () => import('../pages/packages/styles-page'),
      },
      {
        path: 'mcp-server',
        title: 'MCP Server - Semantic Components',
        loadComponent: () => import('../pages/packages/mcp-server-page'),
      },
    ],
  },
];
