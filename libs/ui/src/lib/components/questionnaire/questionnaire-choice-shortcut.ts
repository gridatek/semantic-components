import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
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
  private readonly styles = injectStyle().questionnaire;
  private readonly choice = inject(ScQuestionnaireChoice);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.shortcut, this.classInput()),
  );
}
