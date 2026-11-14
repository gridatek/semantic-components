import { Directionality } from '@angular/cdk/bidi';
import {
  type ConnectedOverlayPositionChange,
  type FlexibleConnectedPositionStrategyOrigin,
  Overlay,
  OverlayModule,
} from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  computed,
  contentChild,
  inject,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import {
  type ScOverlayAlign,
  type ScOverlayLogicalSide,
  type ScOverlaySide,
  buildOverlayPositionsWithFallback,
  physicalSide,
  placedSide,
} from '@semantic-components/ui';
import { cn } from 'cn';
import { ScChartState, numberOf } from './chart-state';
import type { ScChartBox } from './chart-state';
import { ScChartTooltipPortal } from './chart-tooltip-portal';
import type { ScChartTooltipPayload } from './chart-types';

/**
 * A chart's tooltip: its content (`ng-template scChartTooltipPortal`) in a CDK
 * overlay while a category is active — beside the pointer, or, with the
 * keyboard, beside the item reached; flipped and kept in the window where
 * there is no room. Recharts' place by default: right of the pointer, 10px
 * along and down. It holds the tooltip's state — `active()`, `label()`,
 * `payload()` — and says it to screen readers (a polite live region, in the
 * chart: what the tooltip shows).
 */
@Component({
  selector: 'div[scChartTooltipProvider]',
  imports: [OverlayModule, NgTemplateOutlet],
  template: `
    <ng-content />
    <div class="sr-only" role="status">{{ announcement() }}</div>

    @if (origin(); as origin) {
      <ng-template
        cdkConnectedOverlay
        [cdkConnectedOverlayOrigin]="origin"
        [cdkConnectedOverlayOpen]="active()"
        [cdkConnectedOverlayPositions]="positions()"
        [cdkConnectedOverlayPush]="true"
        [cdkConnectedOverlayScrollStrategy]="scrollStrategy"
        [cdkConnectedOverlayDisableClose]="true"
        cdkConnectedOverlayPanelClass="pointer-events-none"
        (positionChange)="onPositionChange($event)"
        (detach)="onDetach()"
      >
        <ng-container [ngTemplateOutlet]="portal().templateRef" />
      </ng-template>
    }
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScChartTooltipProvider {
  private readonly state = inject(ScChartState);
  private readonly direction = inject(Directionality);
  /** Scrolling closes it: its place was the pointer's, or the item's, then. */
  protected readonly scrollStrategy = inject(Overlay).scrollStrategies.close();

  readonly classInput = input<string>('', { alias: 'class' });
  /** Which side of the pointer (or item) it goes on; flips when there is no room. */
  readonly side = input<ScOverlayLogicalSide>('right');
  /** Along that side: `start` (Recharts': down from the pointer), `center`, `end`. */
  readonly alignment = input<ScOverlayAlign>('start');
  /** Its distance from the pointer's side, in px (Recharts' `offset`). */
  readonly sideOffset = input(10);
  /** Moved along that side, in px (Recharts' `offset`, the other way). */
  readonly alignmentOffset = input(10);

  protected readonly portal = contentChild.required(ScChartTooltipPortal);

  /** A category is pointed at or reached, and its row exists: it shows. */
  readonly active = computed(() => {
    const index = this.state.activeIndex();
    return index !== null && !!this.state.data()[index];
  });

  /**
   * The category shown: the active one — closed, the last one shown (the
   * first before any), so what you write from it always has a category.
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

  /** What screen readers hear: the tooltip's text, as it shows it. */
  readonly announcement = signal('');

  /**
   * What it goes beside, on the screen: the pointer (a point), or the item
   * the keyboard reached (its box). Measured only once a category is active
   * — in the browser, then.
   */
  protected readonly origin =
    computed<FlexibleConnectedPositionStrategyOrigin | null>(() => {
      const index = this.state.activeIndex();
      if (index === null) return null;
      const pointer = this.state.pointer();
      if (pointer) return { x: pointer.x, y: pointer.y, width: 0, height: 0 };
      const plot = this.state.plotElement();
      if (!plot) return null;
      const rect = plot.getBoundingClientRect();
      const sx = rect.width / (this.state.width() || 1);
      const sy = rect.height / (this.state.height() || 1);
      const box = this.anchor(index);
      return {
        x: rect.left + box.x * sx,
        y: rect.top + box.y * sy,
        width: box.width * sx,
        height: box.height * sy,
      };
    });

  protected readonly positions = computed(() =>
    buildOverlayPositionsWithFallback(
      physicalSide(this.side(), this.direction.valueSignal()),
      this.alignment(),
      this.sideOffset(),
      this.direction.valueSignal(),
      this.alignmentOffset(),
    ),
  );

  /** The side it was placed on, after any flip (`data-side`: physical). */
  private readonly placed = signal<ScOverlaySide | null>(null);
  readonly placedSide = computed(
    () =>
      this.placed() ?? physicalSide(this.side(), this.direction.valueSignal()),
  );

  protected readonly class = computed(() => cn('contents', this.classInput()));

  /**
   * The item's box in the plot: the series' own (a slice, a box), else the
   * category's band at its highest value (the top of its bars, its points);
   * else the plot's middle.
   */
  private anchor(index: number): ScChartBox {
    for (const series of this.state.series()) {
      const own = series.anchor?.(index);
      if (own) return own;
    }
    const { left, top, right, bottom } = this.state.area();
    if (this.state.shaped()) {
      return {
        x: (left + right) / 2,
        y: (top + bottom) / 2,
        width: 0,
        height: 0,
      };
    }
    const categories = this.state.categoryScale();
    const values = this.state.valueScale();
    const vertical = this.state.vertical();
    const start = categories(index) ?? 0;
    const band = 'bandwidth' in categories ? categories.bandwidth() : 0;
    // The end furthest out: the highest value on screen (the top of a column,
    // the right of a bar across).
    let end: number | null = null;
    for (const extent of this.state.extents().values()) {
      const pair = extent[index];
      if (!pair) continue;
      const at = values(Math.max(pair[0], pair[1]));
      end =
        end === null ? at : vertical ? Math.max(end, at) : Math.min(end, at);
    }
    const reach = end ?? (vertical ? left : bottom);
    return vertical
      ? { x: reach, y: start, width: 0, height: band }
      : { x: start, y: reach, width: band, height: 0 };
  }

  protected onPositionChange(change: ConnectedOverlayPositionChange): void {
    this.placed.set(placedSide(change, this.direction.valueSignal()));
  }

  /** Closed by a scroll: nothing is pointed at any more. */
  protected onDetach(): void {
    if (this.active()) this.state.activeIndex.set(null);
    this.announcement.set('');
  }
}
