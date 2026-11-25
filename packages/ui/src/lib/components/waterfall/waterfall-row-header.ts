import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScWaterfallRow } from './waterfall-row';

/** Names the span (its label, its indicator): indented by its level. */
@Directive({
  selector: '[scWaterfallRowHeader]',
  host: {
    'data-slot': 'waterfall-row-header',
    role: 'rowheader',
    '[attr.data-level]': 'row.row().level',
    '[class]': 'class()',
  },
})
export class ScWaterfallRowHeader {
  private readonly styles = injectStyle().table;
  private readonly row = inject(ScWaterfallRow);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(
      this.styles.cell,
      'flex w-48 shrink-0 items-center gap-1 truncate',
      'ps-[calc((var(--sc-waterfall-level)-1)*1rem+0.5rem)]',
      this.classInput(),
    ),
  );
}
