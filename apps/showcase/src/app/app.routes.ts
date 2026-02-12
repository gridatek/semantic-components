import { Route } from '@angular/router';
import { StackedLayout } from './components/stacked-layout/stacked-layout';
import { componentsRoutes } from './routes/components.routes';
import { demosRoutes } from './routes/demos.routes';

export const appRoutes: Route[] = [
  ...demosRoutes,
  ...componentsRoutes,
  {
    path: '',
    component: StackedLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home'),
      },
    ],
  },
];
