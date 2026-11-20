import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScTimeline,
  ScTimelineConnector,
  ScTimelineDescription,
  ScTimelineItem,
  ScTimelineMarker,
  ScTimelineTime,
  ScTimelineTitle,
} from '@semantic-components/ui';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

/** An order’s steps: complete, current, upcoming — said in words too, not only by the markers. Focus starts on the current step; the button moves it there. */
@Component({
  selector: 'app-status-timeline-demo',
  imports: [
    ScButton,
    ScTimeline,
    ScTimelineItem,
    ScTimelineMarker,
    ScTimelineConnector,
    ScTimelineTitle,
    ScTimelineTime,
    ScTimelineDescription,
    SiCheckIcon,
  ],
  template: `
    <div class="flex w-full max-w-md flex-col gap-4">
      <div
        scTimeline
        #timeline="scTimeline"
        aria-label="Order status"
        class="[--sc-timeline-marker:1.25rem]"
      >
        @for (step of steps; track step.value) {
          <div scTimelineItem [value]="step.value" [status]="step.status">
            <span scTimelineMarker>
              @if (step.status === 'complete') {
                <svg siCheckIcon></svg>
              }
            </span>
            <span scTimelineConnector></span>
            <h3 scTimelineTitle>{{ step.title }}</h3>
            <time
              scTimelineTime
              [value]="step.date"
              [options]="{ month: 'short', day: 'numeric' }"
            ></time>
            <p scTimelineDescription>{{ step.state }}</p>
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class StatusTimelineDemo {
  private readonly steps = [
    {
      value: 'placed',
      status: 'complete',
      title: 'Order placed',
      date: Temporal.PlainDate.from('2026-11-01'),
      state: 'Done',
    },
    {
      value: 'packed',
      status: 'complete',
      title: 'Packed',
      date: Temporal.PlainDate.from('2026-11-02'),
      state: 'Done',
    },
    {
      value: 'shipped',
      status: 'current',
      title: 'Shipped',
      date: Temporal.PlainDate.from('2026-11-03'),
      state: 'On its way',
    },
    {
      value: 'delivered',
      status: 'upcoming',
      title: 'Delivered',
      date: Temporal.PlainDate.from('2026-11-05'),
      state: 'Expected',
    },
  ] as const;
}
