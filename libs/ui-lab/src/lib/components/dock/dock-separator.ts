import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScDock } from './dock';

/** Between groups of items. */
@Directive({
  selector: '[scDockSeparator]',
  host: {
    'data-slot': 'dock-separator',
    role: 'separator',
    '[attr.aria-orientation]': 'orientation()',
    '[class]': 'class()',
  },
})
export class ScDockSeparator {
  private readonly dock = inject(ScDock);

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
