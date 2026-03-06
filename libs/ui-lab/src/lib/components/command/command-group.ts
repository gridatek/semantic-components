import { Directive, computed, input } from '@angular/core';
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
      '**:data-[slot=command-group-label]:px-2 **:data-[slot=command-group-label]:py-1.5 **:data-[slot=command-group-label]:text-xs **:data-[slot=command-group-label]:font-medium **:data-[slot=command-group-label]:text-muted-foreground',
      this.classInput(),
    ),
  );
}
