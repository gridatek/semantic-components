import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { ScDock } from './dock';

/** An item's label — inside it, so its name — shown beside it on hover and focus, as a chip. */
@Directive({
  selector: '[scDockLabel]',
  host: {
    'data-slot': 'dock-label',
    '[class]': 'class()',
  },
})
export class ScDockLabel {
  private readonly dock = inject(ScDock);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'bg-popover text-popover-foreground pointer-events-none absolute rounded-md border px-2 py-1 text-xs font-medium whitespace-nowrap opacity-0 shadow-sm transition-opacity',
      'group-hover/dock-item:opacity-100 group-focus-visible/dock-item:opacity-100',
      this.dock.orientation() === 'horizontal'
        ? 'bottom-full left-1/2 mb-2 -translate-x-1/2'
        : 'start-full top-1/2 ms-3 -translate-y-1/2',
      this.classInput(),
    ),
  );
}
