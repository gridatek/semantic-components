import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-radio-group]',
  host: {
    'data-slot': 'radio-group',
    role: 'radiogroup',
    '[class]': 'class()',
  },
})
export class ScRadioGroup {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('grid gap-2', this.classInput()),
  );
}
