import { Highlightable } from '@angular/cdk/a11y';
import { Directive, ElementRef, inject, input } from '@angular/core';

import { SearchableItem } from './search-behavior';

/**
 * Common directive for selector option items
 * Provides consistent styling and behavior for options in dropdowns, comboboxes, autocompletes, etc.
 */
@Directive({
  selector: '[scSelectorOption]',
  standalone: true,
  host: {
    '[class.bg-accent]': 'isActive',
    '[class.text-accent-foreground]': 'isActive',
    '[class.hover:bg-accent]': 'true',
    '[class.hover:text-accent-foreground]': 'true',
    '[class.cursor-pointer]': '!disabled',
    '[class.cursor-not-allowed]': 'disabled',
    '[class.opacity-50]': 'disabled',
    '[attr.aria-selected]': 'isSelected()',
    '[attr.aria-disabled]': 'disabled',
    role: 'option',
    class:
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-2 text-sm outline-none transition-colors',
  },
})
export class ScSelectorOption implements Highlightable {
  private element = inject(ElementRef);

  readonly item = input.required<string | SearchableItem>();
  readonly isSelected = input<boolean>(false);
  readonly disabledInput = input<boolean>(false, { alias: 'disabled' });

  isActive = false;

  // Implementing Highlightable interface
  get disabled(): boolean {
    return this.disabledInput();
  }

  setActiveStyles(): void {
    this.isActive = true;
    this.element.nativeElement.scrollIntoView({
      block: 'nearest',
      behavior: 'smooth',
      inline: 'nearest',
    });
  }

  setInactiveStyles(): void {
    this.isActive = false;
  }

  getLabel(): string {
    const item = this.item();
    return typeof item === 'string' ? item : item.label;
  }

  getValue(): string {
    const item = this.item();
    return typeof item === 'string' ? item : item.id;
  }

  getSubtitle(): string | undefined {
    const item = this.item();
    return typeof item === 'string' ? undefined : item.subtitle;
  }

  getGroup(): string | undefined {
    const item = this.item();
    return typeof item === 'string' ? undefined : item.group;
  }

  getData(): any {
    const item = this.item();
    return typeof item === 'string' ? undefined : item['data'];
  }

  get elementRef(): ElementRef {
    return this.element;
  }
}
