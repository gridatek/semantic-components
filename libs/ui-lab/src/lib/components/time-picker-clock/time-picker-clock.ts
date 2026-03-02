import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_TIME_PICKER } from '@semantic-components/ui';

@Component({
  selector: '[scTimePickerClock]',
  template: `
    <div class="relative">
      <svg
        #clockSvg
        viewBox="0 0 200 200"
        class="size-48"
        [class.cursor-grab]="!isDragging()"
        [class.cursor-grabbing]="isDragging()"
        (mousedown)="onPointerDown($event)"
        (mousemove)="onPointerMove($event)"
        (mouseup)="onPointerUp()"
        (mouseleave)="onPointerUp()"
        (touchstart)="onTouchStart($event)"
        (touchmove)="onTouchMove($event)"
        (touchend)="onPointerUp()"
      >
        <!-- Clock face -->
        <circle
          cx="100"
          cy="100"
          r="95"
          fill="none"
          stroke="currentColor"
          class="text-border"
          stroke-width="2"
        />

        <!-- Hour markers -->
        @for (marker of markers(); track marker.value) {
          <g
            class="cursor-pointer"
            (click)="selectValue(marker.value)"
            (mouseenter)="hoveredValue.set(marker.value)"
            (mouseleave)="hoveredValue.set(null)"
          >
            <circle
              [attr.cx]="marker.x"
              [attr.cy]="marker.y"
              r="14"
              [class.fill-primary]="selectedValue() === marker.value"
              [class.text-primary-foreground]="selectedValue() === marker.value"
              [class.fill-accent]="
                hoveredValue() === marker.value &&
                selectedValue() !== marker.value
              "
              [class.fill-transparent]="
                hoveredValue() !== marker.value &&
                selectedValue() !== marker.value
              "
              class="transition-colors"
            />
            <text
              [attr.x]="marker.x"
              [attr.y]="marker.y"
              text-anchor="middle"
              dominant-baseline="central"
              class="text-sm select-none"
              [class.fill-primary-foreground]="selectedValue() === marker.value"
              [class.fill-foreground]="selectedValue() !== marker.value"
            >
              {{ marker.label }}
            </text>
          </g>
        }

        <!-- Clock hand -->
        @if (selectedAngle() !== null) {
          <line
            x1="100"
            y1="100"
            [attr.x2]="handX()"
            [attr.y2]="handY()"
            stroke="currentColor"
            class="text-primary"
            stroke-width="2"
          />
          <circle
            cx="100"
            cy="100"
            r="4"
            fill="currentColor"
            class="text-primary"
          />
        }
      </svg>
    </div>
  `,
  host: {
    'data-slot': 'time-picker-clock',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScTimePickerClock {
  readonly timePicker = inject(SC_TIME_PICKER);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly mode = input<'hours' | 'minutes'>('hours');
  readonly valueSelected = output<number>();

  readonly hoveredValue = signal<number | null>(null);
  readonly isDragging = signal(false);

  private readonly clockSvg =
    viewChild.required<ElementRef<SVGSVGElement>>('clockSvg');

  protected readonly class = computed(() =>
    cn('inline-block', this.classInput()),
  );

  protected readonly markers = computed(() => {
    const isHours = this.mode() === 'hours';
    const step = isHours ? 1 : 5;
    const radius = 70;

    const markers: { value: number; label: string; x: number; y: number }[] =
      [];

    for (let i = 0; i < 12; i++) {
      const value = isHours ? (i === 0 ? 12 : i) : i * step;
      const angle = (i * 30 - 90) * (Math.PI / 180);
      const x = 100 + radius * Math.cos(angle);
      const y = 100 + radius * Math.sin(angle);

      markers.push({
        value,
        label: value.toString().padStart(2, '0'),
        x,
        y,
      });
    }

    return markers;
  });

  protected readonly selectedValue = computed(() => {
    const val = this.timePicker.value();
    if (!val) return null;

    if (this.mode() === 'hours') {
      const hours =
        this.timePicker.format() === '12h'
          ? val.hours % 12 || 12
          : val.hours % 12;
      return hours;
    }

    return val.minutes;
  });

  protected readonly selectedAngle = computed(() => {
    const val = this.timePicker.value();
    if (!val) return null;

    if (this.mode() === 'hours') {
      const hours =
        this.timePicker.format() === '12h'
          ? val.hours % 12 || 12
          : val.hours % 12;
      return (hours * 30 - 90) * (Math.PI / 180);
    }

    return (val.minutes * 6 - 90) * (Math.PI / 180);
  });

  protected readonly handX = computed(() => {
    const angle = this.selectedAngle();
    if (angle === null) return 100;
    return 100 + 55 * Math.cos(angle);
  });

  protected readonly handY = computed(() => {
    const angle = this.selectedAngle();
    if (angle === null) return 100;
    return 100 + 55 * Math.sin(angle);
  });

  selectValue(value: number): void {
    if (this.mode() === 'hours') {
      const val = this.timePicker.value();
      let hours = value;
      if (this.timePicker.format() === '12h') {
        if (val?.period === 'PM' && value !== 12) {
          hours = value + 12;
        } else if (val?.period === 'AM' && value === 12) {
          hours = 0;
        }
      }
      this.timePicker.setHours(hours);
    } else {
      this.timePicker.setMinutes(value);
    }
  }

  protected onPointerDown(event: MouseEvent): void {
    this.isDragging.set(true);
    this.selectValueFromPosition(event.clientX, event.clientY);
  }

  protected onPointerMove(event: MouseEvent): void {
    if (!this.isDragging()) return;
    this.selectValueFromPosition(event.clientX, event.clientY);
  }

  protected onPointerUp(): void {
    if (this.isDragging()) {
      this.isDragging.set(false);
      this.emitValueSelected();
    }
  }

  protected onTouchStart(event: TouchEvent): void {
    event.preventDefault();
    this.isDragging.set(true);
    const touch = event.touches[0];
    this.selectValueFromPosition(touch.clientX, touch.clientY);
  }

  protected onTouchMove(event: TouchEvent): void {
    if (!this.isDragging()) return;
    event.preventDefault();
    const touch = event.touches[0];
    this.selectValueFromPosition(touch.clientX, touch.clientY);
  }

  private selectValueFromPosition(clientX: number, clientY: number): void {
    const svg = this.clockSvg().nativeElement;
    const rect = svg.getBoundingClientRect();

    // Convert client coordinates to SVG viewBox coordinates (0-200)
    const svgX = ((clientX - rect.left) / rect.width) * 200;
    const svgY = ((clientY - rect.top) / rect.height) * 200;

    // Calculate angle from center (100, 100), with 12 o'clock as 0°
    const dx = svgX - 100;
    const dy = svgY - 100;
    let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;

    if (this.mode() === 'hours') {
      // 12 sectors of 30° each
      let sector = Math.round(angle / 30) % 12;
      const value =
        this.timePicker.format() === '12h'
          ? sector === 0
            ? 12
            : sector
          : sector;
      this.selectValue(value);
    } else {
      // Snap to nearest 5-minute mark (12 sectors of 30° each)
      const minute = (Math.round(angle / 30) % 12) * 5;
      this.selectValue(minute);
    }
  }

  private emitValueSelected(): void {
    const val = this.selectedValue();
    if (val !== null) {
      this.valueSelected.emit(val);
    }
  }
}
