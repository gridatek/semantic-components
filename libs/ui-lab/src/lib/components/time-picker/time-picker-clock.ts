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
import { SC_TIME_PICKER } from './time-picker';

// ============================================================================
// TimePickerClock (visual clock selector)
// ============================================================================
@Component({
  selector: '[sc-time-picker-clock]',
  template: `
    <div class="relative">
      <svg viewBox="0 0 200 200" class="size-48">
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
              [class.fill-primary]="isSelected(marker.value)"
              [class.text-primary-foreground]="isSelected(marker.value)"
              [class.fill-accent]="
                hoveredValue() === marker.value && !isSelected(marker.value)
              "
              [class.fill-transparent]="
                hoveredValue() !== marker.value && !isSelected(marker.value)
              "
              class="transition-colors"
            />
            <text
              [attr.x]="marker.x"
              [attr.y]="marker.y"
              text-anchor="middle"
              dominant-baseline="central"
              class="text-sm select-none"
              [class.fill-primary-foreground]="isSelected(marker.value)"
              [class.fill-foreground]="!isSelected(marker.value)"
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

  readonly hoveredValue = signal<number | null>(null);

  protected readonly class = computed(() =>
    cn('inline-block', this.classInput()),
  );

  protected readonly markers = computed(() => {
    const isHours = this.mode() === 'hours';
    const count = isHours ? 12 : 12; // Show 12 markers for both
    const step = isHours ? 1 : 5;
    const radius = 70;

    const markers: { value: number; label: string; x: number; y: number }[] =
      [];

    for (let i = 0; i < count; i++) {
      const value = isHours ? (i === 0 ? 12 : i) : i * step;
      const angle = (i * 30 - 90) * (Math.PI / 180);
      const x = 100 + radius * Math.cos(angle);
      const y = 100 + radius * Math.sin(angle);

      markers.push({
        value: isHours ? (i === 0 ? 12 : i) : i * step,
        label: value.toString().padStart(2, '0'),
        x,
        y,
      });
    }

    return markers;
  });

  protected readonly selectedAngle = computed(() => {
    const val = this.timePicker.value();
    if (!val) return null;

    const isHours = this.mode() === 'hours';
    if (isHours) {
      const hours =
        this.timePicker.format() === '12h'
          ? val.hours % 12 || 12
          : val.hours % 12;
      return (hours * 30 - 90) * (Math.PI / 180);
    } else {
      return (val.minutes * 6 - 90) * (Math.PI / 180);
    }
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

  isSelected(value: number): boolean {
    const val = this.timePicker.value();
    if (!val) return false;

    const isHours = this.mode() === 'hours';
    if (isHours) {
      const hours =
        this.timePicker.format() === '12h'
          ? val.hours % 12 || 12
          : val.hours % 12;
      return hours === value || (value === 12 && hours === 0);
    } else {
      return val.minutes === value;
    }
  }

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
}
