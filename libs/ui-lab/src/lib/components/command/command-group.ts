import { computed, Directive, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scCommandGroup]',
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
      '**:data-[slot=command-group-heading]:px-2 **:data-[slot=command-group-heading]:py-1.5 **:data-[slot=command-group-heading]:text-xs **:data-[slot=command-group-heading]:font-medium **:data-[slot=command-group-heading]:text-muted-foreground',
      this.classInput(),
    ),
  );
}
