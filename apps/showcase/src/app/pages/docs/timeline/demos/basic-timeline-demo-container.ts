import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicTimelineDemo } from './basic-timeline-demo';

@Component({
  selector: 'app-basic-timeline-demo-container',
  imports: [DemoContainer, BasicTimelineDemo],
  template: `
    <app-demo-container title="Basic" [code]="code">
      <app-basic-timeline-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicTimelineDemoContainer {
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
  ScTimelineTime,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-timeline-demo',
  imports: [
    ScTimeline,
    ScTimelineItem,
    ScTimelineConnector,
    ScTimelineDot,
    ScTimelineContent,
    ScTimelineTitle,
    ScTimelineDescription,
    ScTimelineTime,
  ],
  template: \`
    <div sc-timeline class="ml-4">
      <div sc-timeline-item>
        <div sc-timeline-connector></div>
        <div sc-timeline-dot></div>
        <div sc-timeline-content>
          <h4 sc-timeline-title>Project Started</h4>
          <p sc-timeline-description>
            Initial setup and planning phase completed.
          </p>
          <span sc-timeline-time>January 2024</span>
        </div>
      </div>

      <div sc-timeline-item>
        <div sc-timeline-connector></div>
        <div sc-timeline-dot></div>
        <div sc-timeline-content>
          <h4 sc-timeline-title>Development Phase</h4>
          <p sc-timeline-description>Core features implementation began.</p>
          <span sc-timeline-time>February 2024</span>
        </div>
      </div>

      <div sc-timeline-item>
        <div sc-timeline-dot></div>
        <div sc-timeline-content>
          <h4 sc-timeline-title>Launch</h4>
          <p sc-timeline-description>Product launched to production.</p>
          <span sc-timeline-time>March 2024</span>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicTimelineDemo {}`;
}
