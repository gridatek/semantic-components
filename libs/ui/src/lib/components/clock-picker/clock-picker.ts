import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  computed,
  inject,
  input,
  model,
  signal,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

import { ScClockPickerPeriodButton } from './clock-picker-period-button';

export interface TimeValue {
  hours: number;
  minutes: number;
  period?: 'AM' | 'PM';
}

@Component({
  selector: 'div[sc-clock-picker]',
  imports: [CommonModule, ScClockPickerPeriodButton],
  template: `
    <div class="sc-clock-picker" [class]="rootClass()">
      <!-- Time Display -->
      <div class="sc-clock-picker-display">
        <div class="sc-clock-picker-time">
          <button
            class="sc-clock-picker-time-part"
            [class.active]="mode() === 'hours'"
            [attr.aria-label]="'Select hours, currently ' + formattedHours()"
            [attr.aria-selected]="mode() === 'hours'"
            (click)="setMode('hours')"
            (keydown)="handleTimePartKeydown($event, 'hours')"
            type="button"
            role="tab"
            tabindex="0"
          >
            {{ formattedHours() }}
          </button>
          <span class="sc-clock-picker-separator" aria-hidden="true">:</span>
          <button
            class="sc-clock-picker-time-part"
            [class.active]="mode() === 'minutes'"
            [attr.aria-label]="'Select minutes, currently ' + formattedMinutes()"
            [attr.aria-selected]="mode() === 'minutes'"
            (click)="setMode('minutes')"
            (keydown)="handleTimePartKeydown($event, 'minutes')"
            type="button"
            role="tab"
            tabindex="0"
          >
            {{ formattedMinutes() }}
          </button>
          @if (format() === '12h') {
            <div class="sc-clock-picker-period">
              <button
                [active]="value().period === 'AM'"
                [disabled]="disabled()"
                [period]="'AM'"
                [attr.aria-label]="'AM'"
                (clicked)="togglePeriod($event)"
                (keyPressed)="handlePeriodKeydown($event.event, $event.period)"
                sc-clock-picker-period-button
              >
                AM
              </button>
              <button
                [active]="value().period === 'PM'"
                [disabled]="disabled()"
                [period]="'PM'"
                [attr.aria-label]="'PM'"
                (clicked)="togglePeriod($event)"
                (keyPressed)="handlePeriodKeydown($event.event, $event.period)"
                sc-clock-picker-period-button
              >
                PM
              </button>
            </div>
          }
        </div>
      </div>

      <!-- Clock Face -->
      <div
        class="sc-clock-picker-face"
        #clockFace
        [attr.aria-label]="mode() === 'hours' ? 'Select hour' : 'Select minute'"
        (keydown)="handleClockFaceKeydown($event)"
        role="grid"
        tabindex="0"
      >
        <div class="sc-clock-picker-center" aria-hidden="true"></div>

        <!-- Hour/Minute Numbers -->
        @for (number of currentNumbers(); track number.value) {
          <button
            class="sc-clock-picker-number"
            [class.selected]="number.selected"
            [style.left.px]="number.x"
            [style.top.px]="number.y"
            [attr.aria-label]="
              mode() === 'hours' ? 'Hour ' + number.display : 'Minute ' + number.display
            "
            [attr.aria-selected]="number.selected"
            [tabindex]="-1"
            (click)="selectNumber(number.value)"
            type="button"
            role="gridcell"
          >
            {{ number.display }}
          </button>
        }

        <!-- Clock Hand -->
        <div
          class="sc-clock-picker-hand"
          [class.dragging]="isDragging()"
          [style.transform]="'rotate(' + currentAngle() + 'deg)'"
          (mousedown)="startDragging($event)"
          (touchstart)="startDragging($event)"
        ></div>
      </div>
    </div>
  `,
  styles: `
    .sc-clock-picker {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1.5rem;
      background: white; /* oklch(var(--background)) */
      border: 1px solid #e2e8f0; /* oklch(var(--border)) */
      border-radius: 0.5rem;
      box-shadow:
        0 1px 3px 0 rgb(0 0 0 / 0.1),
        0 1px 2px -1px rgb(0 0 0 / 0.1);
      color: #0f172a; /* oklch(var(--foreground)) */
      min-width: 20rem;
      gap: 1.5rem;
    }

    .sc-clock-picker-display {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .sc-clock-picker-time {
      display: flex;
      align-items: center;
      font-size: 2.25rem;
      line-height: 2.5rem;
      font-family:
        ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;
      gap: 0.5rem;
    }

    .sc-clock-picker-time-part {
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      transition:
        background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out;
      border: 2px solid transparent;
      background: transparent;
      color: inherit;
      cursor: pointer;
    }

    .sc-clock-picker-time-part:hover {
      background: #f1f5f9; /* oklch(var(--accent)) */
    }

    .sc-clock-picker-time-part:focus {
      background: #f1f5f9; /* oklch(var(--accent)) */
      outline: none;
    }

    .sc-clock-picker-time-part.active {
      border-color: #3b82f6; /* oklch(var(--primary)) */
      background: rgb(59 130 246 / 0.1); /* oklch(var(--primary) / 0.1) */
    }

    .sc-clock-picker-separator {
      color: #64748b; /* oklch(var(--muted-foreground)) */
    }

    .sc-clock-picker-period {
      display: flex;
      flex-direction: column;
      margin-left: 0.5rem;
      gap: 0.25rem;
    }

    .sc-clock-picker-face {
      position: relative;
      width: 280px;
      height: 280px;
      border-radius: 50%;
      border: 2px solid #e2e8f0; /* oklch(var(--border)) */
      background: #f8fafc; /* oklch(var(--card)) */
      margin: 0 auto;
    }

    .sc-clock-picker-center {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 8px;
      height: 8px;
      background: #3b82f6; /* oklch(var(--primary)) */
      border-radius: 50%;
      transform: translate(-50%, -50%);
      z-index: 20;
    }

    .sc-clock-picker-number {
      position: absolute;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 500;
      border-radius: 50%;
      transition:
        background-color 0.15s ease-in-out,
        color 0.15s ease-in-out;
      z-index: 15;
      background: transparent;
      color: #0f172a; /* oklch(var(--foreground)) */
      border: none;
      cursor: pointer;
      user-select: none;
    }

    .sc-clock-picker-number:hover {
      background: #f1f5f9; /* oklch(var(--accent)) */
      color: #0f172a; /* oklch(var(--accent-foreground)) */
    }

    .sc-clock-picker-number:focus {
      background: #f1f5f9; /* oklch(var(--accent)) */
      color: #0f172a; /* oklch(var(--accent-foreground)) */
      outline: none;
    }

    .sc-clock-picker-number:focus-visible {
      outline: 2px solid #3b82f6; /* oklch(var(--ring)) */
      outline-offset: 2px;
    }

    .sc-clock-picker-number.selected {
      background: #3b82f6; /* oklch(var(--primary)) */
      color: white; /* oklch(var(--primary-foreground)) */
    }

    .sc-clock-picker-hand {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      background: #dc2626; /* red-600 for high visibility - oklch(var(--primary)) */
      transform-origin: 50% 100%;
      transition: transform 0.1s ease-out;
      z-index: 10;
      height: 90px;
      border-radius: 1px;
      cursor: grab;
      margin-top: -90px;
      margin-left: -1px;
    }

    .sc-clock-picker-hand:hover {
      background: #dc2626; /* red-600 for high visibility - oklch(var(--primary)) */
      width: 3px;
      margin-left: -1.5px;
    }

    .sc-clock-picker-hand.dragging {
      cursor: grabbing;
      transition: none;
      width: 3px;
      margin-left: -1.5px;
    }

    .sc-clock-picker-hand::after {
      content: '';
      position: absolute;
      top: -6px;
      left: 50%;
      width: 12px;
      height: 12px;
      background: #dc2626; /* red-600 for high visibility - oklch(var(--primary)) */
      border: 2px solid white; /* oklch(var(--background)) */
      border-radius: 50%;
      transform: translateX(-50%);
      cursor: grab;
    }

    .sc-clock-picker-hand.dragging::after {
      cursor: grabbing;
    }

    .sc-clock-picker-disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-state]': 'mode()',
    '[attr.data-format]': 'format()',
    '[attr.data-disabled]': 'disabled()',
    role: 'group',
    'aria-label': 'Time picker',
    '[attr.aria-disabled]': 'disabled()',
  },
})
export class ScClockPicker {
  private readonly elementRef = inject(ElementRef);

  // Inputs
  readonly format = input<'12h' | '24h'>('12h');
  readonly disabled = input<boolean>(false);
  readonly classInput = input<string>('');

  // Value model
  readonly value = model<TimeValue>({ hours: 12, minutes: 0, period: 'PM' });

  // Internal state
  readonly mode = signal<'hours' | 'minutes'>('hours');
  readonly isDragging = signal<boolean>(false);
  private dragStartAngle = 0;
  private clockFaceRect: DOMRect | null = null;

  // Computed values
  readonly rootClass = computed(() =>
    cn('sc-clock-picker-root', this.disabled() && 'sc-clock-picker-disabled', this.classInput()),
  );

  readonly formattedHours = computed(() => {
    const hours = this.value().hours;
    if (this.format() === '12h') {
      // Convert 24-hour to 12-hour format
      if (hours === 0) return 12; // midnight -> 12 AM
      if (hours > 12) return hours - 12; // 13-23 -> 1-11 PM
      return hours; // 1-12 -> 1-12
    }
    return hours;
  });

  readonly formattedMinutes = computed(() => {
    return this.value().minutes.toString().padStart(2, '0');
  });

  readonly currentNumbers = computed(() => {
    const isHours = this.mode() === 'hours';
    const numbers: Array<{
      value: number;
      display: string;
      x: number;
      y: number;
      selected: boolean;
    }> = [];
    const centerX = 140; // Half of 280px clock face
    const centerY = 140; // Half of 280px clock face
    const radius = 110; // Distance from center to numbers

    if (isHours) {
      const hourNumbers =
        this.format() === '12h'
          ? Array.from({ length: 12 }, (_, i) => (i === 0 ? 12 : i))
          : Array.from({ length: 24 }, (_, i) => i);

      hourNumbers.forEach((hour, index) => {
        const angle = index * (360 / hourNumbers.length) - 90; // Start at 12 o'clock
        const radian = (angle * Math.PI) / 180;
        const x = centerX + radius * Math.cos(radian);
        const y = centerY + radius * Math.sin(radian);
        const currentHour = this.format() === '12h' ? this.formattedHours() : this.value().hours;

        numbers.push({
          value: hour,
          display: hour.toString(),
          x: x - 16, // Subtract half button width (32px / 2)
          y: y - 16, // Subtract half button height (32px / 2)
          selected: hour === currentHour,
        });
      });
    } else {
      Array.from({ length: 12 }, (_, i) => i * 5).forEach((minute, index) => {
        const angle = index * 30 - 90; // 30 degrees apart for minutes
        const radian = (angle * Math.PI) / 180;
        const x = centerX + radius * Math.cos(radian);
        const y = centerY + radius * Math.sin(radian);

        numbers.push({
          value: minute,
          display: minute.toString().padStart(2, '0'),
          x: x - 16, // Subtract half button width
          y: y - 16, // Subtract half button height
          selected: minute === this.value().minutes,
        });
      });
    }

    return numbers;
  });

  readonly currentAngle = computed(() => {
    const isHours = this.mode() === 'hours';
    if (isHours) {
      const hours = this.format() === '12h' ? this.formattedHours() : this.value().hours;
      // For 12-hour format: 12 positions around the clock (0-360 degrees)
      // 12 o'clock = 0°, 1 o'clock = 30°, 2 o'clock = 60°, etc.
      // We need to handle the special case where 12 should point to 0°
      let displayHour = hours;
      if (this.format() === '12h' && hours === 12) {
        displayHour = 0; // 12 o'clock points to top (0°)
      }
      return displayHour * 30; // 30 degrees per hour (360/12 = 30)
    } else {
      // For minutes: point to exact minute position
      // Don't round - show precise minute position
      return this.value().minutes * 6; // 6 degrees per minute (360/60 = 6)
    }
  });

  constructor() {
    afterNextRender(() => {
      this.setupClickHandlers();
    });
  }

  setMode(newMode: 'hours' | 'minutes') {
    if (!this.disabled()) {
      this.mode.set(newMode);
    }
  }

  selectNumber(num: number) {
    if (this.disabled()) return;

    const current = this.value();
    if (this.mode() === 'hours') {
      let hours = num;
      if (this.format() === '12h') {
        if (current.period === 'PM' && num !== 12) {
          hours = num + 12;
        } else if (current.period === 'AM' && num === 12) {
          hours = 0;
        }
      }
      this.value.set({ ...current, hours });
      this.mode.set('minutes');
    } else {
      this.value.set({ ...current, minutes: num });
    }
  }

  togglePeriod(period: 'AM' | 'PM') {
    if (this.disabled()) return;

    const current = this.value();
    let hours = current.hours;

    // Always set the clicked period and adjust hours accordingly
    if (period === 'AM' && current.period === 'PM') {
      // Converting from PM to AM
      hours = hours > 12 ? hours - 12 : hours === 12 ? 0 : hours;
    } else if (period === 'PM' && current.period === 'AM') {
      // Converting from AM to PM
      hours = hours === 0 ? 12 : hours < 12 ? hours + 12 : hours;
    }
    // If clicking the same period, just ensure it's set (no hour change needed)

    this.value.set({ ...current, hours, period });
  }

  handleTimePartKeydown(event: KeyboardEvent, part: 'hours' | 'minutes') {
    if (this.disabled()) return;

    const current = this.value();
    let newValue: number;

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        if (part === 'hours') {
          newValue =
            this.format() === '12h'
              ? (this.formattedHours() % 12) + 1 || 1
              : (current.hours + 1) % 24;
          this.updateHours(newValue);
        } else {
          newValue = (current.minutes + 1) % 60;
          this.value.set({ ...current, minutes: newValue });
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (part === 'hours') {
          newValue =
            this.format() === '12h'
              ? this.formattedHours() - 1 || 12
              : (current.hours - 1 + 24) % 24;
          this.updateHours(newValue);
        } else {
          newValue = (current.minutes - 1 + 60) % 60;
          this.value.set({ ...current, minutes: newValue });
        }
        break;
      case 'Tab':
        if (part === 'hours' && !event.shiftKey) {
          event.preventDefault();
          this.setMode('minutes');
        }
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.setMode(part);
        break;
    }
  }

  handlePeriodKeydown(event: KeyboardEvent, period: 'AM' | 'PM') {
    if (this.disabled()) return;

    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
        event.preventDefault();
        this.togglePeriod(period === 'AM' ? 'PM' : 'AM');
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.togglePeriod(period);
        break;
    }
  }

  handleClockFaceKeydown(event: KeyboardEvent) {
    if (this.disabled()) return;

    const current = this.value();
    const isHours = this.mode() === 'hours';

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        if (isHours) {
          const nextHour =
            this.format() === '12h'
              ? (this.formattedHours() % 12) + 1 || 1
              : (current.hours + 1) % 24;
          this.updateHours(nextHour);
        } else {
          const nextMinute = (current.minutes + 5) % 60;
          this.value.set({ ...current, minutes: nextMinute });
        }
        break;
      case 'ArrowLeft':
        event.preventDefault();
        if (isHours) {
          const prevHour =
            this.format() === '12h'
              ? this.formattedHours() - 1 || 12
              : (current.hours - 1 + 24) % 24;
          this.updateHours(prevHour);
        } else {
          const prevMinute = (current.minutes - 5 + 60) % 60;
          this.value.set({ ...current, minutes: prevMinute });
        }
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (isHours) {
          this.setMode('minutes');
        }
        break;
      case 'Escape':
        (event.target as HTMLElement)?.blur();
        break;
    }
  }

  private updateHours(displayHours: number) {
    const current = this.value();
    let actualHours = displayHours;

    if (this.format() === '12h') {
      if (current.period === 'PM' && displayHours !== 12) {
        actualHours = displayHours + 12;
      } else if (current.period === 'AM' && displayHours === 12) {
        actualHours = 0;
      }
    }

    this.value.set({ ...current, hours: actualHours });
  }

  startDragging(event: MouseEvent | TouchEvent) {
    if (this.disabled()) return;

    event.preventDefault();
    event.stopPropagation();

    const clockFace = this.elementRef.nativeElement.querySelector('.sc-clock-picker-face');
    if (!clockFace) return;

    this.clockFaceRect = clockFace.getBoundingClientRect();
    this.isDragging.set(true);

    // Add global event listeners
    const handleMove = (e: MouseEvent | TouchEvent) => this.handleDrag(e);
    const handleEnd = () => this.stopDragging(handleMove, handleEnd);

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('touchend', handleEnd);

    // Handle the initial position
    this.handleDrag(event);
  }

  private handleDrag(event: MouseEvent | TouchEvent) {
    if (!this.isDragging() || !this.clockFaceRect) return;

    event.preventDefault();

    // Get coordinates from mouse or touch event
    const clientX = 'touches' in event ? event.touches[0]?.clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0]?.clientY : event.clientY;

    if (clientX === undefined || clientY === undefined) return;

    // Calculate center of clock face
    const centerX = this.clockFaceRect.left + this.clockFaceRect.width / 2;
    const centerY = this.clockFaceRect.top + this.clockFaceRect.height / 2;

    // Calculate angle from center to mouse/touch position
    const x = clientX - centerX;
    const y = clientY - centerY;
    let angle = (Math.atan2(y, x) * 180) / Math.PI + 90;
    if (angle < 0) angle += 360;

    // Update time based on current mode
    this.updateTimeFromAngle(angle);
  }

  private updateTimeFromAngle(angle: number) {
    const current = this.value();

    if (this.mode() === 'hours') {
      const hourCount = this.format() === '12h' ? 12 : 24;
      let selectedHour = Math.round(angle / (360 / hourCount)) % hourCount;

      if (this.format() === '12h' && selectedHour === 0) {
        selectedHour = 12;
      }

      this.selectNumber(selectedHour);
    } else {
      // For minutes, snap to 5-minute intervals
      const minuteAngle = Math.round(angle / 30) * 30; // Snap to 30-degree increments (5-minute intervals)
      const selectedMinute = ((minuteAngle / 30) * 5) % 60;
      this.selectNumber(selectedMinute);
    }
  }

  private stopDragging(handleMove: (e: MouseEvent | TouchEvent) => void, handleEnd: () => void) {
    this.isDragging.set(false);
    this.clockFaceRect = null;

    // Remove global event listeners
    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('mouseup', handleEnd);
    document.removeEventListener('touchmove', handleMove);
    document.removeEventListener('touchend', handleEnd);
  }

  private setupClickHandlers() {
    const clockFace = this.elementRef.nativeElement.querySelector('.sc-clock-picker-face');
    if (!clockFace) return;

    clockFace.addEventListener('click', (e: MouseEvent) => {
      if (this.disabled()) return;

      const rect = clockFace.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const x = e.clientX - centerX;
      const y = e.clientY - centerY;

      let angle = (Math.atan2(y, x) * 180) / Math.PI + 90;
      if (angle < 0) angle += 360;

      if (this.mode() === 'hours') {
        const hourCount = this.format() === '12h' ? 12 : 24;
        const selectedHour = Math.round(angle / (360 / hourCount)) % hourCount;
        const displayHour = this.format() === '12h' && selectedHour === 0 ? 12 : selectedHour;
        this.selectNumber(displayHour);
      } else {
        const selectedMinute = Math.round(angle / 6) % 60;
        const roundedMinute = Math.round(selectedMinute / 5) * 5;
        this.selectNumber(roundedMinute);
      }
    });
  }
}
