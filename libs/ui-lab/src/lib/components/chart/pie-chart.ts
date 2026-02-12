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
  selector: '[sc-pie-chart]',
  template: `
    <svg
      [attr.viewBox]="viewBox()"
      class="w-full"
      [style.height.px]="size()"
      preserveAspectRatio="xMidYMid meet"
    >
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

  protected readonly total = computed(() =>
    this.data().reduce((sum, d) => sum + d.value, 0),
  );

  protected readonly slices = computed(() => {
    const data = this.data();
    const total = this.total();
    const centerX = this.size() / 2;
    const centerY = this.size() / 2;
    const outerRadius = this.size() / 2 - 10;
    const innerR = this.innerRadius();

    let startAngle = -Math.PI / 2;
    const slices: {
      label: string;
      value: number;
      percentage: number;
      path: string;
      color: string;
      labelX: number;
      labelY: number;
    }[] = [];

    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      const percentage = Math.round((d.value / total) * 100);
      const angle = (d.value / total) * 2 * Math.PI;
      const endAngle = startAngle + angle;

      const x1 = centerX + outerRadius * Math.cos(startAngle);
      const y1 = centerY + outerRadius * Math.sin(startAngle);
      const x2 = centerX + outerRadius * Math.cos(endAngle);
      const y2 = centerY + outerRadius * Math.sin(endAngle);

      const largeArc = angle > Math.PI ? 1 : 0;
      const color =
        d.color ||
        this.container?.getColor(d.label, i) ||
        CHART_COLORS[i % CHART_COLORS.length];

      let path: string;
      if (innerR > 0) {
        const ix1 = centerX + innerR * Math.cos(startAngle);
        const iy1 = centerY + innerR * Math.sin(startAngle);
        const ix2 = centerX + innerR * Math.cos(endAngle);
        const iy2 = centerY + innerR * Math.sin(endAngle);

        path = `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${innerR} ${innerR} 0 ${largeArc} 0 ${ix1} ${iy1} Z`;
      } else {
        path = `M ${centerX} ${centerY} L ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
      }

      const labelAngle = startAngle + angle / 2;
      const labelRadius =
        innerR > 0 ? (outerRadius + innerR) / 2 : outerRadius * 0.6;
      const labelX = centerX + labelRadius * Math.cos(labelAngle);
      const labelY = centerY + labelRadius * Math.sin(labelAngle);

      slices.push({
        label: d.label,
        value: d.value,
        percentage,
        path,
        color,
        labelX,
        labelY,
      });

      startAngle = endAngle;
    }

    return slices;
  });

  onSliceHover(
    event: MouseEvent,
    slice: { label: string; value: number; percentage: number; color: string },
  ): void {
    const path = event.target as SVGElement;
    const parentRect = path.closest('[sc-pie-chart]')?.getBoundingClientRect();
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
