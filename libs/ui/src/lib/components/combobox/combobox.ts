import { Combobox } from '@angular/aria/combobox';
import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scCombobox]',
  exportAs: 'scCombobox',
  hostDirectives: [
    {
      directive: Combobox,
      inputs: [
        'filterMode',
        'disabled',
        'readonly',
        'firstMatch',
        'alwaysExpanded',
      ],
    },
  ],
  host: {
    'data-slot': 'combobox',
    '[class]': 'class()',
  },
})
export class ScCombobox {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'border-border relative flex w-full flex-col rounded-md border',
      this.classInput(),
    ),
  );
}
