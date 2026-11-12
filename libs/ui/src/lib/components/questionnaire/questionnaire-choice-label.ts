import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

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
