import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScButtonVariants } from '../button/button';
import { ScQuestionnaire } from './questionnaire';

/**
 * Submits the form, on the last question: your Signal Form's submission runs
 * — or, with a question left wrong, the questionnaire goes back to it.
 */
@Directive({
  selector: 'button[scQuestionnaireSubmit]',
  host: {
    'data-slot': 'questionnaire-submit',
    type: 'submit',
    '[hidden]': '!visible()',
    '[attr.inert]': 'visible() ? null : ""',
    '[attr.aria-keyshortcuts]': 'visible() ? "Enter" : null',
    '[class]': 'class()',
  },
})
export class ScQuestionnaireSubmit {
  private readonly buttonStyles = injectStyle().button;
  private readonly questionnaire = inject(ScQuestionnaire);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('default');
  readonly size = input<ScButtonVariants['size']>('default');

  private readonly visible = computed(() => this.questionnaire.last());

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      'col-start-3 row-start-1 min-h-11 justify-self-end sm:min-h-0',
      this.classInput(),
    ),
  );
}
