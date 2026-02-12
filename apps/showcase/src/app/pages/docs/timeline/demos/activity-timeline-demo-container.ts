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
      <div sc-timeline class="ml-2">
        <div sc-timeline-item class="pb-4">
          <div sc-timeline-connector></div>
          <div sc-timeline-dot size="sm" variant="default"></div>
          <div sc-timeline-content class="space-y-0">
            <p class="text-sm">
              <span class="font-medium">John Doe</span>
              created a new project
            </p>
            <span sc-timeline-time>2 hours ago</span>
          </div>
        </div>

        <div sc-timeline-item class="pb-4">
          <div sc-timeline-connector></div>
          <div sc-timeline-dot size="sm" variant="success"></div>
          <div sc-timeline-content class="space-y-0">
            <p class="text-sm">
              <span class="font-medium">Jane Smith</span>
              completed the review
            </p>
            <span sc-timeline-time>4 hours ago</span>
          </div>
        </div>

        <div sc-timeline-item class="pb-4">
          <div sc-timeline-connector></div>
          <div sc-timeline-dot size="sm" variant="outline"></div>
          <div sc-timeline-content class="space-y-0">
            <p class="text-sm">
              <span class="font-medium">Bob Wilson</span>
              added a comment
            </p>
            <span sc-timeline-time>Yesterday</span>
          </div>
        </div>

        <div sc-timeline-item class="pb-0">
          <div sc-timeline-dot size="sm" variant="outline"></div>
          <div sc-timeline-content class="space-y-0">
            <p class="text-sm">
              <span class="font-medium">Alice Brown</span>
              joined the team
            </p>
            <span sc-timeline-time>2 days ago</span>
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
