import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { scaleLinear, scalePoint } from 'd3-scale';
import { area, line } from 'd3-shape';
import { CHART_COLORS, ChartDataPoint } from './chart-types';
import { SC_CHART } from './chart-container';

@Component({
  selector: '[scLineChart]',
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

  private readonly xScale = computed(() =>
    scalePoint<string>()
      .domain(this.data().map((d) => d.label))
      .range([this.padding().left, this.padding().left + this.chartWidth()]),
  );

  private readonly yScale = computed(() =>
    scaleLinear()
      .domain([0, this.maxValue()])
      .range([this.padding().top + this.chartHeight(), this.padding().top]),
  );

  protected readonly gridLines = computed(() => {
    const y = this.yScale();
    const ticks = y.ticks(5);

    return ticks.map((value) => ({
      y: y(value),
      label: Math.round(value).toString(),
    }));
  });

  protected readonly points = computed(() => {
    const data = this.data();
    const x = this.xScale();
    const y = this.yScale();

    return data.map((d) => ({
      ...d,
      x: x(d.label)!,
      y: y(d.value),
    }));
  });

  protected readonly linePath = computed(() => {
    const data = this.data();
    if (data.length === 0) return '';

    const x = this.xScale();
    const y = this.yScale();

    const generator = line<ChartDataPoint>()
      .x((d) => x(d.label)!)
      .y((d) => y(d.value));

    return generator(data) ?? '';
  });

  protected readonly areaPath = computed(() => {
    const data = this.data();
    if (data.length === 0) return '';

    const x = this.xScale();
    const y = this.yScale();
    const baseline = this.padding().top + this.chartHeight();

    const generator = area<ChartDataPoint>()
      .x((d) => x(d.label)!)
      .y0(baseline)
      .y1((d) => y(d.value));

    return generator(data) ?? '';
  });

  onPointHover(event: MouseEvent, point: ChartDataPoint): void {
    const circle = event.target as SVGElement;
    const parentRect = circle.closest('[scLineChart]')?.getBoundingClientRect();
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
