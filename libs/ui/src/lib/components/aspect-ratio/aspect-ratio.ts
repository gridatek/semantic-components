import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/**
 * Keeps its content to a ratio of width to height. The ratio goes through a
 * CSS variable (`--ratio`, read by `aspect-(--ratio)`), not an inline
 * `aspect-ratio`: a class can still change it (`max-sm:aspect-square`). Its
 * width is yours. It clips what overflows its box (a framed photo is cut to the
 * frame's corners).
 */
@Directive({
  selector: '[scAspectRatio]',
  host: {
    '[class]': 'class()',
    '[style.--ratio]': 'ratio()',
  },
})
export class ScAspectRatio {
  readonly classInput = input<string>('', { alias: 'class' });
  /** Width over height: `16 / 9`, `1`, `9 / 16`. */
  readonly ratio = input<number>(1);

  protected readonly class = computed(() =>
    cn('relative aspect-(--ratio) overflow-hidden', this.classInput()),
  );
}
