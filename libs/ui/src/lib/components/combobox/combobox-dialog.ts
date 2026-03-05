import { ComboboxDialog } from '@angular/aria/combobox';
import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'dialog[scComboboxDialog]',
  hostDirectives: [ComboboxDialog],
  host: {
    'data-slot': 'combobox-dialog',
    '[class]': 'class()',
  },
})
export class ScComboboxDialog {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'border-border bg-popover text-popover-foreground absolute rounded-md border p-0 shadow-md backdrop:bg-transparent',
      this.classInput(),
    ),
  );
}
