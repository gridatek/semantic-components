import {
  DestroyRef,
  Directive,
  ElementRef,
  computed,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
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
    '[style.grid-column]': 'grid.native() ? "span " + span() : null',
    '[class]': 'class()',
  },
})
export class ScMasonryGridNextItem {
  protected readonly grid = inject(ScMasonryGridNext);

  readonly classInput = input<string>('', { alias: 'class' });
  /** How many columns it spans. */
  readonly span = input(1, { transform: numberAttribute });

  protected readonly class = computed(() =>
    cn(
      !this.grid.native() && [
        'absolute',
        'data-placed:transition-[inset-inline-start,top] data-placed:duration-300 data-placed:ease-out motion-reduce:transition-none',
      ],
      this.classInput(),
    ),
  );

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const unregister = this.grid.ɵregister({ element, span: this.span });
    inject(DestroyRef).onDestroy(unregister);
  }
}
