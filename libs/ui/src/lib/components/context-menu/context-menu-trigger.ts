import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[scContextMenuTrigger]',
  host: {
    'data-slot': 'context-menu-trigger',
    '[class]': 'class()',
  },
})
export class ScContextMenuTrigger {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex h-full w-full items-center justify-center rounded-md border border-dashed text-sm',
      this.classInput(),
    ),
  );
}
