import {
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
  template: `
    <div scTimeline class="ml-4">
      <div scTimelineItem>
        <div scTimelineConnector></div>
        <div scTimelineDot size="sm"></div>
        <div scTimelineContent>
          <h4 scTimelineTitle>Small Dot</h4>
          <p scTimelineDescription>
            Using size="sm" for a smaller indicator.
          </p>
        </div>
      </div>

      <div scTimelineItem>
        <div scTimelineConnector></div>
        <div scTimelineDot size="default"></div>
        <div scTimelineContent>
          <h4 scTimelineTitle>Default Dot</h4>
          <p scTimelineDescription>
            Using default size for standard indicator.
          </p>
        </div>
      </div>

      <div scTimelineItem>
        <div scTimelineDot size="lg">
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
        <div scTimelineContent>
          <h4 scTimelineTitle>Large Dot with Icon</h4>
          <p scTimelineDescription>Using size="lg" with an icon inside.</p>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesTimelineDemo {}
