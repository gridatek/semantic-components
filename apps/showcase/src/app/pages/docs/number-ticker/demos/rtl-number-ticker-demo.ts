import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import { ScButton, ScNumberTicker } from '@semantic-components/ui';

/** In a right-to-left page: Arabic digits (ar-EG), rolling. */
@Component({
  selector: 'app-rtl-number-ticker-demo',
  imports: [Dir, ScButton, ScNumberTicker],
  template: `
    <div dir="rtl" lang="ar" class="flex flex-col items-center gap-4">
      <span
        scNumberTicker
        effect="roll"
        class="text-5xl font-bold"
        [value]="visitors()"
      ></span>
      <button scButton (click)="visitors.set(visitors() + 1250)">زيادة</button>
    </div>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar-EG' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlNumberTickerDemo {
  private readonly visitors = signal(4820);
}
