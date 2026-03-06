import { Combobox } from '@angular/aria/combobox';
import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scCommand]',
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
    'data-slot': 'command',
    '[class]': 'class()',
  },
})
export class ScCommand {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
      this.classInput(),
    ),
  );
}
