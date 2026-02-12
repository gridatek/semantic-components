import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicHoverCardDemoContainer } from './demos/basic-hover-card-demo-container';
import { RightHoverCardDemoContainer } from './demos/right-hover-card-demo-container';
import { TopHoverCardDemoContainer } from './demos/top-hover-card-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-hover-card-page',
  imports: [
    BasicHoverCardDemoContainer,
    RightHoverCardDemoContainer,
    TopHoverCardDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">HoverCard</h1>
        <p class="text-muted-foreground">
          For sighted users to preview content available behind a link.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-hover-card-demo-container />
        <app-right-hover-card-demo-container />
        <app-top-hover-card-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HoverCardPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'hover-card')!
    .status;
}
