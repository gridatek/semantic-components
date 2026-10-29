import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/** More about a choice, under its text. */
@Directive({
  selector: 'span[scQuestionnaireChoiceDescription]',
  host: {
    'data-slot': 'questionnaire-choice-description',
    '[class]': 'class()',
  },
})
export class ScQuestionnaireChoiceDescription {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-muted-foreground', this.classInput()),
  );
}
