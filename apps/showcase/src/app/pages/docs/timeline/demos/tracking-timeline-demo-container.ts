import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TrackingTimelineDemo } from './tracking-timeline-demo';

@Component({
  selector: 'app-tracking-timeline-demo-container',
  imports: [DemoContainer, TrackingTimelineDemo],
  template: `
    <app-demo-container
      title="Tracking"
      [code]="code"
      demoUrl="/demos/timeline/tracking-timeline-demo"
    >
      <app-tracking-timeline-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TrackingTimelineDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTimeline,
  ScTimelineContent,
  ScTimelineItem,
  ScTimelineMarker,
  type ScTimelineStatus,
  ScTimelineTime,
  ScTimelineTitle,
} from '@semantic-components/ui-lab';
import {
  SiCheckIcon,
  SiHouseIcon,
  SiTruckIcon,
} from '@semantic-icons/lucide-icons';

/** Progress: done (filled, solid line), current (a ring — aria-current="step"), to come (outlined, dashed). The status is said in words too. */
@Component({
  selector: 'app-tracking-timeline-demo',
  imports: [
    ScTimeline,
    ScTimelineItem,
    ScTimelineMarker,
    ScTimelineContent,
    ScTimelineTitle,
    ScTimelineTime,
    SiCheckIcon,
    SiTruckIcon,
    SiHouseIcon,
  ],
  template: \`
    <ol scTimeline aria-label="Order 4815" class="w-full max-w-md">
      @for (step of steps; track step.title) {
        <li scTimelineItem [status]="step.status">
          <div scTimelineMarker>
            @switch (step.status) {
              @case ('done') {
                <svg siCheckIcon></svg>
              }
              @case ('current') {
                <svg siTruckIcon></svg>
              }
              @default {
                <svg siHouseIcon></svg>
              }
            }
          </div>
          <div scTimelineContent>
            <p scTimelineTitle>
              {{ step.title }}
              <span class="sr-only">— {{ said[step.status] }}</span>
            </p>
            @if (step.at; as at) {
              <time scTimelineTime [value]="at"></time>
            }
          </div>
        </li>
      }
    </ol>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TrackingTimelineDemo {
  readonly steps: readonly {
    title: string;
    status: ScTimelineStatus;
    at?: Temporal.PlainDateTime;
  }[] = [
    {
      title: 'Ordered',
      status: 'done',
      at: Temporal.PlainDateTime.from('2026-10-18T10:12'),
    },
    {
      title: 'Packed',
      status: 'done',
      at: Temporal.PlainDateTime.from('2026-10-19T08:40'),
    },
    {
      title: 'Shipped',
      status: 'done',
      at: Temporal.PlainDateTime.from('2026-10-19T17:05'),
    },
    {
      title: 'Out for delivery',
      status: 'current',
      at: Temporal.PlainDateTime.from('2026-10-21T07:55'),
    },
    { title: 'Delivered', status: 'upcoming' },
  ];
  readonly said: Record<ScTimelineStatus, string> = {
    done: 'done',
    current: 'in progress',
    upcoming: 'to come',
  };
}`;
}
