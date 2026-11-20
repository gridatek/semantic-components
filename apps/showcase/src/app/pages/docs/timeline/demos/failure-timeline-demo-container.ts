import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FailureTimelineDemo } from './failure-timeline-demo';

@Component({
  selector: 'app-failure-timeline-demo-container',
  imports: [DemoContainer, FailureTimelineDemo],
  template: `
    <app-demo-container
      title="Failure"
      [code]="code"
      demoUrl="/demos/timeline/failure-timeline-demo"
    >
      <app-failure-timeline-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FailureTimelineDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTimeline,
  ScTimelineConnector,
  ScTimelineDescription,
  ScTimelineItem,
  ScTimelineMarker,
  ScTimelineTitle,
} from '@semantic-components/ui';
import { SiCheckIcon, SiXIcon } from '@semantic-icons/lucide-icons';

/** A deployment that stopped: the failed step in the destructive colour — and said in words. */
@Component({
  selector: 'app-failure-timeline-demo',
  imports: [
    ScTimeline,
    ScTimelineItem,
    ScTimelineMarker,
    ScTimelineConnector,
    ScTimelineTitle,
    ScTimelineDescription,
    SiCheckIcon,
    SiXIcon,
  ],
  template: \`
    <div
      scTimeline
      aria-label="Deployment"
      class="w-full max-w-md [--sc-timeline-marker:1.25rem]"
    >
      @for (step of steps; track step.title) {
        <div scTimelineItem [status]="step.status">
          <span scTimelineMarker>
            @if (step.status === 'complete') {
              <svg siCheckIcon></svg>
            } @else if (step.status === 'failed') {
              <svg siXIcon></svg>
            }
          </span>
          <span scTimelineConnector></span>
          <h3 scTimelineTitle>{{ step.title }}</h3>
          <p scTimelineDescription>{{ step.description }}</p>
        </div>
      }
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FailureTimelineDemo {
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
}`;
}
