import { Directive, computed, inject, input, signal } from '@angular/core';
import { cn } from '../../utils';
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
  protected readonly item = inject(ScQuestionnaireItem);

  readonly classInput = input<string>('', { alias: 'class' });

  /** Its input: radio or checkbox, and its shortcut — set by the input. */
  readonly type = signal<'radio' | 'checkbox' | null>(null);
  readonly shortcut = signal<string | null>(null);

  protected readonly class = computed(() =>
    cn(
      'group/questionnaire-choice border-input hover:bg-muted/50 has-[>input:focus-visible]:border-ring has-[>input:focus-visible]:ring-ring/50 data-invalid:border-destructive dark:bg-input/20 has-[>input:checked]:border-primary/40 has-[>input:checked]:bg-muted dark:has-[>input:checked]:bg-muted relative flex min-h-11 cursor-pointer items-start gap-2.5 rounded-lg border bg-transparent px-3 py-2.5 text-start text-sm transition-colors outline-none select-none has-[>input:focus-visible]:ring-3',
      'has-[>input:disabled]:pointer-events-none has-[>input:disabled]:cursor-not-allowed has-[>input:disabled]:opacity-50',
      this.classInput(),
    ),
  );
}
