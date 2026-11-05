import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { SC_MENU_CHECKABLE } from './menu-context';

/** The check (or dot) of a checkbox or radio item, shown when it is on. */
@Directive({
  selector: 'span[scMenuItemIndicator]',
  host: {
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScMenuItemIndicator {
  private readonly styles = injectPreset().menu;
  private readonly item = inject(SC_MENU_CHECKABLE);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      this.styles.indicator,
      !this.item.checked() && 'invisible',
      this.classInput(),
    ),
  );
}
