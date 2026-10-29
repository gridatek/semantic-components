import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/** The question, as its fieldset's `legend`. */
@Directive({
  selector: 'legend[scQuestionnaireTitle]',
  host: {
    'data-slot': 'questionnaire-title',
    '[class]': 'class()',
  },
})
export class ScQuestionnaireTitle {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'font-heading text-base leading-snug font-medium text-pretty [&:not(:has(~[data-slot=questionnaire-description]))]:mb-4',
      this.classInput(),
    ),
  );
}
