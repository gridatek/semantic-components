import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'input[scMultiselectInput]',
  imports: [],
  template: ``,
  host: {
    '[class]': 'class()',
    readonly: '',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScMultiselectInput {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'absolute inset-0 h-full w-full cursor-pointer border-none bg-transparent opacity-0 outline-none',
      this.classInput(),
    ),
  );
}
