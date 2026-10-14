import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { buttonVariants } from '../button';
import { SC_NUMBER_FIELD } from './number-field';
import { ScNumberFieldHold } from './number-field-hold';

/**
 * Steps the value down — repeatedly while held (Shift: `largeStep`, Alt:
 * `smallStep`). Not in the Tab order (the arrow keys do it from the
 * input), focus stays put; the new value is announced. At the bound it is
 * `aria-disabled` (still found by a screen reader or a voice command). Write its icon and name it (`aria-label` or
 * visually hidden text).
 */
@Directive({
  selector: 'button[scNumberFieldDecrement]',
  host: {
    'data-slot': 'number-field-decrement',
    type: 'button',
    tabindex: '-1',
    '[class]': 'class()',
    '[disabled]': 'number.disabled()',
    '[attr.aria-disabled]':
      '(!number.disabled() && !number.canDecrement()) || null',
    '[attr.aria-controls]': 'number.inputId()',
    '(pointerdown)': 'onPointerDown($event)',
    '(click)': 'onClick($event)',
  },
})
export class ScNumberFieldDecrement {
  protected readonly number = inject(SC_NUMBER_FIELD);
  private readonly hold = new ScNumberFieldHold();

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: 'outline', size: 'icon' }),
      'touch-manipulation select-none',
      this.classInput(),
    ),
  );

  constructor() {
    inject(DestroyRef).onDestroy(() => this.hold.stop());
  }

  protected onPointerDown(event: PointerEvent): void {
    this.number.flushInput();
    const amount = this.number.stepSize(event);
    this.hold.start(event, () => {
      if (!this.number.canDecrement()) return false;
      this.number.decrement(amount);
      this.number.announce();
      return true;
    });
  }

  /** A click that isn't a pointer press (a screen reader's, say). */
  protected onClick(event: MouseEvent): void {
    if (this.hold.pressed) {
      this.hold.pressed = false;
      return;
    }
    if (!this.number.canDecrement()) return;
    this.number.flushInput();
    this.number.decrement(this.number.stepSize(event));
    this.number.announce();
  }
}
