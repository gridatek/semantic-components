import { Directive, computed, input, signal } from '@angular/core';
import { cn } from 'cn';
import { SC_MENU_GROUP } from './menu-context';

/** A titled section of items (role group), named by its label. */
@Directive({
  selector: '[scMenuGroup]',
  providers: [{ provide: SC_MENU_GROUP, useExisting: ScMenuGroup }],
  host: {
    role: 'group',
    '[attr.aria-labelledby]': 'labelId()',
    '[class]': 'class()',
  },
})
export class ScMenuGroup {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly labelId = signal<string | null>(null);

  protected readonly class = computed(() => cn(this.classInput()));
}
