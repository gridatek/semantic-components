import { Dir } from '@angular/cdk/bidi';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScSlider } from '@semantic-components/ui';

/** In a right-to-left page: the value grows to the left, the arrows mirrored. */
@Component({
  selector: 'app-rtl-slider-demo',
  imports: [Dir, ScSlider],
  template: `
    <div dir="rtl" lang="ar" class="w-full max-w-xs">
      <input scSlider [(value)]="volume" aria-label="مستوى الصوت" />
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlSliderDemo {
  protected readonly volume = signal(75);
}
