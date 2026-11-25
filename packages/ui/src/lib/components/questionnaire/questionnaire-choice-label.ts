import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** The choice's text — its description under it. */
@Directive({
  selector: 'span[scQuestionnaireChoiceLabel]',
  host: {
    'data-slot': 'questionnaire-choice-label',
    '[class]': 'class()',
  },
})
export class ScQuestionnaireChoiceLabel {
  private readonly styles = injectStyle().questionnaire;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.choiceLabel, this.classInput()),
  );
}
