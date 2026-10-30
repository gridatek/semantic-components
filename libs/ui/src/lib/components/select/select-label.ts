import { _IdGenerator } from '@angular/cdk/a11y';
import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { SC_SELECT } from './select-tokens';

/**
 * The select's visible name: the trigger is labelled by it. A click on it
 * focuses the trigger without opening the list, as Base UI's. Write it inside
 * the select (`div[scSelect]`), before the trigger.
 */
@Directive({
  selector: 'div[scSelectLabel], label[scSelectLabel]',
  host: {
    '[id]': 'id()',
    '[class]': 'class()',
    '(click)': 'select.focus()',
  },
})
export class ScSelectLabel {
  protected readonly select = inject(SC_SELECT);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly idInput = input(inject(_IdGenerator).getId('sc-select-label-'), {
    alias: 'id',
  });

  readonly id = computed(() => this.idInput());

  protected readonly class = computed(() =>
    cn(
      // shadcn's Label.
      'flex w-fit cursor-default items-center gap-2 text-sm leading-none font-medium select-none',
      this.classInput(),
    ),
  );
}
