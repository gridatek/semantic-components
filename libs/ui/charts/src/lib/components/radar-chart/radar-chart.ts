import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import {
  type ScChartAnimationEasing,
  type ScChartAnimationMatchBy,
  type ScChartMatchable,
  scChartInterpolate as between,
  scChartEntrance,
  scChartTransition,
} from '../chart/chart-animation';
import { ScChartState } from '../chart/chart-state';

/**
 * A series as a radar: a polygon through its values, one on each category's
 * spoke, filled in `--color-<key>` — or only its outline (`fillOpacity` 0,
 * `stroke`).
 */
@Component({
  selector: 'g[scChartRadar]',
  template: `
    <svg:path
      [attr.d]="path()"
      [attr.fill]="color()"
      [attr.fill-opacity]="fillOpacity()"
      [attr.stroke]="stroke() ? color() : 'none'"
      stroke-width="2"
    />
    @if (dots()) {
      @for (p of points(); track $index) {
        <svg:circle
          [attr.cx]="p.x"
          [attr.cy]="p.y"
          r="3"
          [attr.fill]="color()"
        />
      }
    }
    @if (activePoint(); as p) {
      <svg:circle
        class="stroke-background"
        [attr.cx]="p.x"
        [attr.cy]="p.y"
        r="4"
        stroke-width="2"
        [attr.fill]="color()"
      />
    }
  `,
  host: {
    'data-slot': 'chart-radar',
    '[attr.data-key]': 'key()',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScChartRadar {
  private readonly state = inject(ScChartState);

  readonly classInput = input<string>('', { alias: 'class' });
  /** The series' key in the rows. */
  readonly key = input.required<string>();
  readonly fillOpacity = input(0.6);
  /** Its outline. */
  readonly stroke = input(false, { transform: booleanAttribute });
  /** A dot at each value. */
  readonly dots = input(false, { transform: booleanAttribute });
  /** A dot on the spoke pointed at. */
  readonly activeDot = input(true, { transform: booleanAttribute });
  /**
   * Its points move out from the center when it appears, and to their new
   * places when its data changes (Recharts'); not with reduced motion.
   */
  readonly isAnimationActive = input(true);
  /** The wait before they move, in ms. */
  readonly animationBegin = input(0);
  /** How long they move, in ms. */
  readonly animationDuration = input(1500);
  readonly animationEasing = input<ScChartAnimationEasing>('ease');
  /** How its points before and after a change are paired (Recharts'): by position, stretched. */
  readonly animationMatchBy = input<ScChartAnimationMatchBy>('index');

  /** Its entrance: 0 to 1 once, after its first render. */
  private readonly entrance = scChartEntrance({
    begin: this.animationBegin,
    duration: this.animationDuration,
    easing: this.animationEasing,
  });

  protected readonly color = computed(() => `var(--color-${this.key()})`);

  /** Its points where they belong now. */
  private readonly targets = computed<
    (ScChartMatchable & { x: number; y: number })[]
  >(() => {
    const share = this.state.share();
    const { radius } = this.state.circle();
    const rows = this.state.data();
    const matchBy = this.animationMatchBy();
    return (this.state.extents().get(this.key()) ?? []).map(([, value], i) => ({
      ...this.state.point(this.state.spokeAngle(i), radius * share(value)),
      id: typeof matchBy === 'function' ? matchBy(rows[i], i) : null,
    }));
  });

  /**
   * Its points moving to their new places when they change (Recharts'):
   * matched ones from where they were, new ones from the center.
   */
  private readonly moving = scChartTransition({
    items: this.targets,
    active: this.isAnimationActive,
    matchBy: this.animationMatchBy,
    begin: this.animationBegin,
    duration: this.animationDuration,
    easing: this.animationEasing,
    interpolate: (items, time) => {
      const { cx, cy } = this.state.circle();
      return items.flatMap((item) => {
        if (item.status === 'removed') return [];
        const from = item.status === 'matched' ? item.prev : { x: cx, y: cy };
        return [
          {
            ...item.next,
            x: between(from.x, item.next.x, time),
            y: between(from.y, item.next.y, time),
          },
        ];
      });
    },
  });

  /** What is drawn: its points, moving, and moving out from the center as it appears. */
  protected readonly points = computed(() => {
    const out = this.isAnimationActive() ? this.entrance() : 1;
    const { cx, cy } = this.state.circle();
    return this.moving.items().map((p) => ({
      x: between(cx, p.x, out),
      y: between(cy, p.y, out),
    }));
  });

  protected readonly path = computed(() => {
    const points = this.points();
    return points.length
      ? `M${points.map((p) => `${p.x},${p.y}`).join('L')}Z`
      : '';
  });

  protected readonly activePoint = computed(() => {
    const index = this.state.activeIndex();
    return this.activeDot() && index !== null ? this.points()[index] : null;
  });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    const unregister = this.state.register({
      key: this.key,
      kind: 'radar',
      stack: computed(() => null),
      // The keyboard's item: its point on the spoke.
      anchor: (index) => {
        const p = this.points()[index];
        return p ? { x: p.x, y: p.y, width: 0, height: 0 } : null;
      },
    });
    inject(DestroyRef).onDestroy(unregister);
  }
}
