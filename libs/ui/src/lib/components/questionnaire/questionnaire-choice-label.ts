import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
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
  private readonly styles = injectPreset().questionnaire;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.choiceLabel, this.classInput()),
  );
}
