import { computed, Directive, ElementRef, inject, input } from '@angular/core';
import { SC_RATING_FIELD } from './rating-field';
import { SC_RATING_ITEM_GROUP } from './rating-item-group';

@Directive({
  selector: '[sc-rating-item]',
  host: {
    'data-slot': 'rating-item',
    role: 'radio',
    '[attr.aria-checked]': 'isSelected()',
    '[attr.aria-label]': '"Rate " + value()',
    '[attr.data-state]': 'state()',
    '[tabindex]': 'tabIndex()',
    '(click)': 'onClick($event)',
    '(mouseenter)': 'onMouseEnter()',
    '(keydown.space)': 'onSpace($event)',
    '(keydown.enter)': 'onEnter($event)',
  },
})
export class ScRatingFieldItem {
  protected readonly field = inject(SC_RATING_FIELD);
  protected readonly group = inject(SC_RATING_ITEM_GROUP);
  private readonly elementRef = inject(ElementRef);

  readonly value = input.required<number>();

  readonly state = computed(() => {
    const displayValue = this.group.displayValue();
    const itemValue = this.value();

    if (displayValue >= itemValue) {
      return 'full';
    } else if (this.field.allowHalf() && displayValue >= itemValue - 0.5) {
      return 'half';
    }
    return 'empty';
  });

  readonly isSelected = computed(() => {
    return this.field.value() >= this.value();
  });

  readonly tabIndex = computed(() => {
    if (this.field.disabled() || this.field.readonly()) return -1;

    // If this item is selected or partially selected, it should be focusable
    if (this.isSelected()) return 0;

    // If no item is selected, the first item (value 1) should be focusable
    if (this.field.value() === 0 && this.value() === 1) return 0;

    return -1;
  });

  protected onClick(event: MouseEvent): void {
    if (this.field.readonly() || this.field.disabled()) return;

    if (this.field.allowHalf()) {
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      const x = event.clientX - rect.left;
      const isLeftHalf = x < rect.width / 2;
      this.field.setValue(isLeftHalf ? this.value() - 0.5 : this.value());
    } else {
      this.field.setValue(this.value());
    }
  }

  protected onMouseEnter(): void {
    this.group.setHoveredValue(this.value());
  }

  protected onSpace(event: Event): void {
    event.preventDefault();
    if (!this.field.readonly() && !this.field.disabled()) {
      this.field.setValue(this.value());
    }
  }

  protected onEnter(event: Event): void {
    event.preventDefault();
    if (!this.field.readonly() && !this.field.disabled()) {
      this.field.setValue(this.value());
    }
  }

  focus(): void {
    this.elementRef.nativeElement.focus();
  }
}
