import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScDockNext } from './dock-next';

/** An item's label — inside it, so its name — shown beside it on hover and focus, as a chip. */
@Directive({
  selector: '[scDockNextLabel]',
  host: {
    'data-slot': 'dock-label',
    '[class]': 'class()',
  },
})
export class ScDockNextLabel {
  private readonly dock = inject(ScDockNext);

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
