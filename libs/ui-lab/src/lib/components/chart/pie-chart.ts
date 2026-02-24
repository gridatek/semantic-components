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
import { arc, pie } from 'd3-shape';
import { CHART_COLORS, ChartDataPoint } from './chart-types';
import { SC_CHART } from './chart-container';

@Component({
  selector: '[scPieChart]',
  template: `
    <svg
      [attr.viewBox]="viewBox()"
      class="w-full"
      [style.height.px]="size()"
      preserveAspectRatio="xMidYMid meet"
    >
      <g [attr.transform]="centerTransform()">
        @for (slice of slices(); track slice.label; let i = $index) {
          <path
            [attr.d]="slice.path"
            [attr.fill]="slice.color"
            class="cursor-pointer transition-opacity hover:opacity-80"
            (mouseenter)="onSliceHover($event, slice)"
            (mouseleave)="onSliceLeave()"
          />
        }

        @if (showLabels()) {
          @for (slice of slices(); track slice.label) {
            <text
              [attr.x]="slice.labelX"
              [attr.y]="slice.labelY"
              text-anchor="middle"
              class="pointer-events-none fill-background text-xs font-medium"
            >
              {{ slice.percentage }}%
            </text>
          }
        }
      </g>
    </svg>

    @if (hoveredSlice()) {
      <div
        class="pointer-events-none absolute z-50 rounded-lg border bg-background px-3 py-1.5 text-sm shadow-md"
        [style.left.px]="tooltipX()"
        [style.top.px]="tooltipY()"
        [style.transform]="'translate(-50%, -100%) translateY(-8px)'"
      >
        <div class="flex items-center gap-2">
          <div
            class="size-3 rounded-sm"
            [style.background-color]="hoveredSlice()!.color"
          ></div>
          <span class="font-medium">{{ hoveredSlice()!.label }}</span>
        </div>
        <div class="text-muted-foreground">
          {{ hoveredSlice()!.value }} ({{ hoveredSlice()!.percentage }}%)
        </div>
      </div>
    }
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

  readonly hoveredSlice = signal<
    (ChartDataPoint & { percentage: number; color: string }) | null
  >(null);
  readonly tooltipX = signal(0);
  readonly tooltipY = signal(0);

  protected readonly viewBox = computed(
    () => `0 0 ${this.size()} ${this.size()}`,
  );
  protected readonly class = computed(() => cn('', this.classInput()));

  protected readonly centerTransform = computed(
    () => `translate(${this.size() / 2},${this.size() / 2})`,
  );

  protected readonly total = computed(() =>
    this.data().reduce((sum, d) => sum + d.value, 0),
  );

  protected readonly slices = computed(() => {
    const data = this.data();
    const total = this.total();
    const outerRadius = this.size() / 2 - 10;
    const innerR = this.innerRadius();

    const pieGenerator = pie<ChartDataPoint>()
      .value((d) => d.value)
      .sortValues(null)
      .startAngle(-Math.PI / 2)
      .endAngle(-Math.PI / 2 + 2 * Math.PI);

    const arcGenerator = arc<{ startAngle: number; endAngle: number }>()
      .innerRadius(innerR)
      .outerRadius(outerRadius);

    const arcs = pieGenerator(data);

    return arcs.map((a, i) => {
      const d = a.data;
      const percentage = Math.round((d.value / total) * 100);
      const color =
        d.color ||
        this.container?.getColor(d.label, i) ||
        CHART_COLORS[i % CHART_COLORS.length];

      const path = arcGenerator({
        startAngle: a.startAngle,
        endAngle: a.endAngle,
      })!;
      const [labelX, labelY] = arcGenerator.centroid({
        startAngle: a.startAngle,
        endAngle: a.endAngle,
      });

      return {
        label: d.label,
        value: d.value,
        percentage,
        path,
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

  onSliceLeave(): void {
    this.hoveredSlice.set(null);
  }
}
