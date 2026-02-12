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
  ScTimelineTime,
} from '@semantic-components/ui-lab';

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
  ],
  template: `
    <div class="rounded-lg border p-4">
      <div sc-timeline class="ml-4">
        <div sc-timeline-item>
          <div sc-timeline-connector></div>
          <div sc-timeline-dot variant="success" size="lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="size-4"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <div sc-timeline-content>
            <h4 sc-timeline-title>Order Placed</h4>
            <p sc-timeline-description>Your order has been confirmed.</p>
            <span sc-timeline-time>Jan 15, 2024 at 10:30 AM</span>
          </div>
        </div>

        <div sc-timeline-item>
          <div sc-timeline-connector></div>
          <div sc-timeline-dot variant="success" size="lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="size-4"
            >
              <path
                d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
              />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </div>
          <div sc-timeline-content>
            <h4 sc-timeline-title>Shipped</h4>
            <p sc-timeline-description>Your package is on its way.</p>
            <span sc-timeline-time>Jan 16, 2024 at 2:15 PM</span>
          </div>
        </div>

        <div sc-timeline-item>
          <div sc-timeline-connector></div>
          <div sc-timeline-dot variant="warning" size="lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="size-4"
            >
              <rect x="1" y="3" width="15" height="13" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
          </div>
          <div sc-timeline-content>
            <h4 sc-timeline-title>Out for Delivery</h4>
            <p sc-timeline-description>
              Your package is out for delivery today.
            </p>
            <span sc-timeline-time>Jan 18, 2024 at 8:00 AM</span>
          </div>
        </div>

        <div sc-timeline-item>
          <div sc-timeline-dot variant="outline" size="lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="size-4"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <div sc-timeline-content>
            <h4 sc-timeline-title class="text-muted-foreground">Delivered</h4>
            <p sc-timeline-description>Estimated delivery by end of day.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackingTimelineDemo {}
