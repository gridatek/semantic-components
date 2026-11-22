import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScWaterfall } from './waterfall';
import { ScWaterfallRow } from './waterfall-row';

/**
 * The span on the time axis: from its start, as long as it lasts — a share of
 * the range (`--sc-waterfall-start`, `--sc-waterfall-size`), from the line's
 * start; out of the range, held to its edge. The marks cross it. Its label is
 * its times (or the waterfall's `barLabel`).
 */
@Component({
  selector: '[scWaterfallBar]',
  template: `
    @for (mark of waterfall.marks(); track mark) {
      <span
        aria-hidden="true"
        class="bg-border absolute inset-y-0 w-px"
        [style.inset-inline-start.%]="waterfall.percentAt(mark)"
      ></span>
    }
    <span
      aria-hidden="true"
      data-slot="waterfall-bar-fill"
      [class]="fillClass()"
      [style.inset-inline-start.%]="start()"
      [style.width.%]="size()"
    ></span>
  `,
  host: {
    'data-slot': 'waterfall-bar',
    role: 'gridcell',
    '[attr.aria-label]': 'label()',
    '[attr.data-level]': 'row.row().level',
    '[attr.data-selected]': 'row.selected() || null',
    '[style.--sc-waterfall-start]': 'start() + "%"',
    '[style.--sc-waterfall-size]': 'size() + "%"',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScWaterfallBar {
  private readonly styles = injectStyle().waterfall;
  private readonly waterfall = inject(ScWaterfall);
  private readonly row = inject(ScWaterfallRow);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly item = computed(() => this.row.row().item);
  private readonly start = computed(() =>
    this.waterfall.percentAt(this.item().start),
  );
  private readonly size = computed(
    () =>
      this.waterfall.percentAt(this.item().start + this.item().duration) -
      this.start(),
  );
  private readonly label = computed(() => this.waterfall.barText(this.item()));

  private readonly fillClass = computed(() =>
    cn('absolute top-1/2 h-2.5 min-w-px -translate-y-1/2', this.styles.bar),
  );

  private readonly class = computed(() =>
    cn('relative min-w-24 flex-1 self-stretch', this.classInput()),
  );
}
