import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/** The buttons' row: Previous at the start, Skip and Next (or Submit) at the end. */
@Directive({
  selector: 'div[scQuestionnaireActions]',
  host: {
    'data-slot': 'questionnaire-actions',
    '[class]': 'class()',
  },
})
export class ScQuestionnaireActions {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'grid min-h-11 w-full grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 sm:min-h-8',
      this.classInput(),
    ),
  );
}
