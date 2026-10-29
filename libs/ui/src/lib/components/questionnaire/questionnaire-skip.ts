import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScButtonVariants } from '../button/button';
import { ScQuestionnaire } from './questionnaire';

/** Past a question the schema doesn't require — on the last one, submits. */
@Directive({
  selector: 'button[scQuestionnaireSkip]',
  host: {
    'data-slot': 'questionnaire-skip',
    type: 'button',
    '[hidden]': '!visible()',
    '[attr.inert]': 'visible() ? null : ""',
    '[class]': 'class()',
    '(click)': 'questionnaire.skip()',
  },
})
export class ScQuestionnaireSkip {
  private readonly buttonStyles = injectPreset().button;
  protected readonly questionnaire = inject(ScQuestionnaire);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('default');

  protected readonly visible = computed(() => {
    const active = this.questionnaire.active();
    return !!active && !active.required();
  });

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      'col-start-2 row-start-1 min-h-11 justify-self-end sm:min-h-0',
      this.classInput(),
    ),
  );
}
