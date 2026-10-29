import {
  Component,
  LOCALE_ID,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScChartState, numberOf } from './chart-state';
import type { ScChartIndicator } from './chart-types';

interface Row {
  key: string;
  name: string;
  value: string;
  color: string;
}

/**
 * The values of the category pointed at (or reached by the keyboard): its
 * name, then each series' — named by the chart's `config`, in the app's
 * locale or through `valueFormatter`. A polite live region: screen readers
 * hear the values as the keyboard moves.
 */
@Component({
  selector: 'div[scChartTooltip]',
  template: `
    @if (content(); as c) {
      @if (!hideLabel()) {
        <div class="font-medium">{{ c.label }}</div>
      }
      <div class="grid gap-1.5">
        @for (row of c.rows; track row.key) {
          <div class="flex w-full items-stretch gap-2">
            @if (!hideIndicator()) {
              <div
                aria-hidden="true"
                [class]="indicatorClass()"
                [style.--color-bg]="row.color"
                [style.--color-border]="row.color"
              ></div>
            }
            <div
              class="flex flex-1 items-center justify-between gap-4 leading-none"
            >
              <span class="text-muted-foreground">{{ row.name }}</span>
              <span class="text-foreground font-mono font-medium tabular-nums">
                {{ row.value }}
              </span>
            </div>
          </div>
        }
      </div>
    }
  `,
  host: {
    'data-slot': 'chart-tooltip',
    role: 'status',
    '[attr.data-state]': 'content() ? "open" : "closed"',
    '[style.left.px]': 'position().left',
    '[style.top.px]': 'position().top',
    '[style.translate]': 'position().translate',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScChartTooltip {
  private readonly state = inject(ScChartState);
  private readonly numbers = new Intl.NumberFormat(inject(LOCALE_ID));

  readonly classInput = input<string>('', { alias: 'class' });
  /** The mark beside each value. */
  readonly indicator = input<ScChartIndicator>('dot');
  readonly hideLabel = input(false, { transform: booleanAttribute });
  readonly hideIndicator = input(false, { transform: booleanAttribute });
  /** The category's name (`'2024-04-01'` → `'Apr 1'`). */
  readonly labelFormatter = input<((category: string) => string) | null>(null);
  /** A value, as shown. */
  readonly valueFormatter = input<
    ((value: number, key: string) => string) | null
  >(null);

  protected readonly content = computed(() => {
    const index = this.state.activeIndex();
    const row = index === null ? undefined : this.state.data()[index];
    if (index === null || !row) return null;
    const category = this.state.categories()[index];
    const config = this.state.config();
    const format =
      this.valueFormatter() ?? ((value: number) => this.numbers.format(value));
    const byCategory = this.state.categoryKeys();
    const keys = this.state.keys();
    const rows: Row[] = keys.map((key) => {
      // A pie's slice, a radial bar: colored by its category — and named by
      // it too, when it is the only series (else by its series, the category
      // in the title).
      const colorKey = byCategory.has(key) ? category : key;
      const nameKey = keys.length === 1 ? colorKey : key;
      return {
        key,
        name: config[nameKey]?.label ?? nameKey,
        value: format(numberOf(row[key]), key),
        color: `var(--color-${colorKey})`,
      };
    });
    return {
      label: this.labelFormatter()?.(category) ?? category,
      rows,
    };
  });

  /** Beside the category, on the side with room. */
  protected readonly position = computed(() => {
    const index = this.state.activeIndex() ?? 0;
    const along = this.state.center(index);
    const { x: dx, y: dy } = this.state.offset();
    const { left, top, right } = this.state.area();
    // Beside its category, on the side with room: right or left of a column,
    // under or over a row.
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

  protected readonly indicatorClass = computed(() =>
    cn(
      'shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)',
      this.indicator() === 'dot' && 'size-2.5 self-center',
      this.indicator() === 'line' && 'w-1',
      this.indicator() === 'dashed' &&
        'w-0 border-[1.5px] border-dashed bg-transparent',
    ),
  );

  protected readonly class = computed(() =>
    cn(
      'border-border/50 bg-background pointer-events-none absolute z-10 grid min-w-32 items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl data-[state=closed]:invisible',
      this.classInput(),
    ),
  );
}
