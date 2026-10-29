import {
  DestroyRef,
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScQuestionnaire } from './questionnaire';
import { ScQuestionnaireChoice } from './questionnaire-choice';
import { ScQuestionnaireItem } from './questionnaire-item';

/**
 * The choice's own input — a radio, or a checkbox for several answers — with
 * your `[formField]` and `value`: over the whole card, unseen.
 */
@Directive({
  selector:
    'input[type="radio"][scQuestionnaireChoiceInput], input[type="checkbox"][scQuestionnaireChoiceInput]',
  host: {
    'data-slot': 'questionnaire-choice-input',
    '[attr.aria-invalid]': 'item.showInvalid() || null',
    '[attr.aria-keyshortcuts]': 'shortcut()',
    '[class]': 'class()',
  },
})
export class ScQuestionnaireChoiceInput {
  private readonly questionnaire = inject(ScQuestionnaire);
  protected readonly item = inject(ScQuestionnaireItem);
  private readonly choice = inject(ScQuestionnaireChoice, { optional: true });
  private readonly element =
    inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });

  /** Its key, by its place among the question's choices. */
  protected readonly shortcut = computed(() => {
    const index = this.item.choiceInputs().indexOf(this.element);
    return this.questionnaire.shortcutKeys()[index] ?? null;
  });

  protected readonly class = computed(() =>
    cn(
      'absolute inset-0 z-10 size-full cursor-pointer opacity-0',
      this.classInput(),
    ),
  );

  constructor() {
    inject(DestroyRef).onDestroy(this.item.registerChoice(this.element));
    effect(() => {
      this.choice?.shortcut.set(this.shortcut());
      this.choice?.type.set(
        this.element.type === 'checkbox' ? 'checkbox' : 'radio',
      );
    });
  }
}
