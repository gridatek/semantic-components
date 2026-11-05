import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
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
  private readonly styles = injectPreset().questionnaire;
  protected readonly choice = inject(ScQuestionnaireChoice);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.shortcut, this.classInput()),
  );
}
