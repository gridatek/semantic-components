import { Directive, computed, forwardRef, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScCombobox } from './combobox';

@Directive({
  selector: 'input[scComboboxInput]',
  host: {
    '[class]': 'class()',
    readonly: '',
  },
})
export class ScComboboxInput {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly combobox = inject(forwardRef(() => ScCombobox));

  protected readonly class = computed(() =>
    cn(
      'absolute inset-0 h-full w-full cursor-pointer border-none bg-transparent pl-2.5 outline-none placeholder:text-muted-foreground',
      this.combobox.hasValue() && 'opacity-0',
      this.classInput(),
    ),
  );
}
