import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlRangeSliderDemo } from './rtl-range-slider-demo';

@Component({
  selector: 'app-rtl-range-slider-demo-container',
  imports: [DemoContainer, RtlRangeSliderDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/range-slider/rtl-range-slider-demo"
      [code]="code"
    >
      <app-rtl-range-slider-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlRangeSliderDemoContainer {
  private readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import { ScRangeSlider, ScRangeSliderThumb } from '@semantic-components/ui';

/** In a right-to-left page: from the right, the arrows mirrored, the values in Arabic digits (LOCALE_ID). */
@Component({
  selector: 'app-rtl-range-slider-demo',
  imports: [Dir, ScRangeSlider, ScRangeSliderThumb],
  template: \`
    <div dir="rtl" lang="ar" class="flex w-full max-w-xs flex-col gap-3">
      <div scRangeSlider #span="scRangeSlider" [(value)]="range">
        <input scRangeSliderThumb aria-label="الحد الأدنى" />
        <input scRangeSliderThumb aria-label="الحد الأقصى" />
      </div>
      <p class="text-muted-foreground text-center text-sm">
        من {{ span.formatted()[0] }} إلى {{ span.formatted()[1] }}
      </p>
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlRangeSliderDemo {
  private readonly range = signal<readonly [number, number]>([25, 75]);
}`;
}
