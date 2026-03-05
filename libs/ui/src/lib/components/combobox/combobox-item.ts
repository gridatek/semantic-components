import { Option } from '@angular/aria/listbox';
import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scComboboxItem]',
  hostDirectives: [
    {
      directive: Option,
      inputs: ['value', 'label'],
    },
  ],
  host: {
    'data-slot': 'combobox-item',
    '[class]': 'class()',
  },
})
export class ScComboboxItem {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'data-[active=true]:bg-accent data-[active=true]:text-accent-foreground aria-selected:text-primary flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none',
      this.classInput(),
    ),
  );
}
