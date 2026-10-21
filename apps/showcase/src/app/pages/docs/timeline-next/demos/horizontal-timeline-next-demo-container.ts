import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { HorizontalTimelineNextDemo } from './horizontal-timeline-next-demo';

@Component({
  selector: 'app-horizontal-timeline-next-demo-container',
  imports: [DemoContainer, HorizontalTimelineNextDemo],
  template: `
    <app-demo-container
      title="Horizontal"
      [code]="code"
      demoUrl="/demos/timeline-next/horizontal-timeline-next-demo"
    >
      <app-horizontal-timeline-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class HorizontalTimelineNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScTimelineNext, ScTimelineNextItem, ScTimelineNextMarker, ScTimelineNextContent, ScTimelineNextTitle, ScTimelineNextDescription, ScTimelineNextOpposite, ScTimelineNextTime } from '@semantic-components/ui-lab';

/** Across, for a roadmap: the date above each marker, the content below; it scrolls sideways when narrow. */
@Component({
  selector: 'app-horizontal-timeline-next-demo',
  imports: [ScTimelineNext, ScTimelineNextItem, ScTimelineNextMarker, ScTimelineNextContent, ScTimelineNextTitle, ScTimelineNextDescription, ScTimelineNextOpposite, ScTimelineNextTime],
  template: \`
    <ol scTimelineNext orientation="horizontal" aria-label="Roadmap" class="w-full">
      @for (stage of roadmap; track stage.title) {
        <li scTimelineNextItem [status]="stage.status">
          <div scTimelineNextOpposite>
            <time scTimelineNextTime [value]="stage.on" [options]="{ year: 'numeric', month: 'short' }"></time>
          </div>
          <div scTimelineNextMarker></div>
          <div scTimelineNextContent>
            <p scTimelineNextTitle>{{ stage.title }}</p>
            <p scTimelineNextDescription>{{ stage.text }}</p>
          </div>
        </li>
      }
    </ol>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class HorizontalTimelineNextDemo {
  readonly roadmap = [
    { title: 'Research', text: 'What the best do.', status: 'done', on: Temporal.PlainDate.from('2026-01-01') },
    { title: 'Design', text: 'A note, approved.', status: 'done', on: Temporal.PlainDate.from('2026-03-01') },
    { title: 'Build', text: 'Beside the old one.', status: 'current', on: Temporal.PlainDate.from('2026-06-01') },
    { title: 'Compare', text: 'Side by side.', status: 'upcoming', on: Temporal.PlainDate.from('2026-09-01') },
    { title: 'Merge', text: 'The old one gone.', status: 'upcoming', on: Temporal.PlainDate.from('2026-12-01') },
  ] as const;
}`;
}
