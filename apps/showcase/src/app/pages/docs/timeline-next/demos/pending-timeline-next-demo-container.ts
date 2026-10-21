import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PendingTimelineNextDemo } from './pending-timeline-next-demo';

@Component({
  selector: 'app-pending-timeline-next-demo-container',
  imports: [DemoContainer, PendingTimelineNextDemo],
  template: `
    <app-demo-container
      title="Pending"
      [code]="code"
      demoUrl="/demos/timeline-next/pending-timeline-next-demo"
    >
      <app-pending-timeline-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PendingTimelineNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScTimelineNext, ScTimelineNextItem, ScTimelineNextMarker, ScTimelineNextContent, ScTimelineNextTitle, ScTimelineNextDescription } from '@semantic-components/ui-lab';
import { SiCheckIcon, SiXIcon, SiLoaderCircleIcon } from '@semantic-icons/lucide-icons';

/** The last step still under way: a spinner in its marker, and a failure in the destructive colour. */
@Component({
  selector: 'app-pending-timeline-next-demo',
  imports: [ScTimelineNext, ScTimelineNextItem, ScTimelineNextMarker, ScTimelineNextContent, ScTimelineNextTitle, ScTimelineNextDescription, SiCheckIcon, SiXIcon, SiLoaderCircleIcon],
  template: \`
    <ol scTimelineNext aria-label="Deployment" class="w-full max-w-md">
      <li scTimelineNextItem>
        <div scTimelineNextMarker><svg siCheckIcon></svg></div>
        <div scTimelineNextContent>
          <p scTimelineNextTitle>Build</p>
          <p scTimelineNextDescription>Took 2 minutes.</p>
        </div>
      </li>
      <li scTimelineNextItem>
        <div scTimelineNextMarker variant="destructive"><svg siXIcon></svg></div>
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
          <svg siLoaderCircleIcon class="animate-spin motion-reduce:animate-none"></svg>
        </div>
        <div scTimelineNextContent>
          <p scTimelineNextTitle>Deploying <span class="sr-only">— in progress</span></p>
          <p scTimelineNextDescription>To production…</p>
        </div>
      </li>
    </ol>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PendingTimelineNextDemo {
}`;
}
