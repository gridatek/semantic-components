import { Directive, computed, input, model, signal } from '@angular/core';
import { cn } from '../../utils';
import { SC_MENU_NEXT_GROUP } from './menu-next-context';

/** Radio items, one of them on: `[(value)]`, the chosen item's value. */
@Directive({
  selector: '[scMenuNextRadioGroup]',
  exportAs: 'scMenuNextRadioGroup',
  providers: [
    { provide: SC_MENU_NEXT_GROUP, useExisting: ScMenuNextRadioGroup },
  ],
  host: {
    role: 'group',
    '[attr.aria-labelledby]': 'labelId()',
    '[class]': 'class()',
  },
})
export class ScMenuNextRadioGroup {
  readonly classInput = input<string>('', { alias: 'class' });
  /** The chosen item's value; `[(value)]`. */
  readonly value = model<string | null>(null);
  readonly labelId = signal<string | null>(null);

  protected readonly class = computed(() => cn(this.classInput()));
}
