import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScDockNext } from './dock-next';

/** Between groups of items. */
@Directive({
  selector: '[scDockNextSeparator]',
  host: {
    'data-slot': 'dock-separator',
    role: 'separator',
    '[attr.aria-orientation]': 'orientation()',
    '[class]': 'class()',
  },
})
export class ScDockNextSeparator {
  private readonly dock = inject(ScDockNext);

  readonly classInput = input<string>('', { alias: 'class' });

  /** Across the dock. */
  protected readonly orientation = computed(() =>
    this.dock.orientation() === 'horizontal' ? 'vertical' : 'horizontal',
  );

  protected readonly class = computed(() =>
    cn(
      'bg-border shrink-0 self-stretch',
      this.dock.orientation() === 'horizontal' ? 'mx-1 w-px' : 'my-1 h-px',
      this.classInput(),
    ),
  );
}
