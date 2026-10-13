import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { buttonVariants } from '../button';
import { SC_NUMBER } from './number';
import { ScNumberHold } from './number-hold';

/**
 * Steps the value down — repeatedly while held (Shift: `largeStep`, Alt:
 * `smallStep`). Not in the Tab order (the arrow keys do it from the
 * input), focus stays put. Write its icon and name it (`aria-label` or
 * visually hidden text).
 */
@Directive({
  selector: 'button[scNumberDecrement]',
  host: {
    'data-slot': 'number-decrement',
    type: 'button',
    tabindex: '-1',
    '[class]': 'class()',
    '[disabled]': '!number.canDecrement()',
    '[attr.aria-controls]': 'number.inputId()',
    '(pointerdown)': 'onPointerDown($event)',
    '(click)': 'onClick($event)',
  },
})
export class ScNumberDecrement {
  protected readonly number = inject(SC_NUMBER);
  private readonly hold = new ScNumberHold();

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
    this.number.decrement(this.number.stepSize(event));
  }
}
