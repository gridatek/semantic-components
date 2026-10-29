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
 * The choice's box: a dot when a radio is chosen; your check icon inside,
 * shown when a checkbox is ticked.
 */
@Component({
  selector: 'span[scQuestionnaireChoiceIndicator]',
  template: `
    @if (choice.type() === 'radio') {
      <span
        data-slot="questionnaire-choice-indicator-dot"
        class="bg-primary-foreground hidden size-2 rounded-full group-has-[>input:checked]/questionnaire-choice:block"
      ></span>
    } @else {
      <ng-content />
    }
  `,
  host: {
    'data-slot': 'questionnaire-choice-indicator',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScQuestionnaireChoiceIndicator {
  protected readonly choice = inject(ScQuestionnaireChoice);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'border-input group-has-[>input:checked]/questionnaire-choice:border-primary group-has-[>input:checked]/questionnaire-choice:bg-primary group-has-[>input:checked]/questionnaire-choice:text-primary-foreground dark:bg-input/30 dark:group-has-[>input:checked]/questionnaire-choice:bg-primary pointer-events-none relative flex size-4 shrink-0 translate-y-[--spacing(0.45)] items-center justify-center rounded-[4px] border group-has-data-[slot=questionnaire-choice-description]/questionnaire-choice:translate-y-0.5 group-data-[type=radio]/questionnaire-choice:rounded-full',
      '[&>svg]:hidden [&>svg]:size-3.5 group-has-[>input:checked]/questionnaire-choice:[&>svg]:block',
      this.classInput(),
    ),
  );
}
