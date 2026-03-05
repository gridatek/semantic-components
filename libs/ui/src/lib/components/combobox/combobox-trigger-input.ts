import { ComboboxInput } from '@angular/aria/combobox';
import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'input[scComboboxTriggerInput]',
  hostDirectives: [ComboboxInput],
  host: {
    'data-slot': 'combobox-trigger-input',
    '[class]': 'class()',
  },
})
export class ScComboboxTriggerInput {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'bg-popover text-popover-foreground w-full cursor-pointer rounded-md border-none px-3 py-2.5 text-sm outline-none',
      this.classInput(),
    ),
  );
}
