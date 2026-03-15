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
import { PieArcDatum, arc, pie } from 'd3-shape';
import { SC_CHART } from './chart-container';
import { CHART_COLORS, ChartDataPoint } from './chart-types';

@Component({
  selector: '[scPieChart]',
  template: `
    <svg
      [attr.viewBox]="viewBox()"
      class="w-full"
      [style.height.px]="size()"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      [attr.aria-label]="ariaLabel()"
    >
      <g [attr.transform]="centerTransform()">
        @for (slice of slices(); track slice.label; let i = $index) {
          <path
            [attr.d]="slice.path"
            [attr.fill]="slice.color"
            class="cursor-pointer transition-opacity outline-none hover:opacity-80 focus-visible:opacity-80"
            tabindex="0"
            role="graphics-symbol"
            [attr.aria-label]="
              slice.label + ': ' + slice.value + ' (' + slice.percentage + '%)'
            "
            (mouseenter)="onSliceHover($event, slice)"
            (mouseleave)="onSliceLeave()"
            (focus)="onSliceFocus($event, slice)"
            (blur)="onSliceLeave()"
            (keydown)="onSliceKeydown($event, i)"
          />
        }

        @if (showLabels()) {
          @for (slice of slices(); track slice.label) {
            <text
              [attr.x]="slice.labelX"
              [attr.y]="slice.labelY"
              text-anchor="middle"
              class="fill-background pointer-events-none text-xs font-medium"
              aria-hidden="true"
            >
              {{ slice.percentage }}%
            </text>
          }
        }
      </g>
    </svg>

    <div
      class="bg-background pointer-events-none absolute z-50 rounded-lg border px-3 py-1.5 text-sm shadow-md"
      [class.invisible]="!hoveredSlice()"
      [style.left.px]="tooltipX()"
      [style.top.px]="tooltipY()"
      [style.transform]="'translate(-50%, -100%) translateY(-8px)'"
      role="tooltip"
      aria-live="polite"
    >
      @if (hoveredSlice(); as slice) {
        <div class="flex items-center gap-2">
          <div
            class="size-3 rounded-sm"
            [style.background-color]="slice.color"
          ></div>
          <span class="font-medium">{{ slice.label }}</span>
        </div>
        <div class="text-muted-foreground">
          {{ slice.value }} ({{ slice.percentage }}%)
        </div>
      }
    </div>
  `,
  host: {
    'data-slot': 'pie-chart',
    '[class]': 'class()',
    class: 'relative block',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPieChart {
  private readonly container = inject(SC_CHART, { optional: true });

  readonly classInput = input<string>('', { alias: 'class' });
  readonly data = input<ChartDataPoint[]>([]);
  readonly size = input<number>(300);
  readonly innerRadius = input<number>(0); // 0 for pie, >0 for donut
  readonly showLabels = input<boolean>(true);
  readonly ariaLabel = input<string>('Pie chart');

  readonly hoveredSlice = signal<
    (ChartDataPoint & { percentage: number; color: string }) | null
  >(null);
  readonly tooltipX = signal(0);
  readonly tooltipY = signal(0);

  protected readonly viewBox = computed(
    () => `0 0 ${this.size()} ${this.size()}`,
  );
  protected readonly class = computed(() => cn('', this.classInput()));

  protected readonly total = computed(() =>
    this.data().reduce((sum, d) => sum + d.value, 0),
  );

  protected readonly centerTransform = computed(
    () => `translate(${this.size() / 2},${this.size() / 2})`,
  );

  protected readonly slices = computed(() => {
    const data = this.data();
    const total = this.total();
    const outerRadius = this.size() / 2 - 10;
    const innerR = this.innerRadius();

    const pieGen = pie<ChartDataPoint>()
      .sort(null)
      .value((d) => d.value);

    const arcGen = arc<PieArcDatum<ChartDataPoint>>()
      .outerRadius(outerRadius)
      .innerRadius(innerR);

    const arcs = pieGen(data);

    return arcs.map((a, i) => {
      const d = a.data;
      const percentage = Math.round((d.value / total) * 100);
      const color =
        d.color ||
        this.container?.getColor(d.label, i) ||
        CHART_COLORS[i % CHART_COLORS.length];

      // For full pies (no inner radius), push label outward to match prior 0.6 ratio
      const labelArc =
        innerR > 0
          ? arcGen
          : arc<PieArcDatum<ChartDataPoint>>()
              .outerRadius(outerRadius)
              .innerRadius(outerRadius * 0.2);

      const [labelX, labelY] = labelArc.centroid(a);

      return {
        label: d.label,
        value: d.value,
        percentage,
        path: arcGen(a)!,
        color,
        labelX,
        labelY,
      };
    });
  });

  onSliceHover(
    event: MouseEvent,
    slice: { label: string; value: number; percentage: number; color: string },
  ): void {
    const path = event.target as SVGElement;
    const parentRect = path.closest('[scPieChart]')?.getBoundingClientRect();
    if (parentRect) {
      const pathRect = path.getBoundingClientRect();
      this.tooltipX.set(pathRect.left - parentRect.left + pathRect.width / 2);
      this.tooltipY.set(pathRect.top - parentRect.top);
    }
    this.hoveredSlice.set(slice);
  }

  onSliceFocus(
    event: FocusEvent,
    slice: { label: string; value: number; percentage: number; color: string },
  ): void {
    const path = event.target as SVGElement;
    const parentRect = path.closest('[scPieChart]')?.getBoundingClientRect();
    if (parentRect) {
      const pathRect = path.getBoundingClientRect();
      this.tooltipX.set(pathRect.left - parentRect.left + pathRect.width / 2);
      this.tooltipY.set(pathRect.top - parentRect.top);
    }
    this.hoveredSlice.set(slice);
  }

  onSliceLeave(): void {
    this.hoveredSlice.set(null);
  }

  onSliceKeydown(event: KeyboardEvent, index: number): void {
    const slices = this.slices();
    let nextIndex = index;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      nextIndex = (index + 1) % slices.length;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      nextIndex = (index - 1 + slices.length) % slices.length;
    } else {
      return;
    }

    const g = (event.target as SVGElement).parentElement;
    const paths = g?.querySelectorAll<SVGElement>('path[tabindex]');
    paths?.[nextIndex]?.focus();
  }
}
