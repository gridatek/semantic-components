import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  model,
  signal,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

import { ScClockPickerDisplay } from './clock-picker-display';
import { ScClockPickerFace } from './clock-picker-face';
import { ScClockPickerHand } from './clock-picker-hand';
import { ScClockPickerNumber } from './clock-picker-number';
import { ScClockPickerPeriod } from './clock-picker-period';
import { ScClockPickerPeriodButton } from './clock-picker-period-button';
import { ScClockPickerSeparator } from './clock-picker-separator';
import { ScClockPickerTime } from './clock-picker-time';
import { ScClockPickerTimePart } from './clock-picker-time-part';

export interface TimeValue {
  hours: number;
  minutes: number;
  period?: 'AM' | 'PM';
}

@Component({
  selector: 'div[sc-clock-picker]',
  imports: [
    CommonModule,
    ScClockPickerPeriodButton,
    ScClockPickerDisplay,
    ScClockPickerTime,
    ScClockPickerTimePart,
    ScClockPickerSeparator,
    ScClockPickerPeriod,
    ScClockPickerFace,
    ScClockPickerNumber,
    ScClockPickerHand,
  ],
  template: `
    <!-- Time Display -->
    <div sc-clock-picker-display>
      <div sc-clock-picker-time>
        <button
          [active]="mode() === 'hours'"
          [value]="formattedHours()"
          [ariaLabel]="'Select hours, currently ' + formattedHours()"
          [ariaSelected]="mode() === 'hours'"
          (clicked)="setMode('hours')"
          (keyPressed)="handleTimePartKeydown($event, 'hours')"
          sc-clock-picker-time-part
        >
          {{ formattedHours() }}
        </button>

        <span sc-clock-picker-separator>:</span>

        <button
          [active]="mode() === 'minutes'"
          [value]="formattedMinutes()"
          [ariaLabel]="'Select minutes, currently ' + formattedMinutes()"
          [ariaSelected]="mode() === 'minutes'"
          (clicked)="setMode('minutes')"
          (keyPressed)="handleTimePartKeydown($event, 'minutes')"
          sc-clock-picker-time-part
        >
          {{ formattedMinutes() }}
        </button>

        @if (format() === '12h') {
          <div sc-clock-picker-period>
            <button
              [active]="value().period === 'AM'"
              [disabled]="disabled()"
              [period]="'AM'"
              [ariaLabel]="'AM'"
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
              [ariaLabel]="'PM'"
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
      [ariaLabel]="mode() === 'hours' ? 'Select hour' : 'Select minute'"
      [tabindex]="0"
      (keyPressed)="handleClockFaceKeydown($event)"
      (faceClicked)="handleFaceClick($event)"
      sc-clock-picker-face
    >
      @for (number of currentNumbers(); track number.value) {
        <button
          [value]="number.value"
          [x]="number.x"
          [y]="number.y"
          [selected]="number.selected"
          (clicked)="selectNumber($event)"
          sc-clock-picker-number
        >
          {{ number.display }}
        </button>
      }

      <div
        [angle]="currentAngle()"
        [isDragging]="isDragging()"
        [ariaLabel]="mode() === 'hours' ? 'Drag to select hour' : 'Drag to select minute'"
        [valueMin]="mode() === 'hours' ? (format() === '12h' ? 1 : 0) : 0"
        [valueMax]="mode() === 'hours' ? (format() === '12h' ? 12 : 23) : 59"
        [valueNow]="mode() === 'hours' ? formattedHours() : value().minutes"
        [valueText]="
          mode() === 'hours' ? formattedHours() + ' hours' : value().minutes + ' minutes'
        "
        (dragStarted)="onDragStart($event)"
        sc-clock-picker-hand
      ></div>
    </div>
  `,
  styles: `
    .sc-clock-picker {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1.5rem;
      background: var(--background);
      border: 1px solid var(--border);
      border-radius: 0.5rem;
      box-shadow:
        0 1px 3px 0 rgb(0 0 0 / 0.1),
        0 1px 2px -1px rgb(0 0 0 / 0.1);
      color: var(--foreground);
      min-width: 20rem;
      gap: 1.5rem;
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
    '[class]': 'rootClass()',
  },
})
export class ScClockPicker {
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
  private hasDragged = false;
  private previousAngle = 0;

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
    const currentValue = this.value();

    let rawAngle: number;

    if (isHours) {
      const hours = this.format() === '12h' ? this.formattedHours() : currentValue.hours;

      if (this.format() === '12h') {
        // 12-hour format: 30 degrees per hour (360/12 = 30)
        let displayHour = hours;
        if (hours === 12) {
          displayHour = 0; // 12 o'clock points to top (0°)
        }
        rawAngle = displayHour * 30;
      } else {
        // 24-hour format: 15 degrees per hour (360/24 = 15)
        rawAngle = currentValue.hours * 15;
      }
    } else {
      // For minutes: point to exact minute position
      const minutes = currentValue.minutes;
      rawAngle = minutes * 6; // 6 degrees per minute (360/60 = 6)
    }

    // Calculate the shortest path for smooth transitions ONLY when not dragging
    if (!this.isDragging()) {
      // Normalize both angles to 0-360 range for proper comparison
      const normalizedRaw = ((rawAngle % 360) + 360) % 360;
      const normalizedPrev = ((this.previousAngle % 360) + 360) % 360;
      const angleDiff = normalizedRaw - normalizedPrev;

      // If the difference is more than 180 degrees, go the other way
      if (angleDiff > 180) {
        rawAngle = this.previousAngle - (360 - angleDiff);
      } else if (angleDiff < -180) {
        rawAngle = this.previousAngle + (360 + angleDiff);
      }

      this.previousAngle = rawAngle;
    } else {
      // During dragging, just use the raw angle and update previous
      this.previousAngle = rawAngle;
    }

    return rawAngle;
  });

  constructor() {}

  setMode(newMode: 'hours' | 'minutes') {
    if (!this.disabled()) {
      // When switching to minutes mode, ensure minutes stay at 0
      if (newMode === 'minutes') {
        const current = this.value();
        if (current.minutes !== 0) {
          this.value.set({ ...current, minutes: 0 });
        }
      }
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
      // Only update if hour is different
      if (current.hours !== hours) {
        const newValue = { ...current, hours, minutes: 0 };
        this.value.set(newValue);
        // Only auto-switch to minutes for clicks, not for drags
        if (!this.isDragging()) {
          setTimeout(() => this.mode.set('minutes'), 500);
        }
      }
    } else {
      // Handle minute selection - ensure it's in valid range
      const minutes = num >= 60 ? 0 : Math.max(0, Math.min(59, num));
      // Only update if minutes are different
      if (current.minutes !== minutes) {
        this.value.set({ ...current, minutes });
      }
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

  onDragStart(event: MouseEvent | TouchEvent) {
    this.startDragging(event);
  }

  startDragging(event: MouseEvent | TouchEvent) {
    if (this.disabled()) return;

    event.preventDefault();
    event.stopPropagation();

    // The clock face rect will be provided by the face component click event
    // For now, we'll get it from the event target's parent
    const target = event.target as HTMLElement;
    const clockFace = target.closest('[sc-clock-picker-face]');
    if (!clockFace) return;

    this.clockFaceRect = clockFace.getBoundingClientRect();
    this.isDragging.set(true);
    this.hasDragged = false; // Reset drag flag

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

    // Mark that we've actually dragged (moved)
    this.hasDragged = true;

    // Get coordinates from mouse or touch event
    const clientX = 'touches' in event ? event.touches[0]?.clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0]?.clientY : event.clientY;

    if (clientX === undefined || clientY === undefined) return;

    // Calculate center of clock face
    const centerX = this.clockFaceRect.left + this.clockFaceRect.width / 2;
    const centerY = this.clockFaceRect.top + this.clockFaceRect.height / 2;

    // Calculate angle from center to mouse/touch position using Material Design approach
    const x = clientX - centerX;
    const y = clientY - centerY;
    // Use atan2(y, x) and convert to degrees, then adjust for 12 o'clock starting position
    let angle = (Math.atan2(y, x) * 180) / Math.PI;
    // Adjust so 0° is at 12 o'clock (top) instead of 3 o'clock (right)
    angle = (angle + 90) % 360;
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

      // Update hours directly without calling selectNumber to avoid mode switch
      let hours = selectedHour;
      if (this.format() === '12h') {
        if (current.period === 'PM' && selectedHour !== 12) {
          hours = selectedHour + 12;
        } else if (current.period === 'AM' && selectedHour === 12) {
          hours = 0;
        }
      }

      // Only update if hour is different OR if dragging and minutes aren't 0
      if (current.hours !== hours || (this.isDragging() && current.minutes !== 0)) {
        // Reset minutes to 0 when selecting hours (clicking or dragging)
        this.value.set({ ...current, hours, minutes: 0 });
      }
    } else {
      // For minutes: normalize angle to 0-360 range first
      const normalizedAngle = ((angle % 360) + 360) % 360;

      // Snap to 5-minute intervals (30-degree increments)
      const minuteAngle = Math.round(normalizedAngle / 30) * 30;
      let selectedMinute = (minuteAngle / 30) * 5;

      // Handle the 360° case (should be 0 minutes, not 60)
      if (selectedMinute >= 60) {
        selectedMinute = 0;
      }

      // Ensure minute is in 0-59 range
      selectedMinute = Math.max(0, Math.min(59, selectedMinute));

      // Only update if minutes are different
      if (current.minutes !== selectedMinute) {
        this.value.set({ ...current, minutes: selectedMinute });
      }
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

    // After dragging hours, set minutes to 0 and wait for hand animation before switching
    if (this.mode() === 'hours' && this.hasDragged) {
      const current = this.value();
      if (current.minutes !== 0) {
        this.value.set({ ...current, minutes: 0 });
      }
      // Wait for hand animation to complete before switching to minutes
      setTimeout(() => this.mode.set('minutes'), 400); // Match the hand transition duration
    }
  }

  handleFaceClick(event: { clientX: number; clientY: number; rect: DOMRect }) {
    if (this.disabled()) return;

    const centerX = event.rect.left + event.rect.width / 2;
    const centerY = event.rect.top + event.rect.height / 2;

    const x = event.clientX - centerX;
    const y = event.clientY - centerY;

    // Calculate angle using Material Design approach
    let angle = (Math.atan2(y, x) * 180) / Math.PI;
    // Adjust so 0° is at 12 o'clock (top) instead of 3 o'clock (right)
    angle = (angle + 90) % 360;
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
  }
}
