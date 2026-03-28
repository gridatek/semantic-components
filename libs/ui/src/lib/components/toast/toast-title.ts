import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[scToastTitle]',
  host: {
    '[class]': 'class()',
  },
})
export class ScToastTitle {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-sm font-semibold', this.classInput()),
  );
}
