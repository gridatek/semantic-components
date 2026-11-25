import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScStepperItem } from './stepper-item';

/**
 * The step's name, in its trigger (it names the tab): as the Timeline's
 * titles. Across, in a list narrower than 28rem (a phone), only the current
 * step's title is in sight; the others are read by screen readers only, still
 * naming their tabs — as Kong's and Wix's steppers.
 */
@Directive({
  selector: 'span[scStepperTitle]',
  host: {
    '[class]': 'class()',
  },
})
export class ScStepperTitle {
  private readonly styles = injectStyle().timeline;
  private readonly item = inject(ScStepperItem);
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(
      'col-start-2',
      this.styles.title,
      this.item.stepper.orientation() === 'horizontal' &&
        this.item.status() !== 'current' &&
        '@max-md/stepper-list:sr-only',
      this.classInput(),
    ),
  );
}
