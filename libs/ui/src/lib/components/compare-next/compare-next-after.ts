import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScCompareNext } from './compare-next';

/**
 * What it is compared with — an `img`, a `video` or any content: laid over
 * the before, showing after the divider. An image or video covers the box,
 * so two of different sizes line up.
 */
@Directive({
  selector: '[scCompareNextAfter]',
  host: {
    'data-slot': 'compare-after',
    '[style.clip-path]': 'clip()',
    '[class]': 'class()',
  },
})
export class ScCompareNextAfter {
  private readonly compare = inject(ScCompareNext);

  readonly classInput = input<string>('', { alias: 'class' });

  /** After the divider: the end (the bottom, when vertical). */
  private readonly clip = computed(() => {
    const at = 'var(--sc-compare-position)';
    if (this.compare.orientation() === 'vertical') return `inset(${at} 0 0 0)`;
    return this.compare.rtl() ? `inset(0 ${at} 0 0)` : `inset(0 0 0 ${at})`;
  });

  private readonly class = computed(() =>
    cn(
      'pointer-events-none absolute inset-0 block size-full',
      // Moved by the keys: it glides there (not under reduced motion).
      this.compare.gliding()
        ? 'transition-[clip-path] duration-150 ease-out motion-reduce:transition-none'
        : '',
      '[&:is(img,video)]:object-cover',
      this.classInput(),
    ),
  );
}
