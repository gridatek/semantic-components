import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[scLabelText]',
  host: {
    'data-slot': 'label-text',
    '[class]': 'class()',
  },
})
export class ScLabelText {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-sm font-medium leading-none', this.classInput()),
  );
}
