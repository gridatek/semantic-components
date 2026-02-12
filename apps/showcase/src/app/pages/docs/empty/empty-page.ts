import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicEmptyDemoContainer } from './demos/basic-empty-demo-container';
import { ActionsEmptyDemoContainer } from './demos/actions-empty-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-empty-page',
  imports: [
    BasicEmptyDemoContainer,
    ActionsEmptyDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Empty</h1>
        <p class="text-muted-foreground">
          A composable empty state component for displaying placeholder content.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-empty-demo-container />
        <app-actions-empty-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EmptyPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'empty')!.status;
}
