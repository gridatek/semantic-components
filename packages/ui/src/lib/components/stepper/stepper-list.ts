import { Directionality } from '@angular/cdk/bidi';
import {
  Directive,
  computed,
  contentChildren,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { ScStepper } from './stepper';
import { ScStepperTrigger } from './stepper-trigger';

/**
 * The steps, a tablist: one Tab stop; ← → (mirrored right to left), ↑ ↓ when
 * vertical, Home and End move between them, and the step shown follows when
 * it can be reached.
 */
@Directive({
  selector: 'div[scStepperList]',
  host: {
    role: 'tablist',
    '[attr.aria-orientation]': 'stepper.orientation()',
    '[class]': 'class()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScStepperList {
  private readonly stepper = inject(ScStepper);
  private readonly direction = inject(Directionality).valueSignal;
  private readonly triggers = contentChildren(ScStepperTrigger, {
    descendants: true,
  });

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(
      this.stepper.orientation() === 'vertical'
        ? 'flex flex-col'
        : // Across, a container: its titles go by its width (ScStepperTitle).
          '@container/stepper-list flex items-center gap-3',
      this.classInput(),
    ),
  );

  private onKeydown(event: KeyboardEvent): void {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const count = this.stepper.stepCount();
    if (!count) return;
    const at = this.stepper.focusIndex();
    const vertical = this.stepper.orientation() === 'vertical';
    const rtl = this.direction() === 'rtl';
    let to: number;
    switch (event.key) {
      case vertical ? 'ArrowDown' : rtl ? 'ArrowLeft' : 'ArrowRight':
        to = Math.min(at + 1, count - 1);
        break;
      case vertical ? 'ArrowUp' : rtl ? 'ArrowRight' : 'ArrowLeft':
        to = Math.max(at - 1, 0);
        break;
      case 'Home':
        to = 0;
        break;
      case 'End':
        to = count - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    this.stepper.focusIndex.set(to);
    this.triggers()
      .find((trigger) => trigger.index() === to)
      ?.focus();
    // The step shown follows, when it can be reached.
    this.stepper.goToStep(to);
  }
}
