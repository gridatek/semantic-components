import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-aspect-ratio]',
  host: {
    'data-slot': 'aspect-ratio',
    '[class]': 'class()',
    '[style.aspect-ratio]': 'ratio()',
  },
})
export class ScAspectRatio {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly ratio = input<number>(1);

  protected readonly class = computed(() =>
    cn('relative w-full', this.classInput()),
  );
}
