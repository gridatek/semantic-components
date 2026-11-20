import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { StatusTimelineNextDemo } from './status-timeline-next-demo';

@Component({
  selector: 'app-status-timeline-next-demo-container',
  imports: [DemoContainer, StatusTimelineNextDemo],
  template: `
    <app-demo-container
      title="Status"
      [code]="code"
      demoUrl="/demos/timeline-next/status-timeline-next-demo"
    >
      <app-status-timeline-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class StatusTimelineNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton, ScTimelineNext, ScTimelineNextItem, ScTimelineNextMarker, ScTimelineNextConnector, ScTimelineNextTitle, ScTimelineNextTime, ScTimelineNextDescription } from '@semantic-components/ui';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

/** An order’s steps: complete, current, upcoming — said in words too, not only by the markers. Focus starts on the current step; the button moves it there. */
@Component({
  selector: 'app-status-timeline-next-demo',
  imports: [ScButton, ScTimelineNext, ScTimelineNextItem, ScTimelineNextMarker, ScTimelineNextConnector, ScTimelineNextTitle, ScTimelineNextTime, ScTimelineNextDescription, SiCheckIcon],
  template: \`
    <div class="flex w-full max-w-md flex-col gap-4">
      <div
        scTimelineNext
        #timeline="scTimelineNext"
        aria-label="Order status"
        class="[--sc-timeline-marker:1.25rem]"
      >
        @for (step of steps; track step.value) {
          <div scTimelineNextItem [value]="step.value" [status]="step.status">
            <span scTimelineNextMarker>
              @if (step.status === 'complete') {
                <svg siCheckIcon></svg>
              }
            </span>
            <span scTimelineNextConnector></span>
            <h3 scTimelineNextTitle>{{ step.title }}</h3>
            <time scTimelineNextTime [attr.datetime]="step.datetime">
              {{ step.date }}
            </time>
            <p scTimelineNextDescription>{{ step.state }}</p>
          </div>
        }
      </div>
      <button
        scButton
        variant="outline"
        class="self-start"
        (click)="timeline.focus('shipped')"
      >
        Go to current step
      </button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class StatusTimelineNextDemo {
  private readonly steps = [
    {
      value: 'placed',
      status: 'complete',
      title: 'Order placed',
      datetime: '2026-11-01',
      date: 'Nov 1',
      state: 'Done',
    },
    {
      value: 'packed',
      status: 'complete',
      title: 'Packed',
      datetime: '2026-11-02',
      date: 'Nov 2',
      state: 'Done',
    },
    {
      value: 'shipped',
      status: 'current',
      title: 'Shipped',
      datetime: '2026-11-03',
      date: 'Nov 3',
      state: 'On its way',
    },
    {
      value: 'delivered',
      status: 'upcoming',
      title: 'Delivered',
      datetime: '2026-11-05',
      date: 'Nov 5',
      state: 'Expected',
    },
  ] as const;
}`;
}
