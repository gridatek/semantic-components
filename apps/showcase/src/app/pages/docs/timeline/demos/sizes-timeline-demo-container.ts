import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SizesTimelineDemo } from './sizes-timeline-demo';

@Component({
  selector: 'app-sizes-timeline-demo-container',
  imports: [DemoContainer, SizesTimelineDemo],
  template: `
    <app-demo-container title="Dot Sizes" [code]="code">
      <app-sizes-timeline-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesTimelineDemoContainer {
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
  selector: 'app-sizes-timeline-demo',
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
        <div sc-timeline-dot size="sm"></div>
        <div sc-timeline-content>
          <h4 sc-timeline-title>Small Dot</h4>
          <p sc-timeline-description>
            Using size="sm" for a smaller indicator.
          </p>
        </div>
      </div>

      <div sc-timeline-item>
        <div sc-timeline-connector></div>
        <div sc-timeline-dot size="default"></div>
        <div sc-timeline-content>
          <h4 sc-timeline-title>Default Dot</h4>
          <p sc-timeline-description>
            Using default size for standard indicator.
          </p>
        </div>
      </div>

      <div sc-timeline-item>
        <div sc-timeline-dot size="lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="size-4"
          >
            <path
              d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
            />
          </svg>
        </div>
        <div sc-timeline-content>
          <h4 sc-timeline-title>Large Dot with Icon</h4>
          <p sc-timeline-description>Using size="lg" with an icon inside.</p>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesTimelineDemo {}`;
}
