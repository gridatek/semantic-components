import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/** The buttons' row: Previous at the start, Skip and Next (or Submit) at the end. */
@Directive({
  selector: 'div[scQuestionnaireActions]',
  host: {
    'data-slot': 'questionnaire-actions',
    '[class]': 'class()',
  },
})
export class ScQuestionnaireActions {
  private readonly styles = injectPreset().questionnaire;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.actions, this.classInput()),
  );
}
