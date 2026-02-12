import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { VerticalScrollAreaDemoContainer } from './demos/vertical-scroll-area-demo-container';
import { HorizontalScrollAreaDemoContainer } from './demos/horizontal-scroll-area-demo-container';
import { BothScrollAreaDemoContainer } from './demos/both-scroll-area-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-scroll-area-page',
  imports: [
    VerticalScrollAreaDemoContainer,
    HorizontalScrollAreaDemoContainer,
    BothScrollAreaDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">ScrollArea</h1>
        <p class="text-muted-foreground">
          Augments native scroll functionality for custom, cross-browser styling
          with a custom scrollbar.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-vertical-scroll-area-demo-container />
        <app-horizontal-scroll-area-demo-container />
        <app-both-scroll-area-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ScrollAreaPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'scroll-area')!
    .status;
}
