import { _IdGenerator } from '@angular/cdk/a11y';
import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScQuestionnaireItem } from './questionnaire-item';

/**
 * What is wrong with the answer — your words: shown, and announced, once the
 * question is tried unanswered or invalid; read with it while shown.
 */
@Directive({
  selector: 'p[scQuestionnaireError]',
  host: {
    'data-slot': 'questionnaire-error',
    '[id]': 'id()',
    '[hidden]': '!item.showInvalid()',
    '[attr.role]': 'item.showInvalid() ? "alert" : null',
    '[class]': 'class()',
  },
})
export class ScQuestionnaireError {
  protected readonly item = inject(ScQuestionnaireItem);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly id = input(inject(_IdGenerator).getId('sc-questionnaire-error-'));

  protected readonly class = computed(() =>
    cn('text-destructive mt-2 text-sm', this.classInput()),
  );

  constructor() {
    inject(DestroyRef).onDestroy(this.item.registerError(this.id));
  }
}
