import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { buttonVariants } from '../button';
import { SC_NUMBER_FIELD } from './number-field';
import { ScNumberFieldHold } from './number-field-hold';

/**
 * Steps the value up — repeatedly while held (Shift: `largeStep`, Alt:
 * `smallStep`). Not in the Tab order (the arrow keys do it from the
 * input), focus stays put. Write its icon and name it (`aria-label` or
 * visually hidden text).
 */
@Directive({
  selector: 'button[scNumberFieldIncrement]',
  host: {
    'data-slot': 'number-field-increment',
    type: 'button',
    tabindex: '-1',
    '[class]': 'class()',
    '[disabled]': '!number.canIncrement()',
    '[attr.aria-controls]': 'number.inputId()',
    '(pointerdown)': 'onPointerDown($event)',
    '(click)': 'onClick($event)',
  },
})
export class ScNumberFieldIncrement {
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
      if (!this.number.canIncrement()) return false;
      this.number.increment(amount);
      return true;
    });
  }

  /** A click that isn't a pointer press (a screen reader's, say). */
  protected onClick(event: MouseEvent): void {
    if (this.hold.pressed) {
      this.hold.pressed = false;
      return;
    }
    this.number.flushInput();
    this.number.increment(this.number.stepSize(event));
  }
}
