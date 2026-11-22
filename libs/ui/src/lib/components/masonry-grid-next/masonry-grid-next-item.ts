import {
  DestroyRef,
  Directive,
  ElementRef,
  computed,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { cn } from 'cn';
import { ScMasonryGridNext } from './masonry-grid-next';

/**
 * An item of the grid: your element (an `li` in a `ul`), any height —
 * `span` columns wide (1 by default). Its moves are animated (not under
 * reduced motion).
 */
@Directive({
  selector: '[scMasonryGridNextItem]',
  host: {
    'data-slot': 'masonry-grid-item',
    // The plain grid's and grid-lanes' span; ours, measured, sets a width.
    '[style.grid-column]': 'span() > 1 ? "span " + span() : null',
    '[class]': 'class()',
  },
})
export class ScMasonryGridNextItem {
  private readonly grid = inject(ScMasonryGridNext);

  readonly classInput = input<string>('', { alias: 'class' });
  /** How many columns it spans. */
  readonly span = input(1, { transform: numberAttribute });

  private readonly class = computed(() =>
    cn(
      // `data-placed`: written by the grid once an item has its first place.
      'data-placed:transition-[translate] data-placed:duration-300 data-placed:ease-out motion-reduce:transition-none',
      this.classInput(),
    ),
  );

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const unregister = this.grid.ɵregister({ element, span: this.span });
    inject(DestroyRef).onDestroy(unregister);
  }
}
