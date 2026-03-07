import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TrackingTimelineDemo } from './tracking-timeline-demo';

@Component({
  selector: 'app-tracking-timeline-demo-container',
  imports: [DemoContainer, TrackingTimelineDemo],
  template: `
    <app-demo-container title="Order Tracking" [code]="code">
      <app-tracking-timeline-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackingTimelineDemoContainer {
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
  ScTimelineTime,
  ScTimelineTitle,
} from '@semantic-components/ui-lab';
import {
  SiCheckIcon,
  SiHouseIcon,
  SiPackageIcon,
  SiTruckIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-tracking-timeline-demo',
  imports: [
    ScTimeline,
    ScTimelineItem,
    ScTimelineConnector,
    ScTimelineDot,
    ScTimelineContent,
    ScTimelineTitle,
    ScTimelineDescription,
    ScTimelineTime,
    SiCheckIcon,
    SiPackageIcon,
    SiTruckIcon,
    SiHouseIcon,
  ],
  template: \`
    <div class="rounded-lg border p-4">
      <div scTimeline class="ml-4">
        <div scTimelineItem>
          <div scTimelineConnector></div>
          <div scTimelineDot variant="success" size="lg">
            <svg siCheckIcon class="size-4"></svg>
          </div>
          <div scTimelineContent>
            <h4 scTimelineTitle>Order Placed</h4>
            <p scTimelineDescription>Your order has been confirmed.</p>
            <span scTimelineTime>Jan 15, 2024 at 10:30 AM</span>
          </div>
        </div>

        <div scTimelineItem>
          <div scTimelineConnector></div>
          <div scTimelineDot variant="success" size="lg">
            <svg siPackageIcon class="size-4"></svg>
          </div>
          <div scTimelineContent>
            <h4 scTimelineTitle>Shipped</h4>
            <p scTimelineDescription>Your package is on its way.</p>
            <span scTimelineTime>Jan 16, 2024 at 2:15 PM</span>
          </div>
        </div>

        <div scTimelineItem>
          <div scTimelineConnector></div>
          <div scTimelineDot variant="warning" size="lg">
            <svg siTruckIcon class="size-4"></svg>
          </div>
          <div scTimelineContent>
            <h4 scTimelineTitle>Out for Delivery</h4>
            <p scTimelineDescription>Your package is out for delivery today.</p>
            <span scTimelineTime>Jan 18, 2024 at 8:00 AM</span>
          </div>
        </div>

        <div scTimelineItem>
          <div scTimelineDot variant="outline" size="lg">
            <svg siHouseIcon class="size-4"></svg>
          </div>
          <div scTimelineContent>
            <h4 scTimelineTitle class="text-muted-foreground">Delivered</h4>
            <p scTimelineDescription>Estimated delivery by end of day.</p>
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackingTimelineDemo {}`;
}
