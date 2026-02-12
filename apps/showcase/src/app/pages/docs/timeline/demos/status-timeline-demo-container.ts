import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { StatusTimelineDemo } from './status-timeline-demo';

@Component({
  selector: 'app-status-timeline-demo-container',
  imports: [DemoContainer, StatusTimelineDemo],
  template: `
    <app-demo-container title="Status Variants" [code]="code">
      <app-status-timeline-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusTimelineDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScTimeline,
  ScTimelineItem,
  ScTimelineConnector,
  ScTimelineDot,
  ScTimelineContent,
  ScTimelineTitle,
  ScTimelineDescription,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-status-timeline-demo',
  imports: [
    ScTimeline,
    ScTimelineItem,
    ScTimelineConnector,
    ScTimelineDot,
    ScTimelineContent,
    ScTimelineTitle,
    ScTimelineDescription,
  ],
  template: \`
    <div sc-timeline class="ml-4">
      <div sc-timeline-item>
        <div sc-timeline-connector></div>
        <div sc-timeline-dot variant="success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="size-3"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <div sc-timeline-content>
          <h4 sc-timeline-title>Completed</h4>
          <p sc-timeline-description>
            This task has been completed successfully.
          </p>
        </div>
      </div>

      <div sc-timeline-item>
        <div sc-timeline-connector></div>
        <div sc-timeline-dot variant="warning">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="size-3"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
          </svg>
        </div>
        <div sc-timeline-content>
          <h4 sc-timeline-title>In Progress</h4>
          <p sc-timeline-description>This task is currently being worked on.</p>
        </div>
      </div>

      <div sc-timeline-item>
        <div sc-timeline-connector></div>
        <div sc-timeline-dot variant="error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="size-3"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </div>
        <div sc-timeline-content>
          <h4 sc-timeline-title>Failed</h4>
          <p sc-timeline-description>This task encountered an error.</p>
        </div>
      </div>

      <div sc-timeline-item>
        <div sc-timeline-dot variant="outline"></div>
        <div sc-timeline-content>
          <h4 sc-timeline-title>Pending</h4>
          <p sc-timeline-description>This task is waiting to start.</p>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusTimelineDemo {}`;
}
