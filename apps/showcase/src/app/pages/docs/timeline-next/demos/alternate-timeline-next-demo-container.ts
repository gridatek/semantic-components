import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AlternateTimelineNextDemo } from './alternate-timeline-next-demo';

@Component({
  selector: 'app-alternate-timeline-next-demo-container',
  imports: [DemoContainer, AlternateTimelineNextDemo],
  template: `
    <app-demo-container
      title="Alternate"
      [code]="code"
      demoUrl="/demos/timeline-next/alternate-timeline-next-demo"
    >
      <app-alternate-timeline-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AlternateTimelineNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScTimelineNext, ScTimelineNextItem, ScTimelineNextMarker, ScTimelineNextContent, ScTimelineNextTitle, ScTimelineNextDescription, ScTimelineNextOpposite, ScTimelineNextTime } from '@semantic-components/ui-lab';

/** A history down a centred line, the events in turn on each side, their dates facing them. */
@Component({
  selector: 'app-alternate-timeline-next-demo',
  imports: [ScTimelineNext, ScTimelineNextItem, ScTimelineNextMarker, ScTimelineNextContent, ScTimelineNextTitle, ScTimelineNextDescription, ScTimelineNextOpposite, ScTimelineNextTime],
  template: \`
    <ol scTimelineNext align="alternate" class="w-full max-w-2xl">
      @for (event of history; track event.title) {
        <li scTimelineNextItem>
          <div scTimelineNextOpposite>
            <time scTimelineNextTime [value]="event.on" [options]="{ year: 'numeric', month: 'long' }"></time>
          </div>
          <div scTimelineNextMarker></div>
          <div scTimelineNextContent>
            <p scTimelineNextTitle>{{ event.title }}</p>
            <p scTimelineNextDescription>{{ event.text }}</p>
          </div>
        </li>
      }
    </ol>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AlternateTimelineNextDemo {
  readonly history = [
    { title: 'The idea', text: 'Components as parts, written by you.', on: Temporal.PlainDate.from('2024-03-01') },
    { title: 'First release', text: 'Twenty components, all accessible.', on: Temporal.PlainDate.from('2024-11-15') },
    { title: 'Signal Forms', text: 'Every field a form field.', on: Temporal.PlainDate.from('2025-08-01') },
    { title: 'The lab', text: 'Players, pickers, and the rewrites.', on: Temporal.PlainDate.from('2026-10-01') },
  ];
}`;
}
