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
import { ScRangeSliderEndThumb } from './range-slider-end-thumb';
import { ScRangeSliderStartThumb } from './range-slider-start-thumb';

@Directive({
  selector: 'div[scRangeSlider]',
  host: {
    '[class]': 'class()',
    '[style.--min-percent]': 'startPercentCss()',
    '[style.--max-percent]': 'endPercentCss()',
    '(pointerdown)': 'onPointerDown($event)',
  },
})
export class ScRangeSlider {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly classInput = input<string>('', { alias: 'class' });

  readonly step = input<number>(1);
  readonly disabled = input<boolean>(false);

  readonly startThumb = contentChild(forwardRef(() => ScRangeSliderStartThumb));
  readonly endThumb = contentChild(forwardRef(() => ScRangeSliderEndThumb));

  readonly min = computed(() => this.startThumb()?.resolvedMin() ?? 0);
  readonly max = computed(() => this.endThumb()?.resolvedMax() ?? 100);

  protected readonly class = computed(() =>
    cn('relative flex h-3 w-full items-center', this.classInput()),
  );

  readonly startPercent = computed(() => {
    const range = this.max() - this.min();
    const startVal = this.startThumb()?.value() ?? this.min();
    return range === 0 ? 0 : ((startVal - this.min()) / range) * 100;
  });

  readonly endPercent = computed(() => {
    const range = this.max() - this.min();
    const endVal = this.endThumb()?.value() ?? this.max();
    return range === 0 ? 0 : ((endVal - this.min()) / range) * 100;
  });

  protected readonly startPercentCss = computed(
    () => `${this.startPercent()}%`,
  );
  protected readonly endPercentCss = computed(() => `${this.endPercent()}%`);

  protected onPointerDown(event: PointerEvent) {
    if (this.disabled()) {
      return;
    }

    const rect = this.el.nativeElement.getBoundingClientRect();
    const percent = ((event.clientX - rect.left) / rect.width) * 100;
    const value = this.min() + (percent / 100) * (this.max() - this.min());
    const stepped = Math.round(value / this.step()) * this.step();

    const startThumb = this.startThumb();
    const endThumb = this.endThumb();
    const startVal = startThumb?.value() ?? this.min();
    const endVal = endThumb?.value() ?? this.max();

    const distToStart = Math.abs(stepped - startVal);
    const distToEnd = Math.abs(stepped - endVal);

    // When equidistant (e.g. both thumbs at same position), prefer the end
    // thumb so the range can expand outward. Only pick the start thumb when
    // the click is at or below the current start value (both thumbs collapsed
    // at the upper end).
    if (
      distToStart < distToEnd ||
      (distToStart === distToEnd && stepped <= startVal)
    ) {
      startThumb?.value.set(Math.min(stepped, endVal));
    } else {
      endThumb?.value.set(Math.max(stepped, startVal));
    }
  }
}
