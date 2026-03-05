import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: '[scMultiselectValue]',
  host: {
    'data-slot': 'multiselect-value',
    '[class]': 'class()',
  },
})
export class ScMultiselectValue {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none absolute start-3 flex items-center gap-2 [&_svg]:size-4',
      this.classInput(),
    ),
  );
}
