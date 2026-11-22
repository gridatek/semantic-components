import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

/** The header row: the column names, the axis. */
@Directive({
  selector: 'div[scWaterfallHeaderRow]',
  host: {
    'data-slot': 'waterfall-header-row',
    role: 'row',
    '[class]': 'class()',
  },
})
export class ScWaterfallHeaderRow {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn('flex items-stretch border-b', this.classInput()),
  );
}
