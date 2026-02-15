import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'fieldset[sc-fieldset]',
  host: {
    'data-slot': 'fieldset',
    '[class]': 'class()',
  },
})
export class ScFieldset {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3 flex flex-col',
      this.classInput(),
    ),
  );
}
