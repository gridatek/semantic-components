import { MenuItem } from '@angular/aria/menu';
import {
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { setInput } from '../../utils';
import { SC_MENU_CHECKABLE } from './menu-context';
import { injectMenuHighlight } from './menu-highlight';
import { ScMenuRadioGroup } from './menu-radio-group';
import { useDefaultSearchTerm } from './menu-search-term';
import { injectMenuStyles } from './menu-styles';

/**
 * One of a radio group's items (menuitemradio): a click, Enter or Space
 * chooses it, and the menu stays open (`closeOnClick` closes it).
 */
@Directive({
  selector: '[scMenuRadioItem]',
  exportAs: 'scMenuRadioItem',
  providers: [{ provide: SC_MENU_CHECKABLE, useExisting: ScMenuRadioItem }],
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
    '(click)': 'choose($event)',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScMenuRadioItem {
  private readonly styles = injectMenuStyles();
  private readonly menuItem = inject<MenuItem<string>>(MenuItem);
  private readonly group = inject(ScMenuRadioGroup);
  protected readonly highlight = injectMenuHighlight(
    this.menuItem as MenuItem<unknown>,
  );

  readonly classInput = input<string>('', { alias: 'class' });
  readonly inset = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });
  /** Closes the menu once chosen (Base UI's `closeOnClick`; it stays open by default). */
  readonly closeOnClick = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  readonly checked = computed(
    () =>
      this.menuItem.value() !== undefined &&
      this.group.value() === this.menuItem.value(),
  );

  protected readonly class = computed(() =>
    cn('group/menu-item', this.styles().radioItem, this.classInput()),
  );

  constructor() {
    setInput(this.menuItem.role, 'menuitemradio');
    useDefaultSearchTerm(this.menuItem as MenuItem<unknown>);
  }

  /** Chooses it, without the menu's own handling (which would close it). */
  protected choose(event: Event): void {
    // Stopped, the menu's own handling doesn't close it.
    if (!this.closeOnClick()) event.stopPropagation();
    if (this.menuItem.disabled()) return;
    this.group.value.set(this.menuItem.value() ?? null);
  }

  protected onKeydown(event: KeyboardEvent): void {
    this.highlight.keydown(event);
    if (event.key === 'Enter' || event.key === ' ') {
      this.choose(event);
      // Left to the menu, the key closes it.
      if (!this.closeOnClick()) event.preventDefault();
    }
  }
}
