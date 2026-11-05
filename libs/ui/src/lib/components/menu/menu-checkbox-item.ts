import { MenuItem } from '@angular/aria/menu';
import {
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
} from '@angular/core';
import { cn, setInput } from '../../utils';
import { SC_MENU_CHECKABLE } from './menu-context';
import { injectMenuHighlight } from './menu-highlight';
import { useDefaultSearchTerm } from './menu-search-term';
import { injectMenuStyles } from './menu-styles';

/**
 * An item that is on or off (menuitemcheckbox), `[(checked)]`. A click, Enter
 * or Space toggles it, and the menu stays open.
 */
@Directive({
  selector: '[scMenuCheckboxItem]',
  exportAs: 'scMenuCheckboxItem',
  providers: [{ provide: SC_MENU_CHECKABLE, useExisting: ScMenuCheckboxItem }],
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
export class ScMenuCheckboxItem {
  private readonly styles = injectMenuStyles();
  private readonly menuItem = inject(MenuItem);
  protected readonly highlight = injectMenuHighlight(
    this.menuItem as MenuItem<unknown>,
  );

  readonly classInput = input<string>('', { alias: 'class' });
  /** On or off; `[(checked)]`. */
  readonly checked = model(false);
  readonly inset = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  protected readonly class = computed(() =>
    cn('group/menu-item', this.styles().checkboxItem, this.classInput()),
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
