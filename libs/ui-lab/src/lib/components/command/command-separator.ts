import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-command-separator]',
  host: {
    'data-slot': 'command-separator',
    role: 'separator',
    '[class]': 'class()',
  },
})
export class ScCommandSeparator {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('-mx-1 h-px bg-border', this.classInput()),
  );
}
