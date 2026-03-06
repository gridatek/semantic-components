import { ComboboxInput } from '@angular/aria/combobox';
import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'input[scCommandInput]',
  hostDirectives: [
    {
      directive: ComboboxInput,
      inputs: ['value'],
      outputs: ['valueChange'],
    },
  ],
  host: {
    'data-slot': 'command-input',
    '[class]': 'class()',
  },
})
export class ScCommandInput {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'w-full text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
      this.classInput(),
    ),
  );
}
