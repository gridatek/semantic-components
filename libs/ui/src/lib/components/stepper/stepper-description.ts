import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** A line under the title, in the trigger: small and muted, as the Timeline's times. */
@Directive({
  selector: 'span[scStepperDescription]',
  host: {
    '[class]': 'class()',
  },
})
export class ScStepperDescription {
  private readonly styles = injectStyle().timeline;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn('col-start-2', this.styles.time, this.classInput()),
  );
}
