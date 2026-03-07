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
  host: { class: 'block w-full' },
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
  ScTimelineConnector,
  ScTimelineContent,
  ScTimelineDescription,
  ScTimelineDot,
  ScTimelineItem,
  ScTimelineTitle,
} from '@semantic-components/ui-lab';
import {
  SiCheckIcon,
  SiCircleAlertIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

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
    SiCheckIcon,
    SiCircleAlertIcon,
    SiXIcon,
  ],
  template: \`
    <div scTimeline class="ml-4 w-full max-w-2xl">
      <div scTimelineItem>
        <div scTimelineConnector></div>
        <div scTimelineDot variant="success">
          <svg siCheckIcon class="size-3"></svg>
        </div>
        <div scTimelineContent>
          <h4 scTimelineTitle>Completed</h4>
          <p scTimelineDescription>
            This task has been completed successfully.
          </p>
        </div>
      </div>

      <div scTimelineItem>
        <div scTimelineConnector></div>
        <div scTimelineDot variant="warning">
          <svg siCircleAlertIcon class="size-3"></svg>
        </div>
        <div scTimelineContent>
          <h4 scTimelineTitle>In Progress</h4>
          <p scTimelineDescription>This task is currently being worked on.</p>
        </div>
      </div>

      <div scTimelineItem>
        <div scTimelineConnector></div>
        <div scTimelineDot variant="error">
          <svg siXIcon class="size-3"></svg>
        </div>
        <div scTimelineContent>
          <h4 scTimelineTitle>Failed</h4>
          <p scTimelineDescription>This task encountered an error.</p>
        </div>
      </div>

      <div scTimelineItem>
        <div scTimelineDot variant="outline"></div>
        <div scTimelineContent>
          <h4 scTimelineTitle>Pending</h4>
          <p scTimelineDescription>This task is waiting to start.</p>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusTimelineDemo {}`;
}
