import { _IdGenerator } from '@angular/cdk/a11y';
import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScQuestionnaireItem } from './questionnaire-item';

/** More about the question: read with it (`aria-describedby`). */
@Directive({
  selector: 'p[scQuestionnaireDescription]',
  host: {
    'data-slot': 'questionnaire-description',
    '[id]': 'id()',
    '[class]': 'class()',
  },
})
export class ScQuestionnaireDescription {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly id = input(
    inject(_IdGenerator).getId('sc-questionnaire-description-'),
  );

  protected readonly class = computed(() =>
    cn('text-muted-foreground text-sm text-pretty', this.classInput()),
  );

  constructor() {
    inject(DestroyRef).onDestroy(
      inject(ScQuestionnaireItem).registerDescription(this.id),
    );
  }
}
