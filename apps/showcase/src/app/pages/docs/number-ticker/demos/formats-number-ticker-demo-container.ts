import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormatsNumberTickerDemo } from './formats-number-ticker-demo';

@Component({
  selector: 'app-formats-number-ticker-demo-container',
  imports: [DemoContainer, FormatsNumberTickerDemo],
  template: `
    <app-demo-container
      title="Formats"
      description="Any Intl.NumberFormat options, in LOCALE_ID — provided here as German: euros, a percent, compact."
      [code]="code"
      demoUrl="/demos/number-ticker/formats-number-ticker-demo"
    >
      <app-formats-number-ticker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormatsNumberTickerDemoContainer {
  private readonly code = `import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import { ScButton, ScFrame } from '@semantic-components/ui';
import { ScNumberTicker } from '@semantic-components/ui';

/** Any Intl.NumberFormat options, in LOCALE_ID — provided here as German: euros, a percent, compact. */
@Component({
  selector: 'app-formats-number-ticker-demo',
  imports: [ScFrame, ScNumberTicker, ScButton],
  template: \`
    <div class="grid w-full max-w-lg grid-cols-3 gap-3 text-center">
      <div scFrame class="p-4">
        <span
          scNumberTicker
          [value]="sales()"
          [format]="{ style: 'currency', currency: 'EUR' }"
          class="text-xl font-semibold"
        ></span>
        <p class="text-muted-foreground text-xs">Umsatz</p>
      </div>
      <div scFrame class="p-4">
        <span
          scNumberTicker
          [value]="share()"
          [format]="{ style: 'percent', maximumFractionDigits: 1 }"
          class="text-xl font-semibold"
        ></span>
        <p class="text-muted-foreground text-xs">Anteil</p>
      </div>
      <div scFrame class="p-4">
        <span
          scNumberTicker
          [value]="views()"
          [format]="{ notation: 'compact' }"
          class="text-xl font-semibold"
        ></span>
        <p class="text-muted-foreground text-xs">Aufrufe</p>
      </div>
    </div>
    <button scButton variant="outline" (click)="next()">Next month</button>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'de-DE' }],
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class FormatsNumberTickerDemo {
  readonly sales = signal(18_450.5);
  readonly share = signal(0.124);
  readonly views = signal(1_200_000);

  next(): void {
    this.sales.update((v) => Math.round(v * 1.18 * 100) / 100);
    this.share.update((v) => Math.round((v + 0.031) * 1000) / 1000);
    this.views.update((v) => Math.round(v * 1.4));
  }
}`;
}
