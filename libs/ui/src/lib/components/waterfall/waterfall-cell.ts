import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** Another column of a row: a status, a size. Size it (`w-20`). */
@Directive({
  selector: '[scWaterfallCell]',
  host: {
    'data-slot': 'waterfall-cell',
    role: 'gridcell',
    '[class]': 'class()',
  },
})
export class ScWaterfallCell {
  private readonly styles = injectStyle().table;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.cell, 'flex shrink-0 items-center', this.classInput()),
  );
}
