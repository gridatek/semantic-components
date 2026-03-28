import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[scMultiselectItemLabel]',
  host: {
    '[class]': 'class()',
  },
})
export class ScMultiselectItemLabel {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('flex-1', this.classInput()));
}
