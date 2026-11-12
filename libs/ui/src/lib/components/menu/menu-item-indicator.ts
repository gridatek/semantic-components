import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { SC_MENU_CHECKABLE } from './menu-context';
import { injectMenuStyles } from './menu-styles';

/** The check (or dot) of a checkbox or radio item, shown when it is on. */
@Directive({
  selector: 'span[scMenuItemIndicator]',
  host: {
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScMenuItemIndicator {
  private readonly styles = injectMenuStyles();
  private readonly item = inject(SC_MENU_CHECKABLE);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      this.styles().indicator,
      !this.item.checked() && 'invisible',
      this.classInput(),
    ),
  );
}
