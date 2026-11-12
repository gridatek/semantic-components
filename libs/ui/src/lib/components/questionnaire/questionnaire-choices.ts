import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

/** The question's choices, in a column. */
@Directive({
  selector: 'div[scQuestionnaireChoices]',
  host: {
    'data-slot': 'questionnaire-choices',
    '[class]': 'class()',
  },
})
export class ScQuestionnaireChoices {
  private readonly styles = injectPreset().questionnaire;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.choices, this.classInput()),
  );
}
