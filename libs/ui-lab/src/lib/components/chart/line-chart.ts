import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { CHART_COLORS, ChartDataPoint } from './chart-types';
import { SC_CHART } from './chart-container';

@Component({
  selector: '[sc-line-chart]',
  template: `
    <svg
      [attr.viewBox]="viewBox()"
      class="w-full"
      [style.height.px]="height()"
      preserveAspectRatio="xMidYMid meet"
    >
      <!-- Grid lines -->
      @for (line of gridLines(); track line) {
        <line
          [attr.x1]="padding().left"
          [attr.y1]="line.y"
          [attr.x2]="chartWidth() + padding().left"
          [attr.y2]="line.y"
          stroke="currentColor"
          class="text-border"
          stroke-dasharray="4 4"
        />
        <text
          [attr.x]="padding().left - 8"
          [attr.y]="line.y + 4"
          text-anchor="end"
          class="fill-muted-foreground text-xs"
        >
          {{ line.label }}
        </text>
      }

      <!-- Area fill -->
      @if (showArea()) {
        <path
          [attr.d]="areaPath()"
          [attr.fill]="areaColor()"
          class="opacity-20"
        />
      }

      <!-- Line -->
      <path
        [attr.d]="linePath()"
        fill="none"
        [attr.stroke]="lineColor()"
        stroke-width="2"
        stroke-linecap="round"
      />

      <!-- Points -->
      @if (showPoints()) {
        @for (point of points(); track point.label; let i = $index) {
          <circle
            [attr.cx]="point.x"
            [attr.cy]="point.y"
            r="4"
            [attr.fill]="lineColor()"
            class="cursor-pointer transition-all hover:r-6"
            (mouseenter)="onPointHover($event, point)"
            (mouseleave)="onPointLeave()"
          />
        }
      }

      <!-- X-axis labels -->
      @for (point of points(); track point.label; let i = $index) {
        @if (i % labelStep() === 0) {
          <text
            [attr.x]="point.x"
            [attr.y]="chartHeight() + padding().top + 16"
            text-anchor="middle"
            class="fill-muted-foreground text-xs"
          >
            {{ point.label }}
          </text>
        }
      }
    </svg>

    @if (hoveredPoint()) {
      <div
        class="pointer-events-none absolute z-50 rounded-lg border bg-background px-3 py-1.5 text-sm shadow-md"
        [style.left.px]="tooltipX()"
        [style.top.px]="tooltipY()"
        [style.transform]="'translate(-50%, -100%) translateY(-8px)'"
      >
        <div class="font-medium">{{ hoveredPoint()!.label }}</div>
        <div class="text-muted-foreground">{{ hoveredPoint()!.value }}</div>
      </div>
    }
  `,
  host: {
    'data-slot': 'line-chart',
    '[class]': 'class()',
    class: 'relative block',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScLineChart {
  private readonly container = inject(SC_CHART, { optional: true });

  readonly classInput = input<string>('', { alias: 'class' });
  readonly data = input<ChartDataPoint[]>([]);
  readonly height = input<number>(300);
  readonly showArea = input<boolean>(false);
  readonly showPoints = input<boolean>(true);
  readonly color = input<string>('');
  readonly labelStep = input<number>(1);

  readonly hoveredPoint = signal<ChartDataPoint | null>(null);
  readonly tooltipX = signal(0);
  readonly tooltipY = signal(0);

  protected readonly padding = computed(() => ({
    top: 20,
    right: 20,
    bottom: 30,
    left: 50,
  }));
  protected readonly chartWidth = computed(
    () => 400 - this.padding().left - this.padding().right,
  );
  protected readonly chartHeight = computed(
    () => this.height() - this.padding().top - this.padding().bottom,
  );
  protected readonly viewBox = computed(() => `0 0 400 ${this.height()}`);

  protected readonly class = computed(() => cn('', this.classInput()));

  protected readonly lineColor = computed(
    () =>
      this.color() || this.container?.getColor('line', 0) || CHART_COLORS[0],
  );
  protected readonly areaColor = computed(() => this.lineColor());

  protected readonly maxValue = computed(() => {
    const values = this.data().map((d) => d.value);
    return Math.max(...values, 0) * 1.1;
  });

  protected readonly gridLines = computed(() => {
    const max = this.maxValue();
    const lines: { y: number; label: string }[] = [];
    const steps = 5;

    for (let i = 0; i <= steps; i++) {
      const value = (max / steps) * i;
      const y =
        this.padding().top +
        this.chartHeight() -
        (value / max) * this.chartHeight();
      lines.push({ y, label: Math.round(value).toString() });
    }

    return lines;
  });

  protected readonly points = computed(() => {
    const data = this.data();
    const max = this.maxValue();
    const stepX = this.chartWidth() / Math.max(data.length - 1, 1);

    return data.map((d, i) => ({
      ...d,
      x: this.padding().left + i * stepX,
      y:
        this.padding().top +
        this.chartHeight() -
        (d.value / max) * this.chartHeight(),
    }));
  });

  protected readonly linePath = computed(() => {
    const pts = this.points();
    if (pts.length === 0) return '';

    return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  });

  protected readonly areaPath = computed(() => {
    const pts = this.points();
    if (pts.length === 0) return '';

    const baseline = this.padding().top + this.chartHeight();
    const linePart = pts
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
      .join(' ');

    return `${linePart} L ${pts[pts.length - 1].x} ${baseline} L ${pts[0].x} ${baseline} Z`;
  });

  onPointHover(event: MouseEvent, point: ChartDataPoint): void {
    const circle = event.target as SVGElement;
    const parentRect = circle
      .closest('[sc-line-chart]')
      ?.getBoundingClientRect();
    const circleRect = circle.getBoundingClientRect();
    if (parentRect) {
      this.tooltipX.set(
        circleRect.left - parentRect.left + circleRect.width / 2,
      );
      this.tooltipY.set(circleRect.top - parentRect.top);
    }
    this.hoveredPoint.set(point);
  }

  onPointLeave(): void {
    this.hoveredPoint.set(null);
  }
}
