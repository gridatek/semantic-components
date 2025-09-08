import { Highlightable } from '@angular/cdk/a11y';
import { Directive, ElementRef, inject, input } from '@angular/core';

import { ScComboboxItem } from './combobox-types';

@Directive({
  selector: '[appComboboxOption]',
  standalone: true,
  host: {
    '[class.bg-blue-50]': 'isActive',
    '[attr.aria-selected]': 'isSelected()',
    role: 'option',
  },
})
export class ScComboboxOption implements Highlightable {
  private element = inject(ElementRef);

  readonly item = input.required<string | ScComboboxItem>();
  readonly isSelected = input<boolean>(false);
  isActive: boolean = false;
  disabled?: boolean = false;

  setActiveStyles(): void {
    this.isActive = true;
    this.element.nativeElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  setInactiveStyles(): void {
    this.isActive = false;
  }

  getLabel?(): string {
    const item = this.item();
    return typeof item === 'string' ? item : item.label;
  }
}
