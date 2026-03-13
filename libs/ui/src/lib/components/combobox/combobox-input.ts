import { ComboboxInput } from '@angular/aria/combobox';
import { Directive, computed, forwardRef, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScCombobox } from './combobox';

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

  private readonly combobox = inject(forwardRef(() => ScCombobox));

  readonly hasValue = computed(() => this.combobox.hasValue());

  protected readonly class = computed(() =>
    cn(
      'absolute inset-0 h-full w-full cursor-pointer border-none bg-transparent pl-2.5 outline-none placeholder:text-muted-foreground',
      this.hasValue() && 'opacity-0',
      this.classInput(),
    ),
  );
}
