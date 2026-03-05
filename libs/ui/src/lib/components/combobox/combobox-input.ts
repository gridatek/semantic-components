import { ComboboxInput } from '@angular/aria/combobox';
import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'input[scComboboxInput]',
  hostDirectives: [
    {
      directive: ComboboxInput,
      inputs: ['value'],
      outputs: ['valueChange'],
    },
  ],
  host: {
    'data-slot': 'combobox-input',
    '[class]': 'class()',
  },
})
export class ScComboboxInput {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'bg-popover text-popover-foreground placeholder:text-muted-foreground w-full rounded-t-md rounded-b-none border-none py-2.5 pr-3 pl-9 text-sm outline-none',
      this.classInput(),
    ),
  );
}
