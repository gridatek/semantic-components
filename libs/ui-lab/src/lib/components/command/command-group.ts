import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-command-group]',
  host: {
    'data-slot': 'command-group',
    role: 'group',
    '[class]': 'class()',
  },
})
export class ScCommandGroup {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly heading = input<string>('');

  protected readonly class = computed(() =>
    cn(
      'overflow-hidden p-1 text-foreground',
      '[&_[data-slot=command-group-heading]]:px-2 [&_[data-slot=command-group-heading]]:py-1.5 [&_[data-slot=command-group-heading]]:text-xs [&_[data-slot=command-group-heading]]:font-medium [&_[data-slot=command-group-heading]]:text-muted-foreground',
      this.classInput(),
    ),
  );
}
