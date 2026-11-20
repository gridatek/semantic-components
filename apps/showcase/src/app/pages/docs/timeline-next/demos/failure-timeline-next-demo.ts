import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTimelineNext,
  ScTimelineNextConnector,
  ScTimelineNextDescription,
  ScTimelineNextItem,
  ScTimelineNextMarker,
  ScTimelineNextTitle,
} from '@semantic-components/ui';
import { SiCheckIcon, SiXIcon } from '@semantic-icons/lucide-icons';

/** A deployment that stopped: the failed step in the destructive colour — and said in words. */
@Component({
  selector: 'app-failure-timeline-next-demo',
  imports: [
    ScTimelineNext,
    ScTimelineNextItem,
    ScTimelineNextMarker,
    ScTimelineNextConnector,
    ScTimelineNextTitle,
    ScTimelineNextDescription,
    SiCheckIcon,
    SiXIcon,
  ],
  template: `
    <div
      scTimelineNext
      aria-label="Deployment"
      class="w-full max-w-md [--sc-timeline-marker:1.25rem]"
    >
      @for (step of steps; track step.title) {
        <div scTimelineNextItem [status]="step.status">
          <span scTimelineNextMarker>
            @if (step.status === 'complete') {
              <svg siCheckIcon></svg>
            } @else if (step.status === 'failed') {
              <svg siXIcon></svg>
            }
          </span>
          <span scTimelineNextConnector></span>
          <h3 scTimelineNextTitle>{{ step.title }}</h3>
          <p scTimelineNextDescription>{{ step.description }}</p>
        </div>
      }
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FailureTimelineNextDemo {
  private readonly steps = [
    {
      status: 'complete',
      title: 'Build',
      description: 'Done in 48 seconds.',
    },
    {
      status: 'failed',
      title: 'Tests',
      description: 'Failed: 2 of 312 tests.',
    },
    {
      status: 'upcoming',
      title: 'Deploy',
      description: 'Waiting for the tests to pass.',
    },
  ] as const;
}
