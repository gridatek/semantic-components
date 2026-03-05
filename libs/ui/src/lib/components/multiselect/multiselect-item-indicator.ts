import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'svg[scMultiselectItemIndicator]',
  host: {
    'data-slot': 'multiselect-item-indicator',
    '[class]': 'class()',
  },
})
export class ScMultiselectItemIndicator {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('hidden [[aria-selected=true]>&]:block', this.classInput()),
  );
}
