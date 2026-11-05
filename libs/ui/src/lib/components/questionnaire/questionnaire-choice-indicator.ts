import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScQuestionnaireChoice } from './questionnaire-choice';

/**
 * The choice's box: a dot when a radio is chosen; your check icon inside,
 * shown when a checkbox is ticked.
 */
@Component({
  selector: 'span[scQuestionnaireChoiceIndicator]',
  template: `
    @if (choice.type() === 'radio') {
      <span
        data-slot="questionnaire-choice-indicator-dot"
        [class]="styles.indicatorDot"
      ></span>
    } @else {
      <ng-content />
    }
  `,
  host: {
    'data-slot': 'questionnaire-choice-indicator',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScQuestionnaireChoiceIndicator {
  protected readonly styles = injectPreset().questionnaire;
  protected readonly choice = inject(ScQuestionnaireChoice);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.indicator, this.classInput()),
  );
}
