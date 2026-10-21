import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTimeline,
  ScTimelineContent,
  ScTimelineDescription,
  ScTimelineItem,
  ScTimelineMarker,
  ScTimelineTitle,
} from '@semantic-components/ui-lab';
import {
  SiCheckIcon,
  SiLoaderCircleIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** The last step still under way: a spinner in its marker, and a failure in the destructive colour. */
@Component({
  selector: 'app-pending-timeline-demo',
  imports: [
    ScTimeline,
    ScTimelineItem,
    ScTimelineMarker,
    ScTimelineContent,
    ScTimelineTitle,
    ScTimelineDescription,
    SiCheckIcon,
    SiXIcon,
    SiLoaderCircleIcon,
  ],
  template: `
    <ol scTimeline aria-label="Deployment" class="w-full max-w-md">
      <li scTimelineItem>
        <div scTimelineMarker><svg siCheckIcon></svg></div>
        <div scTimelineContent>
          <p scTimelineTitle>Build</p>
          <p scTimelineDescription>Took 2 minutes.</p>
        </div>
      </li>
      <li scTimelineItem>
        <div scTimelineMarker variant="destructive">
          <svg siXIcon></svg>
        </div>
        <div scTimelineContent>
          <p scTimelineTitle>Tests <span class="sr-only">— failed</span></p>
          <p scTimelineDescription>One failed; retried.</p>
        </div>
      </li>
      <li scTimelineItem>
        <div scTimelineMarker><svg siCheckIcon></svg></div>
        <div scTimelineContent>
          <p scTimelineTitle>Tests, again</p>
          <p scTimelineDescription>All passed.</p>
        </div>
      </li>
      <li scTimelineItem status="current">
        <div scTimelineMarker>
          <svg
            siLoaderCircleIcon
            class="animate-spin motion-reduce:animate-none"
          ></svg>
        </div>
        <div scTimelineContent>
          <p scTimelineTitle>
            Deploying <span class="sr-only">— in progress</span>
          </p>
          <p scTimelineDescription>To production…</p>
        </div>
      </li>
    </ol>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PendingTimelineDemo {}
