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
  selector: '[sc-bar-chart]',
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

      <!-- Bars -->
      @for (bar of bars(); track bar.label; let i = $index) {
        <g
          class="cursor-pointer transition-opacity hover:opacity-80"
          (mouseenter)="onBarHover($event, bar, i)"
          (mouseleave)="onBarLeave()"
        >
          <rect
            [attr.x]="bar.x"
            [attr.y]="bar.y"
            [attr.width]="bar.width"
            [attr.height]="bar.height"
            [attr.fill]="bar.color"
            [attr.rx]="barRadius()"
          />
        </g>
      }

      <!-- X-axis labels -->
      @for (bar of bars(); track bar.label) {
        <text
          [attr.x]="bar.x + bar.width / 2"
          [attr.y]="chartHeight() + padding().top + 16"
          text-anchor="middle"
          class="fill-muted-foreground text-xs"
        >
          {{ bar.label }}
        </text>
      }
    </svg>

    @if (hoveredBar()) {
      <div
        class="pointer-events-none absolute z-50 rounded-lg border bg-background px-3 py-1.5 text-sm shadow-md"
        [style.left.px]="tooltipX()"
        [style.top.px]="tooltipY()"
        [style.transform]="'translate(-50%, -100%) translateY(-8px)'"
      >
        <div class="font-medium">{{ hoveredBar()!.label }}</div>
        <div class="text-muted-foreground">{{ hoveredBar()!.value }}</div>
      </div>
    }
  `,
  host: {
    'data-slot': 'bar-chart',
    '[class]': 'class()',
    class: 'relative block',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScBarChart {
  private readonly container = inject(SC_CHART, { optional: true });

  readonly classInput = input<string>('', { alias: 'class' });
  readonly data = input<ChartDataPoint[]>([]);
  readonly height = input<number>(300);
  readonly barRadius = input<number>(4);
  readonly barGap = input<number>(8);

  readonly hoveredBar = signal<ChartDataPoint | null>(null);
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

  protected readonly maxValue = computed(() => {
    const values = this.data().map((d) => d.value);
    return Math.max(...values, 0) * 1.1; // Add 10% padding
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

  protected readonly bars = computed(() => {
    const data = this.data();
    const barCount = data.length;
    const totalGaps = (barCount - 1) * this.barGap();
    const barWidth = (this.chartWidth() - totalGaps) / barCount;
    const max = this.maxValue();

    return data.map((d, i) => {
      const barHeight = (d.value / max) * this.chartHeight();
      const color =
        d.color ||
        this.container?.getColor(d.label, i) ||
        CHART_COLORS[i % CHART_COLORS.length];

      return {
        ...d,
        x: this.padding().left + i * (barWidth + this.barGap()),
        y: this.padding().top + this.chartHeight() - barHeight,
        width: barWidth,
        height: barHeight,
        color,
      };
    });
  });

  onBarHover(event: MouseEvent, bar: ChartDataPoint, _index: number): void {
    const rect = (event.target as SVGElement).getBoundingClientRect();
    const parentRect = (event.target as SVGElement)
      .closest('[sc-bar-chart]')
      ?.getBoundingClientRect();
    if (parentRect) {
      this.tooltipX.set(rect.left - parentRect.left + rect.width / 2);
      this.tooltipY.set(rect.top - parentRect.top);
    }
    this.hoveredBar.set(bar);
  }

  onBarLeave(): void {
    this.hoveredBar.set(null);
  }
}
