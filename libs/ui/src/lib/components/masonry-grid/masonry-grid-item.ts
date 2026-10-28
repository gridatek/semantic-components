import {
  DestroyRef,
  Directive,
  ElementRef,
  computed,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { ScMasonryGrid } from './masonry-grid';

/**
 * An item of the grid: your element (an `li` in a `ul`), any height —
 * `span` columns wide (1 by default). Its moves are animated (not under
 * reduced motion).
 */
@Directive({
  selector: '[scMasonryGridItem]',
  host: {
    'data-slot': 'masonry-grid-item',
    '[style.grid-column]': 'grid.native() ? "span " + span() : null',
    '[class]': 'class()',
  },
})
export class ScMasonryGridItem {
  protected readonly grid = inject(ScMasonryGrid);

  readonly classInput = input<string>('', { alias: 'class' });
  /** How many columns it spans. */
  readonly span = input(1, { transform: numberAttribute });

  protected readonly class = computed(() =>
    cn(
      // Placed by us where the browser can't (`data-native` on the grid):
      // a selector, not a class bound on `native()` — the server renders our
      // layout (no CSS there to ask), and a class bound away while hydrating
      // stays (WebKit's grid then collapsed). `data-placed` is ours only.
      '[[data-slot=masonry-grid]:not([data-native])>&]:absolute',
      'data-placed:transition-[inset-inline-start,top] data-placed:duration-300 data-placed:ease-out motion-reduce:transition-none',
      this.classInput(),
    ),
  );

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const unregister = this.grid.ɵregister({ element, span: this.span });
    inject(DestroyRef).onDestroy(unregister);
  }
}
