import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScStepperItem } from './stepper-item';

/**
 * The line to the next step, in the item after its trigger: across, it fills
 * the room to the next; down, it runs under the indicator. The primary colour
 * once its step is complete, the Timeline's line otherwise. None after the
 * last step; hidden from screen readers.
 */
@Directive({
  selector: 'div[scStepperConnector]',
  host: {
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScStepperConnector {
  private readonly item = inject(ScStepperItem);
  private readonly styles = injectStyle().timeline;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(
      'transition-colors motion-reduce:transition-none',
      this.item.stepper.orientation() === 'vertical'
        ? // Under the indicator, centred on it.
          'ms-[calc(var(--sc-stepper-indicator)/2-0.5px)] my-1 min-h-6 w-px flex-1'
        : 'h-px min-w-4 flex-1',
      this.item.status() === 'complete' ? 'bg-primary' : this.styles.connector,
      this.item.isLast() && 'hidden',
      this.classInput(),
    ),
  );
}
