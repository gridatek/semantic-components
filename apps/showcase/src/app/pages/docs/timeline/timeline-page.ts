import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicTimelineDemoContainer } from './demos/basic-timeline-demo-container';
import { StatusTimelineDemoContainer } from './demos/status-timeline-demo-container';
import { SizesTimelineDemoContainer } from './demos/sizes-timeline-demo-container';
import { ActivityTimelineDemoContainer } from './demos/activity-timeline-demo-container';
import { TrackingTimelineDemoContainer } from './demos/tracking-timeline-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-timeline-page',
  imports: [
    BasicTimelineDemoContainer,
    StatusTimelineDemoContainer,
    SizesTimelineDemoContainer,
    ActivityTimelineDemoContainer,
    TrackingTimelineDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Timeline</h1>
        <p class="text-muted-foreground">
          Display a sequence of events or activities in chronological order.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-timeline-demo-container />
        <app-status-timeline-demo-container />
        <app-sizes-timeline-demo-container />
        <app-activity-timeline-demo-container />
        <app-tracking-timeline-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TimelinePage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'timeline')!
    .status;
}
