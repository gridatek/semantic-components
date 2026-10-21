import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/** A count on an item's corner ("3"). Read as part of the item's name: add words if needed ("3 unread"). */
@Directive({
  selector: '[scDockNextBadge]',
  host: {
    'data-slot': 'dock-badge',
    '[class]': 'class()',
  },
})
export class ScDockNextBadge {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'bg-destructive absolute -end-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full px-1 text-[0.625rem] font-semibold text-white tabular-nums',
      this.classInput(),
    ),
  );
}
