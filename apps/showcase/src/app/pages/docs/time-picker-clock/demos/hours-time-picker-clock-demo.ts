import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScTimeInput } from '@semantic-components/ui';
import { ScTimePickerClock } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-hours-time-picker-clock-demo',
  imports: [ScTimeInput, ScTimePickerClock],
  template: `
    <div class="flex flex-col items-center gap-4">
      <div
        scTimeInput
        aria-label="Time"
        class="w-32"
        [(value)]="time"
        (focusin)="onFocus($event)"
      ></div>
      <div
        scTimePickerClock
        [mode]="clockMode()"
        [(value)]="time"
        (valueSelected)="onValueSelected()"
      ></div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class HoursTimePickerClockDemo {
  readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('10:00'),
  );
  readonly clockMode = signal<'hours' | 'minutes'>('hours');

  /** The dial follows the part being typed: the hour, or the minute. */
  onFocus(event: FocusEvent): void {
    const type = (event.target as HTMLElement).dataset['type'];
    if (type === 'hour') this.clockMode.set('hours');
    if (type === 'minute') this.clockMode.set('minutes');
  }

  onValueSelected(): void {
    if (this.clockMode() === 'hours') {
      setTimeout(() => this.clockMode.set('minutes'), 300);
    }
  }
}
