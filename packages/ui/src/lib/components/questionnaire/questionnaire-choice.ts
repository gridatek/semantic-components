import { Directive, computed, inject, input, signal } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScQuestionnaireItem } from './questionnaire-item';

/**
 * A choice: a card around its `scQuestionnaireChoiceInput` (a radio, or a
 * checkbox for several answers) — the whole card picks it.
 */
@Directive({
  selector: 'label[scQuestionnaireChoice]',
  exportAs: 'scQuestionnaireChoice',
  host: {
    'data-slot': 'questionnaire-choice',
    '[attr.data-type]': 'type()',
    '[attr.data-shortcut]': 'shortcut()',
    '[attr.data-invalid]': 'item.showInvalid() ? "" : null',
    '[class]': 'class()',
  },
})
export class ScQuestionnaireChoice {
  private readonly styles = injectStyle().questionnaire;
  private readonly item = inject(ScQuestionnaireItem);

  readonly classInput = input<string>('', { alias: 'class' });

  /**
   * Its input: radio or checkbox, and its key (A, B… or 1, 2…, from the
   * questionnaire's `shortcuts`; null without) — set by the input. Show the
   * key yourself, in your words: `<kbd scKbd>{{ choice.shortcut() }}</kbd>`.
   */
  readonly type = signal<'radio' | 'checkbox' | null>(null);
  readonly shortcut = signal<string | null>(null);

  private readonly class = computed(() =>
    cn(
      this.styles.choice,
      // A key you show in it (scKbd): at its end, on its first line — lower
      // with a description.
      '*:data-[slot=kbd]:ms-auto *:data-[slot=kbd]:shrink-0 *:data-[slot=kbd]:translate-y-[--spacing(0.45)] has-data-[slot=questionnaire-choice-description]:*:data-[slot=kbd]:translate-y-0.5',
      this.classInput(),
    ),
  );
}
