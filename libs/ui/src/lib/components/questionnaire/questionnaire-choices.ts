import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/** The question's choices, in a column. */
@Directive({
  selector: 'div[scQuestionnaireChoices]',
  host: {
    'data-slot': 'questionnaire-choices',
    '[class]': 'class()',
  },
})
export class ScQuestionnaireChoices {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('group/questionnaire-choices grid min-w-0 gap-2', this.classInput()),
  );
}
