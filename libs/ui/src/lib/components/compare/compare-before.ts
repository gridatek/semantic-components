import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';

/**
 * What is compared first — an `img`, a `video` or any content: it sizes the
 * compare, and shows before the divider (start, or top). An image or video
 * covers the box.
 */
@Directive({
  selector: '[scCompareBefore]',
  host: {
    'data-slot': 'compare-before',
    '[class]': 'class()',
  },
})
export class ScCompareBefore {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none block size-full',
      '[&:is(img,video)]:object-cover',
      this.classInput(),
    ),
  );
}
