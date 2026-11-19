import { Route } from '@angular/router';
import { DocsLayout } from '../layouts/docs-layout/docs-layout';

export const aboutRoutes: Route[] = [
  {
    path: 'docs/about',
    component: DocsLayout,
    children: [
      {
        path: '',
        redirectTo: 'changelog',
        pathMatch: 'full',
      },
      {
        path: 'changelog',
        title: 'Changelog - Semantic Components',
        loadComponent: () => import('../pages/about/changelog-page'),
      },
      {
        path: 'credits',
        title: 'Credits - Semantic Components',
        loadComponent: () => import('../pages/about/credits-page'),
      },
      {
        path: 'roadmap',
        title: 'Roadmap - Semantic Components',
        loadComponent: () => import('../pages/about/roadmap-page'),
      },
    ],
  },
];
