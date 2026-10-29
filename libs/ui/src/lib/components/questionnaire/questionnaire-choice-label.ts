import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/** The choice's text — its description under it. */
@Directive({
  selector: 'span[scQuestionnaireChoiceLabel]',
  host: {
    'data-slot': 'questionnaire-choice-label',
    '[class]': 'class()',
  },
})
export class ScQuestionnaireChoiceLabel {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex min-w-0 flex-1 flex-col gap-0.5 leading-snug', this.classInput()),
  );
}
