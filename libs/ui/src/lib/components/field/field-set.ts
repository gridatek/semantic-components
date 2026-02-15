import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'fieldset[sc-field-set]',
  host: {
    'data-slot': 'field-set',
    '[class]': 'class()',
  },
})
export class ScFieldSet {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3 flex flex-col',
      this.classInput(),
    ),
  );
}
