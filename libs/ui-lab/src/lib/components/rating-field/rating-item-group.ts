import {
  computed,
  Directive,
  inject,
  InjectionToken,
  signal,
} from '@angular/core';
import { SC_RATING_FIELD } from './rating-field';

// Token for rating item group context
export const SC_RATING_ITEM_GROUP = new InjectionToken<ScRatingItemGroup>(
  'SC_RATING_ITEM_GROUP',
);

@Directive({
  selector: '[sc-rating-item-group]',
  providers: [
    { provide: SC_RATING_ITEM_GROUP, useExisting: ScRatingItemGroup },
  ],
  host: {
    'data-slot': 'rating-item-group',
    role: 'radiogroup',
    '[attr.aria-valuenow]': 'field.value()',
    '[attr.aria-valuemin]': '0',
    '[attr.aria-valuemax]': 'field.max()',
    '(mouseleave)': 'onMouseLeave()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScRatingItemGroup {
  protected readonly field = inject(SC_RATING_FIELD);

  readonly hoveredValue = signal<number | null>(null);

  readonly displayValue = computed(() => {
    const hovered = this.hoveredValue();
    return hovered !== null ? hovered : this.field.value();
  });

  setHoveredValue(value: number | null): void {
    if (!this.field.readonly() && !this.field.disabled()) {
      this.hoveredValue.set(value);
    }
  }

  onMouseLeave(): void {
    this.hoveredValue.set(null);
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.field.readonly() || this.field.disabled()) return;

    const step = this.field.allowHalf() ? 0.5 : 1;
    const max = this.field.max();
    const current = this.field.value();

    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault();
      const newValue = Math.min(max, current + step);
      this.field.value.set(newValue);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault();
      const newValue = Math.max(0, current - step);
      this.field.value.set(newValue);
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.field.value.set(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      this.field.value.set(max);
    }
  }
}
