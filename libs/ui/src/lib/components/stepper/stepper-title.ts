import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** The step's name, in its trigger (it names the tab): as the Timeline's titles. */
@Directive({
  selector: 'span[scStepperTitle]',
  host: {
    '[class]': 'class()',
  },
})
export class ScStepperTitle {
  private readonly styles = injectStyle().timeline;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn('col-start-2', this.styles.title, this.classInput()),
  );
}
