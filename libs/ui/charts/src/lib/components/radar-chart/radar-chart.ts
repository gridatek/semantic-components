import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
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

  protected readonly color = computed(() => `var(--color-${this.key()})`);

  protected readonly points = computed(() => {
    const share = this.state.share();
    const { radius } = this.state.circle();
    return (this.state.extents().get(this.key()) ?? []).map(([, value], i) =>
      this.state.point(this.state.spokeAngle(i), radius * share(value)),
    );
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
    });
    inject(DestroyRef).onDestroy(unregister);
  }
}
