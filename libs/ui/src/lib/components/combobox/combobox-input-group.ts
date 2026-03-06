import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scComboboxInputGroup]',
  host: {
    'data-slot': 'combobox-input-group',
    '[class]': 'class()',
  },
})
export class ScComboboxInputGroup {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'border-input dark:bg-input/30 dark:hover:bg-input/50 focus-visible:border-ring focus-visible:ring-ring/50 relative flex h-8 w-full items-center gap-1.5 rounded-lg border bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors select-none outline-none focus-visible:ring-3 has-aria-disabled:cursor-not-allowed has-aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
      this.classInput(),
    ),
  );
}
