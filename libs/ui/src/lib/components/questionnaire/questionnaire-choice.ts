import { Directive, computed, inject, input, signal } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';
import { ScQuestionnaireItem } from './questionnaire-item';

/**
 * A choice: a card around its `scQuestionnaireChoiceInput` (a radio, or a
 * checkbox for several answers) — the whole card picks it.
 */
@Directive({
  selector: 'label[scQuestionnaireChoice]',
  host: {
    'data-slot': 'questionnaire-choice',
    '[attr.data-type]': 'type()',
    '[attr.data-shortcut]': 'shortcut()',
    '[attr.data-invalid]': 'item.showInvalid() ? "" : null',
    '[class]': 'class()',
  },
})
export class ScQuestionnaireChoice {
  private readonly styles = injectPreset().questionnaire;
  protected readonly item = inject(ScQuestionnaireItem);

  readonly classInput = input<string>('', { alias: 'class' });

  /** Its input: radio or checkbox, and its shortcut — set by the input. */
  readonly type = signal<'radio' | 'checkbox' | null>(null);
  readonly shortcut = signal<string | null>(null);

  protected readonly class = computed(() =>
    cn(this.styles.choice, this.classInput()),
  );
}
