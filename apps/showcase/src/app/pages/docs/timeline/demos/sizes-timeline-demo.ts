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
import { SiDollarSignIcon } from '@semantic-icons/lucide-icons';

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
    SiDollarSignIcon,
  ],
  template: `
    <div scTimeline class="ml-4">
      <div scTimelineItem>
        <div scTimelineConnector></div>
        <div scTimelineDot size="sm"></div>
        <div scTimelineContent>
          <h4 scTimelineTitle>Small Dot</h4>
          <p scTimelineDescription>Using size="sm" for a smaller indicator.</p>
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
          <svg siDollarSignIcon class="size-4"></svg>
        </div>
        <div scTimelineContent>
          <h4 scTimelineTitle>Large Dot with Icon</h4>
          <p scTimelineDescription>Using size="lg" with an icon inside.</p>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesTimelineDemo {}
