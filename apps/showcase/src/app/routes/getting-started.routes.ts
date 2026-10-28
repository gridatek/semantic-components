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
          import('../pages/getting-started/introduction.page'),
      },
      {
        path: 'prerequisites',
        title: 'Prerequisites - Semantic Components',
        loadComponent: () =>
          import('../pages/getting-started/prerequisites.page'),
      },
      {
        path: 'ui',
        title: 'UI - Semantic Components',
        loadComponent: () => import('../pages/getting-started/ui.page'),
      },
      {
        path: 'presets',
        title: 'Presets - Semantic Components',
        loadComponent: () => import('../pages/getting-started/presets.page'),
      },
      {
        path: 'i18n',
        title: 'Internationalization - Semantic Components',
        loadComponent: () => import('../pages/getting-started/i18n.page'),
      },
      {
        path: 'mcp-server',
        title: 'MCP Server - Semantic Components',
        loadComponent: () => import('../pages/getting-started/mcp-server.page'),
      },
    ],
  },
];
