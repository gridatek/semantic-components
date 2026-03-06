import {
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
  template: `
    <div scTimeline class="ml-4">
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
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusTimelineDemo {}
