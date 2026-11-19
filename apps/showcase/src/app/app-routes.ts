import { Route } from '@angular/router';
import { StackedLayout } from './components/stacked-layout/stacked-layout';
import { aboutRoutes } from './routes/about-routes';
import { aiElementsRoutes } from './routes/ai-elements-routes';
import { componentsRoutes } from './routes/components-routes';
import { demosRoutes } from './routes/demos-routes';
import { gettingStartedRoutes } from './routes/getting-started-routes';
import { guidesRoutes } from './routes/guides-routes';
import { packagesRoutes } from './routes/packages-routes';

export const appRoutes: Route[] = [
  ...demosRoutes,
  ...gettingStartedRoutes,
  ...packagesRoutes,
  ...guidesRoutes,
  ...aboutRoutes,
  ...componentsRoutes,
  ...aiElementsRoutes,
  {
    path: '',
    component: StackedLayout,
    children: [
      {
        path: '',
        title: 'Semantic Components',
        loadComponent: () => import('./pages/home/home'),
      },
      {
        path: 'customize',
        title: 'Customize - Semantic Components',
        loadComponent: () => import('./pages/customize/customize'),
      },
      {
        path: 'components',
        title: 'Components - Semantic Components',
        loadComponent: () => import('./pages/components/components'),
      },
      {
        path: 'ai-elements',
        title: 'AI Elements - Semantic Components',
        loadComponent: () => import('./pages/ai-elements/ai-elements'),
      },
      {
        path: 'charts',
        title: 'Charts - Semantic Components',
        loadComponent: () => import('./pages/charts/charts'),
      },
      {
        path: 'typeset',
        title: 'Typeset - Semantic Components',
        loadComponent: () => import('./pages/typeset/typeset'),
      },
    ],
  },
];
