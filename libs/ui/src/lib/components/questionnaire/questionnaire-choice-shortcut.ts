import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScQuestionnaireChoice } from './questionnaire-choice';

/**
 * The choice's key (A, B… or 1, 2…, from the questionnaire's `shortcuts`),
 * written for you; hidden without one. The input carries it for screen
 * readers (`aria-keyshortcuts`).
 */
@Component({
  selector: 'kbd[scQuestionnaireChoiceShortcut]',
  template: `{{ choice.shortcut() }}`,
  host: {
    'data-slot': 'questionnaire-choice-shortcut',
    'aria-hidden': 'true',
    '[hidden]': '!choice.shortcut()',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScQuestionnaireChoiceShortcut {
  protected readonly choice = inject(ScQuestionnaireChoice);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'border-input bg-background text-muted-foreground pointer-events-none ms-auto inline-flex size-5 shrink-0 translate-y-[--spacing(0.45)] items-center justify-center rounded-md border font-mono text-[0.625rem] leading-none font-medium group-has-data-[slot=questionnaire-choice-description]/questionnaire-choice:translate-y-0.5',
      this.classInput(),
    ),
  );
}
