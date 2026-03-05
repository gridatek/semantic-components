import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

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
    cn('[[ngOption]:not([aria-selected=true])_&]:hidden', this.classInput()),
  );
}
