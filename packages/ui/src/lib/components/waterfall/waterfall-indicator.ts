import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScWaterfallRow } from './waterfall-row';

/**
 * Opens or closes its span — around your chevron (turned when open, as the
 * text reads). For the pointer: the keyboard opens with → and ←, so it is
 * hidden from screen readers and out of the Tab order. Its place kept on a
 * span with nothing under it.
 */
@Directive({
  selector: 'button[scWaterfallIndicator]',
  host: {
    'data-slot': 'waterfall-indicator',
    type: 'button',
    tabindex: '-1',
    'aria-hidden': 'true',
    '[attr.data-level]': 'row.row().level',
    '[attr.data-expanded]': 'row.expanded() || null',
    '[class]': 'class()',
    '(click)': 'onClick($event)',
  },
})
export class ScWaterfallIndicator {
  private readonly row = inject(ScWaterfallRow);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(
      "text-muted-foreground inline-flex size-4 shrink-0 items-center justify-center transition-transform [&_svg:not([class*='size-'])]:size-4 rtl:-scale-x-100",
      this.row.expanded() && 'rotate-90 rtl:-rotate-90',
      !this.row.row().branch && 'invisible',
      this.classInput(),
    ),
  );

  private onClick(event: MouseEvent): void {
    // Opens; doesn't select.
    event.stopPropagation();
    this.row.waterfall.toggle(this.row.row().item.value);
  }
}
