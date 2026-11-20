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
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTimelineNext,
  ScTimelineNextConnector,
  ScTimelineNextDescription,
  ScTimelineNextItem,
  ScTimelineNextMarker,
  ScTimelineNextOpposite,
  ScTimelineNextTime,
  ScTimelineNextTitle,
} from '@semantic-components/ui';

/**
 * Two-sided: the line in the middle, the events on either side in turn,
 * each year across from its event (Opposite) — written from a Temporal date.
 */
@Component({
  selector: 'app-alternate-timeline-next-demo',
  imports: [
    ScTimelineNext,
    ScTimelineNextItem,
    ScTimelineNextMarker,
    ScTimelineNextConnector,
    ScTimelineNextOpposite,
    ScTimelineNextTitle,
    ScTimelineNextTime,
    ScTimelineNextDescription,
  ],
  template: \`
    <div
      scTimelineNext
      alignment="alternate"
      aria-label="Our story"
      class="w-full max-w-xl"
    >
      @for (moment of story; track moment.title) {
        <div scTimelineNextItem>
          <span scTimelineNextMarker></span>
          <span scTimelineNextConnector></span>
          <div scTimelineNextOpposite>
            <time
              scTimelineNextTime
              [value]="moment.date"
              [options]="{ year: 'numeric' }"
            ></time>
          </div>
          <h3 scTimelineNextTitle>{{ moment.title }}</h3>
          <p scTimelineNextDescription>{{ moment.description }}</p>
        </div>
      }
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AlternateTimelineNextDemo {
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
