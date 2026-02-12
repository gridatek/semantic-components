import { _IdGenerator } from '@angular/cdk/a11y';
import {
  computed,
  contentChildren,
  Directive,
  ElementRef,
  inject,
  InjectionToken,
  input,
  model,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_FIELD } from '../field';
import { ScRatingFieldItem } from './rating-item';

// Token for rating field context
export const SC_RATING_FIELD = new InjectionToken<ScRatingField>(
  'SC_RATING_FIELD',
);

@Directive({
  selector: 'div[sc-rating-field], label[sc-rating-field]',
  providers: [
    { provide: SC_RATING_FIELD, useExisting: ScRatingField },
    { provide: SC_FIELD, useExisting: ScRatingField },
  ],
  host: {
    '[attr.role]': 'role()',
    'data-slot': 'rating-field',
    '[class]': 'class()',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-labelledby]': 'ariaLabelledby() || null',
    '[attr.data-disabled]': 'disabled() || null',
    '[attr.data-readonly]': 'readonly() || null',
  },
})
export class ScRatingField {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly id = input(inject(_IdGenerator).getId('sc-rating-field-'));

  protected readonly role = computed(() => {
    const tagName = this.elementRef.nativeElement.tagName;
    return tagName === 'LABEL' ? null : 'group';
  });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly value = model<number>(0);
  readonly readonly = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly allowHalf = input<boolean>(false);
  readonly allowClear = input<boolean>(true);
  readonly ariaLabel = input<string>('', { alias: 'aria-label' });
  readonly ariaLabelledby = input<string>('', { alias: 'aria-labelledby' });

  private readonly items = contentChildren(ScRatingFieldItem, {
    descendants: true,
  });

  readonly max = computed(() => {
    const allItems = this.items();
    if (allItems.length === 0) {
      throw new Error(
        'ScRatingField: No rating items found. Add at least one [sc-rating-item] element.',
      );
    }
    return Math.max(...allItems.map((item) => item.value()));
  });

  protected readonly class = computed(() =>
    cn('inline-flex items-center', this.classInput()),
  );

  setValue(value: number): void {
    if (this.readonly() || this.disabled()) return;

    // Validate value is within range
    const maxValue = this.max();
    const clampedValue = Math.max(0, Math.min(maxValue, value));

    // Allow clearing by clicking the same value
    if (this.allowClear() && clampedValue === this.value()) {
      this.value.set(0);
    } else {
      this.value.set(clampedValue);
    }
  }
}
