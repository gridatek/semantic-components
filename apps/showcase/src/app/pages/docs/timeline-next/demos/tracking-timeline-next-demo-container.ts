import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TrackingTimelineNextDemo } from './tracking-timeline-next-demo';

@Component({
  selector: 'app-tracking-timeline-next-demo-container',
  imports: [DemoContainer, TrackingTimelineNextDemo],
  template: `
    <app-demo-container
      title="Tracking"
      [code]="code"
      demoUrl="/demos/timeline-next/tracking-timeline-next-demo"
    >
      <app-tracking-timeline-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TrackingTimelineNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScTimelineNext, ScTimelineNextItem, ScTimelineNextMarker, ScTimelineNextContent, ScTimelineNextTitle, ScTimelineNextTime, type ScTimelineStatus } from '@semantic-components/ui-lab';
import { SiCheckIcon, SiTruckIcon, SiHouseIcon } from '@semantic-icons/lucide-icons';

/** Progress: done (filled, solid line), current (a ring — aria-current="step"), to come (outlined, dashed). The status is said in words too. */
@Component({
  selector: 'app-tracking-timeline-next-demo',
  imports: [ScTimelineNext, ScTimelineNextItem, ScTimelineNextMarker, ScTimelineNextContent, ScTimelineNextTitle, ScTimelineNextTime, SiCheckIcon, SiTruckIcon, SiHouseIcon],
  template: \`
    <ol scTimelineNext aria-label="Order 4815" class="w-full max-w-md">
      @for (step of steps; track step.title) {
        <li scTimelineNextItem [status]="step.status">
          <div scTimelineNextMarker>
            @switch (step.status) {
              @case ('done') { <svg siCheckIcon></svg> }
              @case ('current') { <svg siTruckIcon></svg> }
              @default { <svg siHouseIcon></svg> }
            }
          </div>
          <div scTimelineNextContent>
            <p scTimelineNextTitle>
              {{ step.title }}
              <span class="sr-only">— {{ said[step.status] }}</span>
            </p>
            @if (step.at; as at) {
              <time scTimelineNextTime [value]="at"></time>
            }
          </div>
        </li>
      }
    </ol>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TrackingTimelineNextDemo {
  readonly steps: readonly {
    title: string;
    status: ScTimelineStatus;
    at?: Temporal.PlainDateTime;
  }[] = [
    { title: 'Ordered', status: 'done', at: Temporal.PlainDateTime.from('2026-10-18T10:12') },
    { title: 'Packed', status: 'done', at: Temporal.PlainDateTime.from('2026-10-19T08:40') },
    { title: 'Shipped', status: 'done', at: Temporal.PlainDateTime.from('2026-10-19T17:05') },
    { title: 'Out for delivery', status: 'current', at: Temporal.PlainDateTime.from('2026-10-21T07:55') },
    { title: 'Delivered', status: 'upcoming' },
  ];
  readonly said: Record<ScTimelineStatus, string> = {
    done: 'done',
    current: 'in progress',
    upcoming: 'to come',
  };
}`;
}
