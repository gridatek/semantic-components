import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ActivityTimelineDemo } from './activity-timeline-demo';

@Component({
  selector: 'app-activity-timeline-demo-container',
  imports: [DemoContainer, ActivityTimelineDemo],
  template: `
    <app-demo-container title="Activity Feed" [code]="code">
      <app-activity-timeline-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityTimelineDemoContainer {
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
  ScTimelineTime,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-activity-timeline-demo',
  imports: [
    ScTimeline,
    ScTimelineItem,
    ScTimelineConnector,
    ScTimelineDot,
    ScTimelineContent,
    ScTimelineTime,
  ],
  template: \`
    <div class="rounded-lg border p-4">
      <h4 class="mb-4 font-semibold">Recent Activity</h4>
      <div scTimeline class="ml-2">
        <div scTimelineItem class="pb-4">
          <div scTimelineConnector></div>
          <div scTimelineDot size="sm" variant="default"></div>
          <div scTimelineContent class="space-y-0">
            <p class="text-sm">
              <span class="font-medium">John Doe</span>
              created a new project
            </p>
            <span scTimelineTime>2 hours ago</span>
          </div>
        </div>

        <div scTimelineItem class="pb-4">
          <div scTimelineConnector></div>
          <div scTimelineDot size="sm" variant="success"></div>
          <div scTimelineContent class="space-y-0">
            <p class="text-sm">
              <span class="font-medium">Jane Smith</span>
              completed the review
            </p>
            <span scTimelineTime>4 hours ago</span>
          </div>
        </div>

        <div scTimelineItem class="pb-4">
          <div scTimelineConnector></div>
          <div scTimelineDot size="sm" variant="outline"></div>
          <div scTimelineContent class="space-y-0">
            <p class="text-sm">
              <span class="font-medium">Bob Wilson</span>
              added a comment
            </p>
            <span scTimelineTime>Yesterday</span>
          </div>
        </div>

        <div scTimelineItem class="pb-0">
          <div scTimelineDot size="sm" variant="outline"></div>
          <div scTimelineContent class="space-y-0">
            <p class="text-sm">
              <span class="font-medium">Alice Brown</span>
              joined the team
            </p>
            <span scTimelineTime>2 days ago</span>
          </div>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityTimelineDemo {}`;
}
