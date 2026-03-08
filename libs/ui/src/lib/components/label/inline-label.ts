import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[scInlineLabel]',
  host: {
    'data-slot': 'inline-label',
    '[class]': 'class()',
  },
})
export class ScInlineLabel {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-sm font-medium leading-none', this.classInput()),
  );
}
