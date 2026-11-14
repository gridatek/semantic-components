import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScAnimatedCounter } from '@semantic-components/ui/animated-counter';

/** Any Intl.NumberFormat options, in LOCALE_ID — provided here as German: euros, a percent, compact. */
@Component({
  selector: 'app-formats-animated-counter-demo',
  imports: [ScAnimatedCounter, ScButton],
  template: `
    <div class="grid w-full max-w-lg grid-cols-3 gap-3 text-center">
      <div class="rounded-xl border p-4">
        <span
          scAnimatedCounter
          [value]="sales()"
          [format]="{ style: 'currency', currency: 'EUR' }"
          class="text-xl font-semibold"
        ></span>
        <p class="text-muted-foreground text-xs">Umsatz</p>
      </div>
      <div class="rounded-xl border p-4">
        <span
          scAnimatedCounter
          [value]="share()"
          [format]="{ style: 'percent', maximumFractionDigits: 1 }"
          class="text-xl font-semibold"
        ></span>
        <p class="text-muted-foreground text-xs">Anteil</p>
      </div>
      <div class="rounded-xl border p-4">
        <span
          scAnimatedCounter
          [value]="views()"
          [format]="{ notation: 'compact' }"
          class="text-xl font-semibold"
        ></span>
        <p class="text-muted-foreground text-xs">Aufrufe</p>
      </div>
    </div>
    <button scButton variant="outline" (click)="next()">Next month</button>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'de-DE' }],
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class FormatsAnimatedCounterDemo {
  readonly sales = signal(18_450.5);
  readonly share = signal(0.124);
  readonly views = signal(1_200_000);

  next(): void {
    this.sales.update((v) => Math.round(v * 1.18 * 100) / 100);
    this.share.update((v) => Math.round((v + 0.031) * 1000) / 1000);
    this.views.update((v) => Math.round(v * 1.4));
  }
}
