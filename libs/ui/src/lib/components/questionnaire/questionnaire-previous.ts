import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
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
  private readonly buttonStyles = injectPreset().button;
  protected readonly questionnaire = inject(ScQuestionnaire);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('default');

  protected readonly visible = computed(
    () => this.questionnaire.total() > 1 && !this.questionnaire.first(),
  );

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      'col-start-1 row-start-1 min-h-11 justify-self-start sm:min-h-0',
      this.classInput(),
    ),
  );
}
