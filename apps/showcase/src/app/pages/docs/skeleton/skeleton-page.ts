import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicSkeletonDemoContainer } from './demos/basic-skeleton-demo-container';
import { CardSkeletonDemoContainer } from './demos/card-skeleton-demo-container';
import { ArticleSkeletonDemoContainer } from './demos/article-skeleton-demo-container';
import { ListSkeletonDemoContainer } from './demos/list-skeleton-demo-container';
import { TableSkeletonDemoContainer } from './demos/table-skeleton-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-skeleton-page',
  imports: [
    BasicSkeletonDemoContainer,
    CardSkeletonDemoContainer,
    ArticleSkeletonDemoContainer,
    ListSkeletonDemoContainer,
    TableSkeletonDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Skeleton</h1>
        <p class="text-muted-foreground">
          Use to show a placeholder while content is loading.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-skeleton-demo-container />
        <app-card-skeleton-demo-container />
        <app-article-skeleton-demo-container />
        <app-list-skeleton-demo-container />
        <app-table-skeleton-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SkeletonPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'skeleton')!
    .status;
}
