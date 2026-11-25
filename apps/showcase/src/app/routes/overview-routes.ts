import { Route } from '@angular/router';
import { DocsLayout } from '../layouts/docs-layout/docs-layout';

export const overviewRoutes: Route[] = [
  {
    path: 'docs/overview',
    component: DocsLayout,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'introduction',
      },
      {
        path: 'introduction',
        title: 'Introduction - Semantic Components',
        loadComponent: () => import('../pages/overview/introduction-page'),
      },
      {
        path: 'get-started',
        title: 'Get started - Semantic Components',
        loadComponent: () => import('../pages/overview/get-started-page'),
      },
      {
        path: 'components',
        title: 'Components - Semantic Components',
        loadComponent: () => import('../pages/overview/components-page'),
      },
      {
        path: 'credits',
        title: 'Credits - Semantic Components',
        loadComponent: () => import('../pages/overview/credits-page'),
      },
      {
        path: 'roadmap',
        title: 'Roadmap - Semantic Components',
        loadComponent: () => import('../pages/overview/roadmap-page'),
      },
      {
        path: 'changelog',
        title: 'Changelog - Semantic Components',
        loadComponent: () => import('../pages/overview/changelog-page'),
      },
      // Guides now (they were here briefly).
      { path: 'custom-style', redirectTo: '/docs/guides/custom-style' },
      { path: 'i18n', redirectTo: '/docs/guides/i18n' },
      { path: 'rtl', redirectTo: '/docs/guides/rtl' },
    ],
  },
  // Their old addresses (they were "About").
  {
    path: 'docs/about',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/docs/overview/changelog',
      },
      { path: 'credits', redirectTo: '/docs/overview/credits' },
      { path: 'roadmap', redirectTo: '/docs/overview/roadmap' },
      { path: 'changelog', redirectTo: '/docs/overview/changelog' },
    ],
  },
  // Their old addresses (the section was "Getting started").
  {
    path: 'docs/getting-started',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/docs/overview/get-started',
      },
      { path: 'introduction', redirectTo: '/docs/overview/introduction' },
      // Guides now.
      { path: 'custom-style', redirectTo: '/docs/guides/custom-style' },
      { path: 'i18n', redirectTo: '/docs/guides/i18n' },
      { path: 'rtl', redirectTo: '/docs/guides/rtl' },
      { path: 'installation', redirectTo: '/docs/overview/get-started' },
      { path: 'ui', redirectTo: '/docs/overview/get-started' },
      { path: 'prerequisites', redirectTo: '/docs/overview/get-started' },
      { path: 'styles', redirectTo: '/docs/packages/styles' },
      { path: 'mcp-server', redirectTo: '/docs/packages/mcp-server' },
    ],
  },
];
