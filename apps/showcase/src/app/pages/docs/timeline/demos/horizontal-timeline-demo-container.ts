import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { HorizontalTimelineDemo } from './horizontal-timeline-demo';

@Component({
  selector: 'app-horizontal-timeline-demo-container',
  imports: [DemoContainer, HorizontalTimelineDemo],
  template: `
    <app-demo-container
      title="Horizontal"
      [code]="code"
      demoUrl="/demos/timeline/horizontal-timeline-demo"
    >
      <app-horizontal-timeline-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class HorizontalTimelineDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTimeline,
  ScTimelineContent,
  ScTimelineDescription,
  ScTimelineItem,
  ScTimelineMarker,
  ScTimelineOpposite,
  ScTimelineTime,
  ScTimelineTitle,
} from '@semantic-components/ui';

/** Across, for a roadmap: the date above each marker, the content below; it scrolls sideways when narrow. */
@Component({
  selector: 'app-horizontal-timeline-demo',
  imports: [
    ScTimeline,
    ScTimelineItem,
    ScTimelineMarker,
    ScTimelineContent,
    ScTimelineTitle,
    ScTimelineDescription,
    ScTimelineOpposite,
    ScTimelineTime,
  ],
  template: \`
    <ol scTimeline orientation="horizontal" aria-label="Roadmap" class="w-full">
      @for (stage of roadmap; track stage.title) {
        <li scTimelineItem [status]="stage.status">
          <div scTimelineOpposite>
            <time
              scTimelineTime
              [value]="stage.on"
              [options]="{ year: 'numeric', month: 'short' }"
            ></time>
          </div>
          <div scTimelineMarker></div>
          <div scTimelineContent>
            <p scTimelineTitle>{{ stage.title }}</p>
            <p scTimelineDescription>{{ stage.text }}</p>
          </div>
        </li>
      }
    </ol>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class HorizontalTimelineDemo {
  readonly roadmap = [
    {
      title: 'Research',
      text: 'What the best do.',
      status: 'done',
      on: Temporal.PlainDate.from('2026-01-01'),
    },
    {
      title: 'Design',
      text: 'A note, approved.',
      status: 'done',
      on: Temporal.PlainDate.from('2026-03-01'),
    },
    {
      title: 'Build',
      text: 'Beside the old one.',
      status: 'current',
      on: Temporal.PlainDate.from('2026-06-01'),
    },
    {
      title: 'Compare',
      text: 'Side by side.',
      status: 'upcoming',
      on: Temporal.PlainDate.from('2026-09-01'),
    },
    {
      title: 'Merge',
      text: 'The old one gone.',
      status: 'upcoming',
      on: Temporal.PlainDate.from('2026-12-01'),
    },
  ] as const;
}`;
}
