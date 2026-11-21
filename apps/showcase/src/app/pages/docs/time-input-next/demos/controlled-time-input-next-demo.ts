import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScField,
  ScLabel,
  ScTimeInputNext,
} from '@semantic-components/ui';

/** Its value in a signal, two-way; clear() empties every part. */
@Component({
  selector: 'app-controlled-time-input-next-demo',
  imports: [ScButton, ScField, ScLabel, ScTimeInputNext],
  template: `
    <div class="flex items-end gap-2">
      <div scField class="w-44">
        <label scLabel>Reminder</label>
        <div
          scTimeInputNext
          #reminderInput="scTimeInputNext"
          [(value)]="reminder"
        ></div>
      </div>
      <button scButton variant="outline" (click)="reminderInput.clear()">
        Clear
      </button>
    </div>
    <p class="text-muted-foreground text-sm" aria-live="polite">
      {{
        reminder()
          ? 'Reminder at ' + reminder()?.toString({ smallestUnit: 'minute' })
          : 'No reminder.'
      }}
    </p>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledTimeInputNextDemo {
  private readonly reminder = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('07:45'),
  );
}
