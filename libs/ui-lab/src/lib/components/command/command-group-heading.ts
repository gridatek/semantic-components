import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-command-group-heading]',
  host: {
    'data-slot': 'command-group-heading',
    '[class]': 'class()',
  },
})
export class ScCommandGroupHeading {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'px-2 py-1.5 text-xs font-medium text-muted-foreground',
      this.classInput(),
    ),
  );
}
