import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormatsAnimatedCounterNextDemo } from './formats-animated-counter-next-demo';

@Component({
  selector: 'app-formats-animated-counter-next-demo-container',
  imports: [DemoContainer, FormatsAnimatedCounterNextDemo],
  template: `
    <app-demo-container
      title="Formats"
      [code]="code"
      demoUrl="/demos/animated-counter-next/formats-animated-counter-next-demo"
    >
      <app-formats-animated-counter-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormatsAnimatedCounterNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScAnimatedCounter } from '@semantic-components/ui-lab/animated-counter';

/** Any Intl.NumberFormat options, in the counter’s locale — here, German: euros, a percent, compact. */
@Component({
  selector: 'app-formats-animated-counter-next-demo',
  imports: [ScAnimatedCounter, ScButton],
  template: \`
    <div class="grid w-full max-w-lg grid-cols-3 gap-3 text-center">
      <div class="rounded-xl border p-4">
        <span scAnimatedCounter locale="de-DE" [value]="sales()" [format]="{ style: 'currency', currency: 'EUR' }" class="text-xl font-semibold"></span>
        <p class="text-muted-foreground text-xs">Umsatz</p>
      </div>
      <div class="rounded-xl border p-4">
        <span scAnimatedCounter locale="de-DE" [value]="share()" [format]="{ style: 'percent', maximumFractionDigits: 1 }" class="text-xl font-semibold"></span>
        <p class="text-muted-foreground text-xs">Anteil</p>
      </div>
      <div class="rounded-xl border p-4">
        <span scAnimatedCounter locale="de-DE" [value]="views()" [format]="{ notation: 'compact' }" class="text-xl font-semibold"></span>
        <p class="text-muted-foreground text-xs">Aufrufe</p>
      </div>
    </div>
    <button scButton variant="outline" (click)="next()">Next month</button>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class FormatsAnimatedCounterNextDemo {
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
