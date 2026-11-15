import { Component, ViewEncapsulation } from '@angular/core';
import { ScNumberTicker } from '@semantic-components/ui';

/** On an SVG `<text>`: a total in a ring's center, counting up with the ring (after 400ms, for 1500ms, ease). */
@Component({
  selector: 'app-chart-number-ticker-demo',
  imports: [ScNumberTicker],
  template: `
    <svg viewBox="-60 -60 120 120" class="size-48" aria-label="Visitors">
      <circle r="48" fill="none" class="stroke-muted" stroke-width="12" />
      <text
        scNumberTicker
        text-anchor="middle"
        dominant-baseline="middle"
        class="fill-foreground text-xl font-bold"
        [value]="925"
        start="visible"
        easing="ease"
        [delay]="400"
        [duration]="1500"
      ></text>
    </svg>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ChartNumberTickerDemo {}
