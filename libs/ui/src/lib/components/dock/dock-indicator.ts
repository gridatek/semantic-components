import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { ScDock } from './dock';

/** The dot by an item: open, or the current page. Decorative — say it in words if it matters. */
@Directive({
  selector: '[scDockIndicator]',
  host: {
    'data-slot': 'dock-indicator',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScDockIndicator {
  private readonly dock = inject(ScDock);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'bg-foreground/70 absolute size-1 rounded-full',
      this.dock.orientation() === 'horizontal'
        ? '-bottom-1.5 left-1/2 -translate-x-1/2'
        : '-start-1.5 top-1/2 -translate-y-1/2',
      this.classInput(),
    ),
  );
}
