import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlNumberTickerDemo } from './rtl-number-ticker-demo';

@Component({
  selector: 'app-rtl-number-ticker-demo-container',
  imports: [DemoContainer, RtlNumberTickerDemo],
  template: `
    <app-demo-container
      title="RTL"
      description="In a right-to-left page: Arabic digits (ar-EG), each rolling to its place."
      demoUrl="/demos/number-ticker/rtl-number-ticker-demo"
      [code]="code"
    >
      <app-rtl-number-ticker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlNumberTickerDemoContainer {
  private readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import { ScButton, ScNumberTicker } from '@semantic-components/ui';

/** In a right-to-left page: Arabic digits (ar-EG), rolling. */
@Component({
  selector: 'app-rtl-number-ticker-demo',
  imports: [Dir, ScButton, ScNumberTicker],
  template: \`
    <div dir="rtl" lang="ar" class="flex flex-col items-center gap-4">
      <span
        scNumberTicker
        effect="roll"
        class="text-5xl font-bold"
        [value]="visitors()"
      ></span>
      <button scButton (click)="visitors.set(visitors() + 1250)">زيادة</button>
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar-EG' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlNumberTickerDemo {
  protected readonly visitors = signal(4820);
}`;
}
