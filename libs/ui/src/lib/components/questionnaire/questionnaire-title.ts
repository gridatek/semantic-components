import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** The question, as its fieldset's `legend`. */
@Directive({
  selector: 'legend[scQuestionnaireTitle]',
  host: {
    'data-slot': 'questionnaire-title',
    '[class]': 'class()',
  },
})
export class ScQuestionnaireTitle {
  private readonly styles = injectStyle().questionnaire;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.title, this.classInput()),
  );
}
