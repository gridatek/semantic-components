import { Route } from '@angular/router';
import { DocsLayout } from '../layouts/docs-layout/docs-layout';

/** The charts' pages: /docs/charts/…, their sidebar group's address. */
export const chartsRoutes: Route[] = [
  {
    path: 'docs/charts',
    component: DocsLayout,
    children: [
      // The charts' page.
      { path: '', pathMatch: 'full', redirectTo: '/charts' },
      {
        path: 'area-chart',
        title: 'Area Chart - Semantic Components',
        loadComponent: () => import('../pages/docs/area-chart/area-chart-page'),
      },
      {
        path: 'bar-chart',
        title: 'Bar Chart - Semantic Components',
        loadComponent: () => import('../pages/docs/bar-chart/bar-chart-page'),
      },
      {
        path: 'chart',
        title: 'Chart - Semantic Components',
        loadComponent: () => import('../pages/docs/chart/chart-page'),
      },
      {
        path: 'funnel-chart',
        title: 'Funnel Chart - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/funnel-chart/funnel-chart-page'),
      },
      {
        path: 'line-chart',
        title: 'Line Chart - Semantic Components',
        loadComponent: () => import('../pages/docs/line-chart/line-chart-page'),
      },
      {
        path: 'pie-chart',
        title: 'Pie Chart - Semantic Components',
        loadComponent: () => import('../pages/docs/pie-chart/pie-chart-page'),
      },
      {
        path: 'radar-chart',
        title: 'Radar Chart - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/radar-chart/radar-chart-page'),
      },
      {
        path: 'radial-chart',
        title: 'Radial Chart - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/radial-chart/radial-chart-page'),
      },
      {
        path: 'sankey-chart',
        title: 'Sankey Chart - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/sankey-chart/sankey-chart-page'),
      },
      {
        path: 'scatter-chart',
        title: 'Scatter Chart - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/scatter-chart/scatter-chart-page'),
      },
      {
        path: 'sunburst-chart',
        title: 'Sunburst Chart - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/sunburst-chart/sunburst-chart-page'),
      },
      {
        path: 'treemap-chart',
        title: 'Treemap Chart - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/treemap-chart/treemap-chart-page'),
      },
    ],
  },
];
