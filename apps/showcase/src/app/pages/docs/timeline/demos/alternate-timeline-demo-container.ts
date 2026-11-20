import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AlternateTimelineDemo } from './alternate-timeline-demo';

@Component({
  selector: 'app-alternate-timeline-demo-container',
  imports: [DemoContainer, AlternateTimelineDemo],
  template: `
    <app-demo-container
      title="Alternate"
      [code]="code"
      demoUrl="/demos/timeline/alternate-timeline-demo"
    >
      <app-alternate-timeline-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AlternateTimelineDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTimeline,
  ScTimelineConnector,
  ScTimelineDescription,
  ScTimelineItem,
  ScTimelineMarker,
  ScTimelineOpposite,
  ScTimelineTime,
  ScTimelineTitle,
} from '@semantic-components/ui';

/**
 * Two-sided: the line in the middle, the events on either side in turn,
 * each year across from its event (Opposite) — written from a Temporal date.
 */
@Component({
  selector: 'app-alternate-timeline-demo',
  imports: [
    ScTimeline,
    ScTimelineItem,
    ScTimelineMarker,
    ScTimelineConnector,
    ScTimelineOpposite,
    ScTimelineTitle,
    ScTimelineTime,
    ScTimelineDescription,
  ],
  template: \`
    <div
      scTimeline
      alignment="alternate"
      aria-label="Our story"
      class="w-full max-w-xl"
    >
      @for (moment of story; track moment.title) {
        <div scTimelineItem>
          <span scTimelineMarker></span>
          <span scTimelineConnector></span>
          <div scTimelineOpposite>
            <time
              scTimelineTime
              [value]="moment.date"
              [options]="{ year: 'numeric' }"
            ></time>
          </div>
          <h3 scTimelineTitle>{{ moment.title }}</h3>
          <p scTimelineDescription>{{ moment.description }}</p>
        </div>
      }
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AlternateTimelineDemo {
  private readonly story = [
    {
      date: Temporal.PlainDate.from('2019-03-01'),
      title: 'Founded',
      description: 'Two people and a spare room.',
    },
    {
      date: Temporal.PlainDate.from('2021-06-15'),
      title: 'First release',
      description: 'Version 1.0, for a hundred teams.',
    },
    {
      date: Temporal.PlainDate.from('2023-09-10'),
      title: 'A thousand customers',
      description: 'And an office with windows.',
    },
    {
      date: Temporal.PlainDate.from('2026-11-20'),
      title: 'Version 2',
      description: 'Rewritten from the ground up.',
    },
  ];
}`;
}
