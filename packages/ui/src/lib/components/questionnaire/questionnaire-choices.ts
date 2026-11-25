import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** The question's choices, in a column. */
@Directive({
  selector: 'div[scQuestionnaireChoices]',
  host: {
    'data-slot': 'questionnaire-choices',
    '[class]': 'class()',
  },
})
export class ScQuestionnaireChoices {
  private readonly styles = injectStyle().questionnaire;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.choices, this.classInput()),
  );
}
