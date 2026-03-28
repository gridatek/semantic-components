import {
  Directive,
  ElementRef,
  InjectionToken,
  computed,
  contentChildren,
  inject,
  input,
  model,
} from '@angular/core';
import { cn } from '../../utils';
import { ScRatingItem } from './rating-item';

// Token for rating context
export const SC_RATING = new InjectionToken<ScRating>('SC_RATING');

@Directive({
  selector: 'div[scRating], label[scRating]',
  providers: [{ provide: SC_RATING, useExisting: ScRating }],
  host: {
    '[attr.role]': 'role()',
    '[class]': 'class()',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-labelledby]': 'ariaLabelledby() || null',
    '[attr.data-disabled]': 'disabled() || null',
    '[attr.data-readonly]': 'readonly() || null',
    style:
      '--sc-rating-active-color: var(--color-yellow-400); --sc-rating-inactive-color: var(--color-gray-300)',
  },
})
export class ScRating {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

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

  private readonly items = contentChildren(ScRatingItem, {
    descendants: true,
  });

  readonly max = computed(() => {
    const allItems = this.items();
    if (allItems.length === 0) {
      throw new Error(
        'ScRating: No rating items found. Add at least one [scRatingItem] element.',
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
