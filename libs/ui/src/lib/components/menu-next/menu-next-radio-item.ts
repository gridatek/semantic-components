import { MenuItem } from '@angular/aria/menu';
import {
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn, setInput } from '../../utils';
import { useDefaultSearchTerm } from '../menu/menu-search-term';
import { SC_MENU_NEXT_CHECKABLE } from './menu-next-context';
import { injectMenuNextHighlight } from './menu-next-highlight';
import { ScMenuNextRadioGroup } from './menu-next-radio-group';

/**
 * One of a radio group's items (menuitemradio): a click, Enter or Space
 * chooses it, and the menu stays open.
 */
@Directive({
  selector: '[scMenuNextRadioItem]',
  exportAs: 'scMenuNextRadioItem',
  providers: [
    { provide: SC_MENU_NEXT_CHECKABLE, useExisting: ScMenuNextRadioItem },
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
    '(click)': 'choose($event)',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScMenuNextRadioItem {
  private readonly styles = injectPreset().menu;
  private readonly menuItem = inject<MenuItem<string>>(MenuItem);
  private readonly group = inject(ScMenuNextRadioGroup);
  protected readonly highlight = injectMenuNextHighlight(
    this.menuItem as MenuItem<unknown>,
  );

  readonly classInput = input<string>('', { alias: 'class' });
  readonly inset = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  readonly checked = computed(
    () =>
      this.menuItem.value() !== undefined &&
      this.group.value() === this.menuItem.value(),
  );

  protected readonly class = computed(() =>
    cn('group/menu-item', this.styles.radioItem, this.classInput()),
  );

  constructor() {
    setInput(this.menuItem.role, 'menuitemradio');
    useDefaultSearchTerm(this.menuItem as MenuItem<unknown>);
  }

  /** Chooses it, without the menu's own handling (which would close it). */
  protected choose(event: Event): void {
    event.stopPropagation();
    if (this.menuItem.disabled()) return;
    this.group.value.set(this.menuItem.value() ?? null);
  }

  protected onKeydown(event: KeyboardEvent): void {
    this.highlight.keydown(event);
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.choose(event);
    }
  }
}
