import { Directive, computed, input, signal } from '@angular/core';
import { cn } from '../../utils';
import { SC_MENU_NEXT_GROUP } from './menu-next-context';

/** A titled section of items (role group), named by its label. */
@Directive({
  selector: '[scMenuNextGroup]',
  providers: [{ provide: SC_MENU_NEXT_GROUP, useExisting: ScMenuNextGroup }],
  host: {
    role: 'group',
    '[attr.aria-labelledby]': 'labelId()',
    '[class]': 'class()',
  },
})
export class ScMenuNextGroup {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly labelId = signal<string | null>(null);

  protected readonly class = computed(() => cn(this.classInput()));
}
