import {
  Directive,
  ElementRef,
  computed,
  contentChildren,
  effect,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_RATING_FIELD } from './rating-field';
import { ScRatingIcon } from './rating-icon';
import { SC_RATING_ITEM_GROUP } from './rating-item-group';

@Directive({
  selector: '[scRatingItem]',
  exportAs: 'scRatingItem',
  host: {
    'data-slot': 'rating-item',
    role: 'radio',
    '[class]': 'class()',
    '[attr.aria-checked]': 'isSelected()',
    '[attr.aria-label]': '"Rate " + value()',
    '[attr.data-state]': 'state()',
    '[tabindex]': 'tabIndex()',
    '(click)': 'onClick($event)',
    '(mouseenter)': 'onMouseEnter()',
    '(mousemove)': 'onMouseMove($event)',
    '(keydown.space)': 'onSpace($event)',
    '(keydown.enter)': 'onEnter($event)',
  },
})
export class ScRatingFieldItem {
  protected readonly field = inject(SC_RATING_FIELD);
  protected readonly group = inject(SC_RATING_ITEM_GROUP);
  private readonly elementRef = inject(ElementRef);

  readonly value = input.required<number>();
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly icons = contentChildren(ScRatingIcon);

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
    const value = this.field.value();
    const itemValue = this.value();

    if (value >= itemValue) return true;
    if (this.field.allowHalf() && value >= itemValue - 0.5) return true;

    return false;
  });

  readonly tabIndex = computed(() => {
    if (this.field.disabled() || this.field.readonly()) return -1;

    // If this item is selected or partially selected, it should be focusable
    if (this.isSelected()) return 0;

    // If no item is selected, the first item (value 1) should be focusable
    if (this.field.value() === 0 && this.value() === 1) return 0;

    return -1;
  });

  protected readonly class = computed(() => {
    const base = this.classInput();
    const disabled = this.field.disabled();
    const readonly = this.field.readonly();
    const hasMultipleIcons = this.icons().length >= 2;

    const classes: string[] = [];

    if (disabled) {
      classes.push('opacity-50 cursor-not-allowed');
    } else if (!readonly) {
      classes.push('cursor-pointer transition-transform hover:scale-110');
    }

    if (hasMultipleIcons) {
      classes.push('relative');
    }

    return cn(classes.join(' '), base);
  });

  constructor() {
    // Resolve icon roles and propagate state
    effect(() => {
      const allIcons = this.icons();
      const state = this.state();

      if (allIcons.length === 1) {
        allIcons[0].role.set('single');
        allIcons[0].state.set(state);
      } else if (allIcons.length >= 2) {
        allIcons[0].role.set('background');
        allIcons[0].state.set(state);
        allIcons[1].role.set('foreground');
        allIcons[1].state.set(state);
      }
    });
  }

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

  protected onMouseMove(event: MouseEvent): void {
    if (!this.field.allowHalf()) return;

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const isLeftHalf = x < rect.width / 2;
    this.group.setHoveredValue(isLeftHalf ? this.value() - 0.5 : this.value());
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
