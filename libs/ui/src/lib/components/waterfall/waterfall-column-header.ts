import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** A column's name — the timeline's holds the axis (name it). Size it as its cells. */
@Directive({
  selector: '[scWaterfallColumnHeader]',
  host: {
    'data-slot': 'waterfall-column-header',
    role: 'columnheader',
    '[class]': 'class()',
  },
})
export class ScWaterfallColumnHeader {
  private readonly styles = injectStyle().table;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.headerCell, 'flex shrink-0 items-center', this.classInput()),
  );
}
