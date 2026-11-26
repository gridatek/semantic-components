import { Directionality } from '@angular/cdk/bidi';
import {
  Directive,
  LOCALE_ID,
  computed,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { injectDisplayLocale, ɵwarnIfUnnamed } from '../../utils';
import { type ScWaterfallItem, scWaterfallRows } from './waterfall-data';

/** How a time is written: number format options for ms, or yours. */
export type ScWaterfallFormat =
  Intl.NumberFormatOptions | ((milliseconds: number) => string);

/** A bar's label for screen readers, given its span and its times written. */
export type ScWaterfallBarLabel = (
  item: ScWaterfallItem,
  times: {
    readonly start: string;
    readonly duration: string;
    readonly range: string;
  },
) => string;

/** Rows a Page Up / Page Down moves. */
const PAGE = 10;

/**
 * Spans — a page's requests, a trace, a build — as bars on a shared time
 * axis; a span that started others expands to show them. A tree grid: one Tab
 * stop, the arrows between rows (→ ← open and close), Enter or Space selects,
 * typing finds a span by its label. You loop over `rows()` (the ones shown).
 * Name it. `#waterfall="scWaterfall"`: `toggle()`, `expandAll()`,
 * `collapseAll()`, `reveal()`, `focus()`, `percentAt()`, `formatTime()`.
 */
@Directive({
  selector: 'div[scWaterfall]',
  exportAs: 'scWaterfall',
  host: {
    'data-slot': 'waterfall',
    role: 'treegrid',
    '[attr.aria-multiselectable]': 'false',
    '[class]': 'class()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScWaterfall {
  private readonly locale = inject(LOCALE_ID);
  /** What it shows: the locale, in the user's numbering system. */
  private readonly displayLocale = injectDisplayLocale();
  private readonly directionality = inject(Directionality);
  private readonly styles = injectStyle().table;

  readonly classInput = input<string>('', { alias: 'class' });
  /** The spans. */
  readonly items = input.required<readonly ScWaterfallItem[]>();
  /** The time shown, `[start, end]` in ms; by default, the first start to the last end. */
  readonly range = input<readonly [number, number] | null>(null);
  /** The selected span: two-way. */
  readonly value = model<string | null>(null);
  /** The spans open (their children shown): two-way. Closed at first. */
  readonly expanded = model<readonly string[]>([]);
  /** How times are written: ms as number format options (`120 ms`), or a function. */
  readonly format = input<ScWaterfallFormat>({
    style: 'unit',
    unit: 'millisecond',
    unitDisplay: 'short',
  });
  /** A bar's label for screen readers; by default, its times (`120–460 ms`). */
  readonly barLabel = input<ScWaterfallBarLabel | null>(null);

  /** Every span, as a row. */
  readonly allRows = computed(() => scWaterfallRows(this.items()));
  /** The rows shown: those whose parents are all open. */
  readonly rows = computed(() => {
    const open = new Set(this.expanded());
    const shown = new Set<string | null>([null]);
    return this.allRows().filter((row) => {
      if (!shown.has(row.parent)) return false;
      if (open.has(row.item.value)) shown.add(row.item.value);
      return true;
    });
  });
  /** The time shown. */
  readonly bounds = computed<readonly [number, number]>(() => {
    const range = this.range();
    if (range) return range;
    const rows = this.allRows();
    if (!rows.length) return [0, 1];
    const from = Math.min(...rows.map((r) => r.item.start));
    const to = Math.max(...rows.map((r) => r.item.start + r.item.duration));
    return to > from ? [from, to] : [from, from + 1];
  });

  /** The marks' times (`scWaterfallMark`), drawn across the rows. */
  readonly marks = signal<readonly number[]>([]);
  /** The row with the Tab stop, by value. */
  readonly activeRow = signal<string | null>(null);
  private readonly elements = new Map<string, HTMLElement>();
  private typed = '';
  private typedAt = 0;

  /** The span with the Tab stop: the one focused last, the selected, or the first shown. */
  readonly tabStop = computed(() => {
    const shown = this.rows().map((row) => row.item.value);
    for (const value of [this.activeRow(), this.value()])
      if (value !== null && shown.includes(value)) return value;
    return shown[0] ?? null;
  });

  private readonly number = computed(() => {
    const format = this.format();
    return typeof format === 'function'
      ? null
      : new Intl.NumberFormat(this.displayLocale(), format);
  });

  private readonly class = computed(() =>
    cn('flex flex-col', this.styles.table, this.classInput()),
  );

  constructor() {
    ɵwarnIfUnnamed('scWaterfall');
  }

  /** Where a time sits in the range, 0–100 (held to it). */
  percentAt(time: number): number {
    const [from, to] = this.bounds();
    return Math.min(Math.max(((time - from) / (to - from)) * 100, 0), 100);
  }

  /** A time, written. */
  formatTime(milliseconds: number): string {
    const format = this.format();
    if (typeof format === 'function') return format(milliseconds);
    return this.number()?.format(milliseconds) ?? String(milliseconds);
  }

  /** A bar's label: yours, or its times as a range (`120–460 ms`). */
  barText(item: ScWaterfallItem): string {
    const end = item.start + item.duration;
    // formatRange: "120–460 ms" (in every browser; newer than the lib's types).
    const number = this.number() as
      | (Intl.NumberFormat & {
          formatRange?(from: number, to: number): string;
        })
      | null;
    const range =
      number?.formatRange?.(item.start, end) ??
      `${this.formatTime(item.start)} – ${this.formatTime(end)}`;
    const label = this.barLabel();
    return label
      ? label(item, {
          start: this.formatTime(item.start),
          duration: this.formatTime(item.duration),
          range,
        })
      : range;
  }

  isExpanded(value: string): boolean {
    return this.expanded().includes(value);
  }

  /** A span opened, or closed. */
  toggle(value: string, open = !this.isExpanded(value)): void {
    if (open === this.isExpanded(value)) return;
    this.expanded.update((list) =>
      open ? [...list, value] : list.filter((v) => v !== value),
    );
  }

  /** Every span that started others, open. */
  expandAll(): void {
    this.expanded.set(
      this.allRows()
        .filter((row) => row.branch)
        .map((row) => row.item.value),
    );
  }

  collapseAll(): void {
    this.expanded.set([]);
  }

  /** A span shown: its parents opened. */
  reveal(value: string): void {
    const byValue = new Map(this.allRows().map((r) => [r.item.value, r]));
    const open = new Set(this.expanded());
    for (
      let row = byValue.get(value);
      row?.parent;
      row = byValue.get(row.parent)
    )
      open.add(row.parent);
    this.expanded.set([...open]);
  }

  select(value: string): void {
    this.value.set(value);
  }

  /** Focus on a row (by default, the Tab stop's). */
  focus(value: string | null = this.tabStop()): void {
    if (value === null) return;
    this.activeRow.set(value);
    this.elements.get(value)?.focus();
  }

  ɵregister(value: string, element: HTMLElement): () => void {
    this.elements.set(value, element);
    return () => {
      if (this.elements.get(value) === element) this.elements.delete(value);
    };
  }

  private onKeydown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    if (target.getAttribute('role') !== 'row' || event.altKey) return;
    const rows = this.rows();
    const index = rows.findIndex((r) => r.item.value === this.activeRow());
    const row = rows[index];
    if (!row) return;
    const rtl = this.directionality.value === 'rtl';
    const forward = rtl ? 'ArrowLeft' : 'ArrowRight';
    const back = rtl ? 'ArrowRight' : 'ArrowLeft';
    const go = (i: number) =>
      this.focus(
        rows[Math.min(Math.max(i, 0), rows.length - 1)]?.item.value ?? null,
      );
    switch (event.key) {
      case 'ArrowDown':
        go(index + 1);
        break;
      case 'ArrowUp':
        go(index - 1);
        break;
      case 'Home':
        go(0);
        break;
      case 'End':
        go(rows.length - 1);
        break;
      case 'PageDown':
        go(index + PAGE);
        break;
      case 'PageUp':
        go(index - PAGE);
        break;
      case forward:
        if (row.branch && !this.isExpanded(row.item.value))
          this.toggle(row.item.value, true);
        else if (row.branch) go(index + 1);
        break;
      case back:
        if (row.branch && this.isExpanded(row.item.value))
          this.toggle(row.item.value, false);
        else if (row.parent) this.focus(row.parent);
        break;
      case 'Enter':
      case ' ':
        this.select(row.item.value);
        break;
      default:
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
          this.typeahead(event.key, index);
          break;
        }
        return;
    }
    event.preventDefault();
  }

  /** The next row whose label starts with what was typed. */
  private typeahead(key: string, from: number): void {
    const now = performance.now();
    this.typed = now - this.typedAt < 500 ? this.typed + key : key;
    this.typedAt = now;
    const rows = this.rows();
    const query = this.typed.toLocaleLowerCase(this.locale);
    for (
      let step = this.typed.length > 1 ? 0 : 1;
      step <= rows.length;
      step++
    ) {
      const row = rows[(from + step) % rows.length];
      if (row.item.label.toLocaleLowerCase(this.locale).startsWith(query)) {
        this.focus(row.item.value);
        return;
      }
    }
  }
}
