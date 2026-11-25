import { Directive, computed, input, signal } from '@angular/core';
import { cn } from 'cn';

/** Options together, named by their group label. */
@Directive({
  selector: 'div[scListboxGroup]',
  host: {
    'data-slot': 'listbox-group',
    role: 'group',
    '[attr.aria-labelledby]': 'labelId()',
    '[class]': 'class()',
  },
})
export class ScListboxGroup {
  readonly classInput = input<string>('', { alias: 'class' });

  /** Its label's id (`scListboxGroupLabel`). */
  readonly labelId = signal<string | null>(null);

  private readonly class = computed(() =>
    cn('flex flex-col', this.classInput()),
  );
}
