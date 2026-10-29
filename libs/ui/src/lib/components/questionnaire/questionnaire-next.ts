import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScButtonVariants } from '../button/button';
import { ScQuestionnaire } from './questionnaire';

/**
 * To the next question, once this one is answered as the schema says — Enter
 * on a choice too. Not on the last question: Submit is.
 */
@Directive({
  selector: 'button[scQuestionnaireNext]',
  host: {
    'data-slot': 'questionnaire-next',
    type: 'button',
    '[hidden]': '!visible()',
    '[attr.inert]': 'visible() ? null : ""',
    '[attr.aria-keyshortcuts]': 'visible() ? "Enter" : null',
    '[class]': 'class()',
    '(click)': 'questionnaire.next()',
  },
})
export class ScQuestionnaireNext {
  private readonly buttonStyles = injectPreset().button;
  protected readonly questionnaire = inject(ScQuestionnaire);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('default');
  readonly size = input<ScButtonVariants['size']>('default');

  protected readonly visible = computed(
    () => this.questionnaire.total() > 1 && !this.questionnaire.last(),
  );

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      'col-start-3 row-start-1 min-h-11 justify-self-end sm:min-h-0',
      this.classInput(),
    ),
  );
}
