import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-context-menu-separator]',
  host: {
    'data-slot': 'context-menu-separator',
    role: 'separator',
    '[class]': 'class()',
  },
})
export class ScContextMenuSeparator {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('-mx-1 my-1 h-px bg-border', this.classInput()),
  );
}
