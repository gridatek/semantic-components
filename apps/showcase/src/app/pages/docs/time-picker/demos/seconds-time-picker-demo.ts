import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScTimePicker,
  ScTimePickerInput,
  ScTimePickerSeparator,
  TimeValue,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-seconds-time-picker-demo',
  imports: [ScTimePicker, ScTimePickerInput, ScTimePickerSeparator],
  template: `
    <div class="flex flex-col gap-4">
      <div sc-time-picker format="24h" [showSeconds]="true" [(value)]="time">
        <input sc-time-picker-input type="hours" aria-label="Hours" />
        <span sc-time-picker-separator>:</span>
        <input sc-time-picker-input type="minutes" aria-label="Minutes" />
        <span sc-time-picker-separator>:</span>
        <input sc-time-picker-input type="seconds" aria-label="Seconds" />
      </div>
      <p class="text-sm text-muted-foreground">
        Selected: {{ formatTime(time()) }}
      </p>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecondsTimePickerDemo {
  readonly time = signal<TimeValue | null>({
    hours: 10,
    minutes: 30,
    seconds: 15,
  });

  formatTime(val: TimeValue | null): string {
    if (!val) return 'No time selected';
    return `${val.hours.toString().padStart(2, '0')}:${val.minutes.toString().padStart(2, '0')}:${(val.seconds ?? 0).toString().padStart(2, '0')}`;
  }
}
