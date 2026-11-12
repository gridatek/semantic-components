import { Directive, computed, input, model, signal } from '@angular/core';
import { cn } from 'cn';
import { SC_MENU_GROUP } from './menu-context';

/** Radio items, one of them on: `[(value)]`, the chosen item's value. */
@Directive({
  selector: '[scMenuRadioGroup]',
  exportAs: 'scMenuRadioGroup',
  providers: [{ provide: SC_MENU_GROUP, useExisting: ScMenuRadioGroup }],
  host: {
    role: 'group',
    '[attr.aria-labelledby]': 'labelId()',
    '[class]': 'class()',
  },
})
export class ScMenuRadioGroup {
  readonly classInput = input<string>('', { alias: 'class' });
  /** The chosen item's value; `[(value)]`. */
  readonly value = model<string | null>(null);
  readonly labelId = signal<string | null>(null);

  protected readonly class = computed(() => cn(this.classInput()));
}
