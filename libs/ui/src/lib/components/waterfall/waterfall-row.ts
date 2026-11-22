import {
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { ScWaterfall } from './waterfall';
import type { ScWaterfallRowData } from './waterfall-data';

/**
 * A span's row — `[row]`, one of the waterfall's `rows()`: its level, its
 * place among its siblings, open or not, selected or not (a click selects).
 * Holds its header, cells and bar.
 */
@Directive({
  selector: 'div[scWaterfallRow]',
  host: {
    'data-slot': 'waterfall-row',
    role: 'row',
    '[attr.aria-level]': 'row().level',
    '[attr.aria-posinset]': 'row().position',
    '[attr.aria-setsize]': 'row().siblings',
    '[attr.aria-expanded]': 'row().branch ? expanded() : null',
    '[attr.aria-selected]': 'selected()',
    '[attr.tabindex]': 'waterfall.tabStop() === row().item.value ? 0 : -1',
    '[attr.data-level]': 'row().level',
    '[attr.data-branch]': 'row().branch || null',
    '[attr.data-expanded]': 'expanded() || null',
    '[attr.data-selected]': 'selected() || null',
    '[style.--sc-waterfall-level]': 'row().level',
    '[class]': 'class()',
    '(click)': 'onClick()',
    '(focus)': 'waterfall.activeRow.set(row().item.value)',
  },
})
export class ScWaterfallRow {
  readonly waterfall = inject(ScWaterfall);
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  /** The row: one of the waterfall's `rows()`. */
  readonly row = input.required<ScWaterfallRowData>();

  readonly expanded = computed(() =>
    this.waterfall.isExpanded(this.row().item.value),
  );
  readonly selected = computed(
    () => this.waterfall.value() === this.row().item.value,
  );

  private readonly class = computed(() =>
    cn(
      'flex items-stretch border-b outline-none transition-colors',
      'hover:bg-muted/50 data-selected:bg-muted',
      'focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset',
      this.classInput(),
    ),
  );

  constructor() {
    effect((onCleanup) => {
      onCleanup(this.waterfall.ɵregister(this.row().item.value, this.element));
    });
  }

  private onClick(): void {
    this.waterfall.select(this.row().item.value);
    this.waterfall.focus(this.row().item.value);
  }
}
