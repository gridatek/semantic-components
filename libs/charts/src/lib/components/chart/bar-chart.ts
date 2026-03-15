import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { scaleBand, scaleLinear } from 'd3-scale';
import { SC_CHART } from './chart-container';
import { CHART_COLORS, ChartDataPoint } from './chart-types';

@Component({
  selector: '[scBarChart]',
  template: `
    <svg
      [attr.viewBox]="viewBox()"
      class="w-full"
      [style.height.px]="height()"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      [attr.aria-label]="ariaLabel()"
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
          aria-hidden="true"
        />
        <text
          [attr.x]="padding().left - 8"
          [attr.y]="line.y + 4"
          text-anchor="end"
          class="fill-muted-foreground text-xs"
          aria-hidden="true"
        >
          {{ line.label }}
        </text>
      }

      <!-- Bars -->
      @for (bar of bars(); track bar.label; let i = $index) {
        <g
          class="cursor-pointer transition-opacity outline-none hover:opacity-80 focus-visible:opacity-80"
          tabindex="0"
          role="graphics-symbol"
          [attr.aria-label]="bar.label + ': ' + bar.value"
          (mouseenter)="onBarHover($event, bar)"
          (mouseleave)="onBarLeave()"
          (focus)="onBarFocus($event, bar)"
          (blur)="onBarLeave()"
          (keydown)="onBarKeydown($event, i)"
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
          aria-hidden="true"
        >
          {{ bar.label }}
        </text>
      }
    </svg>

    <div
      class="bg-background pointer-events-none absolute z-50 rounded-lg border px-3 py-1.5 text-sm shadow-md"
      [class.invisible]="!hoveredBar()"
      [style.left.px]="tooltipX()"
      [style.top.px]="tooltipY()"
      [style.transform]="'translate(-50%, -100%) translateY(-8px)'"
      role="tooltip"
      aria-live="polite"
    >
      @if (hoveredBar(); as bar) {
        <div class="font-medium">{{ bar.label }}</div>
        <div class="text-muted-foreground">{{ bar.value }}</div>
      }
    </div>
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
  readonly ariaLabel = input<string>('Bar chart');

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

  private readonly xScale = computed(() => {
    const data = this.data();
    const gap = this.barGap();
    const barCount = data.length;
    const paddingInner =
      barCount > 1 ? (gap * barCount) / (this.chartWidth() + gap) : 0;

    return scaleBand()
      .domain(data.map((d) => d.label))
      .range([this.padding().left, this.padding().left + this.chartWidth()])
      .paddingInner(paddingInner)
      .paddingOuter(0);
  });

  private readonly yScale = computed(() => {
    const max = Math.max(...this.data().map((d) => d.value), 0) * 1.1;
    return scaleLinear()
      .domain([0, max])
      .range([this.padding().top + this.chartHeight(), this.padding().top]);
  });

  protected readonly gridLines = computed(() => {
    const y = this.yScale();
    return y.ticks(5).map((v) => ({
      y: y(v)!,
      label: Math.round(v).toString(),
    }));
  });

  protected readonly bars = computed(() => {
    const x = this.xScale();
    const y = this.yScale();
    const bandwidth = x.bandwidth();
    const baseline = y(0)!;

    return this.data().map((d, i) => {
      const color =
        d.color ||
        this.container?.getColor(d.label, i) ||
        CHART_COLORS[i % CHART_COLORS.length];

      return {
        ...d,
        x: x(d.label)!,
        y: y(d.value)!,
        width: bandwidth,
        height: baseline - y(d.value)!,
        color,
      };
    });
  });

  onBarHover(event: MouseEvent, bar: ChartDataPoint): void {
    const rect = (event.target as SVGElement).getBoundingClientRect();
    const parentRect = (event.target as SVGElement)
      .closest('[scBarChart]')
      ?.getBoundingClientRect();
    if (parentRect) {
      this.tooltipX.set(rect.left - parentRect.left + rect.width / 2);
      this.tooltipY.set(rect.top - parentRect.top);
    }
    this.hoveredBar.set(bar);
  }

  onBarFocus(event: FocusEvent, bar: ChartDataPoint): void {
    const el = (event.target as SVGElement).querySelector('rect');
    const parentRect = (event.target as SVGElement)
      .closest('[scBarChart]')
      ?.getBoundingClientRect();
    if (el && parentRect) {
      const rect = el.getBoundingClientRect();
      this.tooltipX.set(rect.left - parentRect.left + rect.width / 2);
      this.tooltipY.set(rect.top - parentRect.top);
    }
    this.hoveredBar.set(bar);
  }

  onBarLeave(): void {
    this.hoveredBar.set(null);
  }

  onBarKeydown(event: KeyboardEvent, index: number): void {
    const bars = this.bars();
    let nextIndex = index;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      nextIndex = (index + 1) % bars.length;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      nextIndex = (index - 1 + bars.length) % bars.length;
    } else {
      return;
    }

    const parent = (event.target as SVGElement).parentElement;
    const siblings = parent?.querySelectorAll<SVGElement>('g[tabindex]');
    siblings?.[nextIndex]?.focus();
  }
}
