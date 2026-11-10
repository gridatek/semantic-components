import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScSliderNext } from '@semantic-components/ui';

/** In a right-to-left page: the value grows to the left, the arrows mirrored. */
@Component({
  selector: 'app-rtl-slider-next-demo',
  imports: [ScSliderNext],
  template: `
    <div dir="rtl" lang="ar" class="w-full max-w-xs">
      <input
        type="range"
        scSliderNext
        [(value)]="volume"
        aria-label="مستوى الصوت"
      />
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlSliderNextDemo {
  protected readonly volume = signal(75);
}
