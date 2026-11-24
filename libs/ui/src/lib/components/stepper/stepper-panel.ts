import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScStepper } from './stepper';

/**
 * Step `[step]`'s content, a tabpanel named by its trigger: shown while that
 * step is (hidden ones keep their content). Outside the list.
 */
@Directive({
  selector: 'div[scStepperPanel]',
  host: {
    role: 'tabpanel',
    '[id]': 'stepper.panelId(step())',
    '[attr.aria-labelledby]': 'stepper.triggerId(step())',
    '[attr.tabindex]': 'shown() ? 0 : null',
    '[hidden]': '!shown()',
    '[class]': 'class()',
  },
})
export class ScStepperPanel {
  private readonly stepper = inject(ScStepper);
  private readonly styles = injectStyle().timeline;

  readonly classInput = input<string>('', { alias: 'class' });
  /** The step it belongs to, from 0. */
  readonly step = input.required<number>();

  private readonly shown = computed(
    () => this.stepper.selectedIndex() === this.step(),
  );

  private readonly class = computed(() =>
    cn('outline-none', this.styles.item, this.classInput()),
  );
}
