import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  ScRangeSliderNext,
  ScRangeSliderNextThumb,
} from '@semantic-components/ui';

/** In a right-to-left page: from the right, the arrows mirrored, the values in Arabic digits (LOCALE_ID). */
@Component({
  selector: 'app-rtl-range-slider-next-demo',
  imports: [Dir, ScRangeSliderNext, ScRangeSliderNextThumb],
  template: `
    <div dir="rtl" lang="ar" class="flex w-full max-w-xs flex-col gap-3">
      <div scRangeSliderNext #span="scRangeSliderNext" [(value)]="range">
        <input scRangeSliderNextThumb aria-label="الحد الأدنى" />
        <input scRangeSliderNextThumb aria-label="الحد الأقصى" />
      </div>
      <p class="text-muted-foreground text-center text-sm">
        من {{ span.formatted()[0] }} إلى {{ span.formatted()[1] }}
      </p>
    </div>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlRangeSliderNextDemo {
  private readonly range = signal<readonly [number, number]>([25, 75]);
}
