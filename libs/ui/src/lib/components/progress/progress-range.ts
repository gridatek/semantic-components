import {
  Directive,
  ElementRef,
  afterRenderEffect,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScProgress } from './progress';

/** The time one slide across an indeterminate bar takes (ms). */
const SLIDE_TIME = 1500;

/**
 * The bar's filled part: from the start of the line (the right in
 * right-to-left) to the value. Indeterminate, a segment slides across — still,
 * in the middle, when motion is reduced.
 */
@Directive({
  selector: 'div[scProgressRange]',
  host: {
    'data-slot': 'progress-indicator',
    '[style.width.%]':
      'progress.indeterminate() ? null : progress.fraction() * 100',
    '[class]': 'class()',
  },
})
export class ScProgressRange {
  protected readonly progress = inject(ScProgress);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'bg-primary h-full transition-[width]',
      this.progress.indeterminate() &&
        'absolute inset-y-0 start-0 w-1/3 transition-none motion-reduce:start-1/3',
      this.classInput(),
    ),
  );

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    afterRenderEffect({
      write: (onCleanup) => {
        if (!this.progress.indeterminate()) return;
        if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        // Across the line, the way it reads.
        const rtl = getComputedStyle(element).direction === 'rtl';
        const [from, to] = rtl ? ['100%', '-300%'] : ['-100%', '300%'];
        const slide = element.animate(
          [
            { transform: `translateX(${from})` },
            { transform: `translateX(${to})` },
          ],
          { duration: SLIDE_TIME, iterations: Infinity, easing: 'ease-in-out' },
        );
        onCleanup(() => slide.cancel());
      },
    });
  }
}
