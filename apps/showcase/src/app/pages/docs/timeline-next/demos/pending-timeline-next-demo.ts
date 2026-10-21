import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTimelineNext,
  ScTimelineNextContent,
  ScTimelineNextDescription,
  ScTimelineNextItem,
  ScTimelineNextMarker,
  ScTimelineNextTitle,
} from '@semantic-components/ui-lab';
import {
  SiCheckIcon,
  SiLoaderCircleIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** The last step still under way: a spinner in its marker, and a failure in the destructive colour. */
@Component({
  selector: 'app-pending-timeline-next-demo',
  imports: [
    ScTimelineNext,
    ScTimelineNextItem,
    ScTimelineNextMarker,
    ScTimelineNextContent,
    ScTimelineNextTitle,
    ScTimelineNextDescription,
    SiCheckIcon,
    SiXIcon,
    SiLoaderCircleIcon,
  ],
  template: `
    <ol scTimelineNext aria-label="Deployment" class="w-full max-w-md">
      <li scTimelineNextItem>
        <div scTimelineNextMarker><svg siCheckIcon></svg></div>
        <div scTimelineNextContent>
          <p scTimelineNextTitle>Build</p>
          <p scTimelineNextDescription>Took 2 minutes.</p>
        </div>
      </li>
      <li scTimelineNextItem>
        <div scTimelineNextMarker variant="destructive">
          <svg siXIcon></svg>
        </div>
        <div scTimelineNextContent>
          <p scTimelineNextTitle>Tests <span class="sr-only">— failed</span></p>
          <p scTimelineNextDescription>One failed; retried.</p>
        </div>
      </li>
      <li scTimelineNextItem>
        <div scTimelineNextMarker><svg siCheckIcon></svg></div>
        <div scTimelineNextContent>
          <p scTimelineNextTitle>Tests, again</p>
          <p scTimelineNextDescription>All passed.</p>
        </div>
      </li>
      <li scTimelineNextItem status="current">
        <div scTimelineNextMarker>
          <svg
            siLoaderCircleIcon
            class="animate-spin motion-reduce:animate-none"
          ></svg>
        </div>
        <div scTimelineNextContent>
          <p scTimelineNextTitle>
            Deploying <span class="sr-only">— in progress</span>
          </p>
          <p scTimelineNextDescription>To production…</p>
        </div>
      </li>
    </ol>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PendingTimelineNextDemo {}
