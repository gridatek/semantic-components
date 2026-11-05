import { MenuItem } from '@angular/aria/menu';
import {
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn, setInput } from '../../utils';
import { useDefaultSearchTerm } from '../menu/menu-search-term';
import { SC_MENU_NEXT_CHECKABLE } from './menu-next-context';
import { injectMenuNextHighlight } from './menu-next-highlight';

/**
 * An item that is on or off (menuitemcheckbox), `[(checked)]`. A click, Enter
 * or Space toggles it, and the menu stays open.
 */
@Directive({
  selector: '[scMenuNextCheckboxItem]',
  exportAs: 'scMenuNextCheckboxItem',
  providers: [
    { provide: SC_MENU_NEXT_CHECKABLE, useExisting: ScMenuNextCheckboxItem },
  ],
  hostDirectives: [
    {
      directive: MenuItem,
      inputs: ['id', 'value', 'disabled', 'searchTerm'],
    },
  ],
  host: {
    '[class]': 'class()',
    '[attr.aria-checked]': 'checked()',
    '[attr.data-checked]': 'checked() || null',
    '[attr.data-highlighted]': 'highlight.highlighted() || null',
    '[attr.data-inset]': 'inset() || null',
    '(click)': 'toggle($event)',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScMenuNextCheckboxItem {
  private readonly styles = injectPreset().menu;
  private readonly menuItem = inject(MenuItem);
  protected readonly highlight = injectMenuNextHighlight(
    this.menuItem as MenuItem<unknown>,
  );

  readonly classInput = input<string>('', { alias: 'class' });
  /** On or off; `[(checked)]`. */
  readonly checked = model(false);
  readonly inset = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  protected readonly class = computed(() =>
    cn('group/menu-item', this.styles.checkboxItem, this.classInput()),
  );

  constructor() {
    setInput(this.menuItem.role, 'menuitemcheckbox');
    useDefaultSearchTerm(this.menuItem as MenuItem<unknown>);
  }

  /** Toggles, without the menu's own handling (which would close it). */
  protected toggle(event: Event): void {
    event.stopPropagation();
    if (this.menuItem.disabled()) return;
    this.checked.update((checked) => !checked);
  }

  protected onKeydown(event: KeyboardEvent): void {
    this.highlight.keydown(event);
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle(event);
    }
  }
}
