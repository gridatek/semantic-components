import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScButtonVariants } from '../button/button';
import { ScQuestionnaire } from './questionnaire';

/** Back to the question before — from the second one on. */
@Directive({
  selector: 'button[scQuestionnairePrevious]',
  host: {
    'data-slot': 'questionnaire-previous',
    type: 'button',
    '[hidden]': '!visible()',
    '[attr.inert]': 'visible() ? null : ""',
    '[class]': 'class()',
    '(click)': 'questionnaire.previous()',
  },
})
export class ScQuestionnairePrevious {
  private readonly buttonStyles = injectStyle().button;
  private readonly questionnaire = inject(ScQuestionnaire);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('default');

  private readonly visible = computed(
    () => this.questionnaire.total() > 1 && !this.questionnaire.first(),
  );

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      'col-start-1 row-start-1 min-h-11 justify-self-start sm:min-h-0',
      this.classInput(),
    ),
  );
}
