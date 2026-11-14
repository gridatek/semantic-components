import {
  Directive,
  computed,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { injectPreset } from '@semantic-components/ui';
import { cn } from 'cn';
import { ScChartState, numberOf } from './chart-state';
import type { ScChartTooltipPayload } from './chart-types';

/**
 * The tooltip's box, beside the category pointed at (or reached by the
 * keyboard): the preset's look, a polite live region. You write what is in it
 * from its state — `label()`, the category; `payload()`, an item per series
 * (Recharts' names) — with `scChartTooltipLabel` and `scChartTooltipItem`.
 */
@Directive({
  selector: 'div[scChartTooltip]',
  exportAs: 'scChartTooltip',
  host: {
    'data-slot': 'chart-tooltip',
    role: 'status',
    '[attr.data-state]': 'active() ? "open" : "closed"',
    '[style.left.px]': 'position().left',
    '[style.top.px]': 'position().top',
    '[style.translate]': 'position().translate',
    '[class]': 'class()',
  },
})
export class ScChartTooltip {
  private readonly state = inject(ScChartState);
  private readonly tooltipStyles = injectPreset().chart.tooltip;

  readonly classInput = input<string>('', { alias: 'class' });

  /** A category is pointed at, and its row exists: the tooltip shows. */
  readonly active = computed(() => {
    const index = this.state.activeIndex();
    return index !== null && !!this.state.data()[index];
  });

  /**
   * The category shown: the active one — closed, the last one shown (the
   * first before any), so what you write from it always has a category; the
   * box is invisible then, to screen readers too.
   */
  private readonly index = linkedSignal<number | null, number | null>({
    source: () => this.state.activeIndex(),
    computation: (index, previous) => {
      const shown = index ?? previous?.value ?? 0;
      return this.state.data()[shown] ? shown : null;
    },
  });

  /** The category's name, as in the data. */
  readonly label = computed(() => {
    const index = this.index();
    return index === null ? '' : (this.state.categories()[index] ?? '');
  });

  /** Each series' value at the category, with its name and colour. */
  readonly payload = computed<ScChartTooltipPayload[]>(() => {
    const index = this.index();
    if (index === null) return [];
    const row = this.state.data()[index];
    const category = this.state.categories()[index];
    const config = this.state.config();
    const byCategory = this.state.categoryKeys();
    const keys = this.state.keys();
    const series = this.state.series();
    return keys.map((key) => {
      const own = series.find((s) => s.key() === key)?.colorOf?.(index);
      // A pie's slice, a radial bar: colored by its category — and named by
      // it too, when it is the only series (else by its series, the category
      // in the label).
      const colorKey = byCategory.has(key) ? category : key;
      const nameKey = keys.length === 1 ? colorKey : key;
      return {
        dataKey: key,
        name: config[nameKey]?.label ?? nameKey,
        value: numberOf(row[key]),
        color: own ?? `var(--color-${colorKey})`,
      };
    });
  });

  /** Beside the category, on the side with room. */
  protected readonly position = computed(() => {
    const index = this.state.activeIndex() ?? 0;
    const along = this.state.center(index);
    const { x: dx, y: dy } = this.state.offset();
    const { left, top, right } = this.state.area();
    // Right or left of a column, under or over a row.
    return this.state.vertical()
      ? {
          left: dx + (left + right) / 2,
          top: dy + along + 12,
          translate:
            along > this.state.height() / 2
              ? '-50% calc(-100% - 24px)'
              : '-50% 0',
        }
      : {
          left: dx + along + 12,
          top: dy + top,
          translate:
            along > this.state.width() / 2 ? 'calc(-100% - 24px) 0' : null,
        };
  });

  protected readonly class = computed(() =>
    cn(
      // Its place: the preset's box (shadcn's, per style), over the plot.
      'pointer-events-none absolute z-10 data-[state=closed]:invisible',
      this.tooltipStyles,
      this.classInput(),
    ),
  );
}
