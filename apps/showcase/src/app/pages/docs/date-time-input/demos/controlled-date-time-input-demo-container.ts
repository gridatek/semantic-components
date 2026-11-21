import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ControlledDateTimeInputDemo } from './controlled-date-time-input-demo';

@Component({
  selector: 'app-controlled-date-time-input-demo-container',
  imports: [DemoContainer, ControlledDateTimeInputDemo],
  template: `
    <app-demo-container
      title="Controlled"
      [code]="code"
      demoUrl="/demos/date-time-input/controlled-date-time-input-demo"
    >
      <app-controlled-date-time-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledDateTimeInputDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScDateTimeInput,
  ScField,
  ScLabel,
} from '@semantic-components/ui';

/** Its value in a signal, two-way; clear() empties every part. */
@Component({
  selector: 'app-controlled-date-time-input-demo',
  imports: [ScButton, ScDateTimeInput, ScField, ScLabel],
  template: \`
    <div class="flex items-end gap-2">
      <div scField class="w-64">
        <label scLabel>Reminder</label>
        <div
          scDateTimeInput
          #reminderInput="scDateTimeInput"
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
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledDateTimeInputDemo {
  private readonly reminder = signal<Temporal.PlainDateTime | null>(
    Temporal.PlainDateTime.from('2026-11-02T07:45'),
  );
}`;
}
