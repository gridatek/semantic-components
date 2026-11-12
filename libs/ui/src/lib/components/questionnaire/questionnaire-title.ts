import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

/** The question, as its fieldset's `legend`. */
@Directive({
  selector: 'legend[scQuestionnaireTitle]',
  host: {
    'data-slot': 'questionnaire-title',
    '[class]': 'class()',
  },
})
export class ScQuestionnaireTitle {
  private readonly styles = injectPreset().questionnaire;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.title, this.classInput()),
  );
}
