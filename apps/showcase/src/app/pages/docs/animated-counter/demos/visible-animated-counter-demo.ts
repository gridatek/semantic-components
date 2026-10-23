import { Component, ViewEncapsulation } from '@angular/core';
import { ScAnimatedCounter } from '@semantic-components/ui/animated-counter';

/** start="visible": landing-page figures that count up from zero when they are first scrolled into view. */
@Component({
  selector: 'app-visible-animated-counter-demo',
  imports: [ScAnimatedCounter],
  template: `
    <div
      class="h-64 w-full max-w-lg overflow-y-auto rounded-xl border"
      tabindex="0"
      role="region"
      aria-label="About us"
    >
      <p
        class="text-muted-foreground grid h-64 place-items-center p-6 text-center text-sm"
      >
        Scroll down: the figures count up when they come into view.
      </p>
      <dl class="grid grid-cols-3 gap-3 p-6 text-center">
        <div>
          <dt class="text-muted-foreground text-xs">Customers</dt>
          <dd>
            <span
              scAnimatedCounter
              start="visible"
              [value]="12500"
              [duration]="1500"
              class="text-2xl font-bold"
            ></span>
          </dd>
        </div>
        <div>
          <dt class="text-muted-foreground text-xs">Countries</dt>
          <dd>
            <span
              scAnimatedCounter
              start="visible"
              [value]="48"
              [duration]="1500"
              class="text-2xl font-bold"
            ></span>
          </dd>
        </div>
        <div>
          <dt class="text-muted-foreground text-xs">Uptime</dt>
          <dd>
            <span
              scAnimatedCounter
              start="visible"
              [value]="0.9995"
              [format]="{ style: 'percent', minimumFractionDigits: 2 }"
              [duration]="1500"
              class="text-2xl font-bold"
            ></span>
          </dd>
        </div>
      </dl>
    </div>
  `,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class VisibleAnimatedCounterDemo {}
