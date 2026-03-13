import {
  Directive,
  ElementRef,
  computed,
  contentChild,
  forwardRef,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
// Imported here (below the class) to avoid circular dependency at class-definition time.
// The forwardRef(() => ...) above defers resolution until runtime.
import { ScRangeSliderMax } from './range-slider-max';
import { ScRangeSliderMin } from './range-slider-min';

@Directive({
  selector: 'div[scRangeSlider]',
  host: {
    '[class]': 'class()',
    '[style.--min-percent]': 'minPercentCss()',
    '[style.--max-percent]': 'maxPercentCss()',
    '(pointerdown)': 'onPointerDown($event)',
  },
})
export class ScRangeSlider {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly classInput = input<string>('', { alias: 'class' });

  readonly step = input<number>(1);
  readonly disabled = input<boolean>(false);

  readonly minThumb = contentChild(forwardRef(() => ScRangeSliderMin));
  readonly maxThumb = contentChild(forwardRef(() => ScRangeSliderMax));

  readonly min = computed(() => this.minThumb()?.resolvedMin() ?? 0);
  readonly max = computed(() => this.maxThumb()?.resolvedMax() ?? 100);

  protected readonly class = computed(() =>
    cn('relative flex h-3 w-full items-center', this.classInput()),
  );

  readonly minPercent = computed(() => {
    const range = this.max() - this.min();
    const minVal = this.minThumb()?.value() ?? this.min();
    return range === 0 ? 0 : ((minVal - this.min()) / range) * 100;
  });

  readonly maxPercent = computed(() => {
    const range = this.max() - this.min();
    const maxVal = this.maxThumb()?.value() ?? this.max();
    return range === 0 ? 0 : ((maxVal - this.min()) / range) * 100;
  });

  protected readonly minPercentCss = computed(() => `${this.minPercent()}%`);
  protected readonly maxPercentCss = computed(() => `${this.maxPercent()}%`);

  protected onPointerDown(event: PointerEvent) {
    if (this.disabled()) {
      return;
    }

    const rect = this.el.nativeElement.getBoundingClientRect();
    const percent = ((event.clientX - rect.left) / rect.width) * 100;
    const value = this.min() + (percent / 100) * (this.max() - this.min());
    const stepped = Math.round(value / this.step()) * this.step();

    const minThumb = this.minThumb();
    const maxThumb = this.maxThumb();
    const minVal = minThumb?.value() ?? this.min();
    const maxVal = maxThumb?.value() ?? this.max();

    const distToMin = Math.abs(stepped - minVal);
    const distToMax = Math.abs(stepped - maxVal);

    // When equidistant (e.g. both thumbs at same position), prefer the max
    // thumb so the range can expand outward. Only pick the min thumb when
    // the click is at or below the current min value (both thumbs collapsed
    // at the upper end).
    if (
      distToMin < distToMax ||
      (distToMin === distToMax && stepped <= minVal)
    ) {
      minThumb?.value.set(Math.min(stepped, maxVal));
    } else {
      maxThumb?.value.set(Math.max(stepped, minVal));
    }
  }
}
