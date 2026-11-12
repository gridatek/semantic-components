import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

/**
 * The icon of an item that opens a submenu (your chevron): at the item's end,
 * turned right to left. Decorative: the item says it has a submenu.
 */
@Directive({
  selector: 'svg[scMenuSubmenuIcon]',
  host: {
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScMenuSubmenuIcon {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('ms-auto rtl:rotate-180', this.classInput()),
  );
}
