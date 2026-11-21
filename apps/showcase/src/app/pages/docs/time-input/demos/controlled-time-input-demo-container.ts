import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ControlledTimeInputDemo } from './controlled-time-input-demo';

@Component({
  selector: 'app-controlled-time-input-demo-container',
  imports: [DemoContainer, ControlledTimeInputDemo],
  template: `
    <app-demo-container
      title="Controlled"
      [code]="code"
      demoUrl="/demos/time-input/controlled-time-input-demo"
    >
      <app-controlled-time-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledTimeInputDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScField,
  ScLabel,
  ScTimeInput,
} from '@semantic-components/ui';

/** Its value in a signal, two-way; clear() empties every part. */
@Component({
  selector: 'app-controlled-time-input-demo',
  imports: [ScButton, ScField, ScLabel, ScTimeInput],
  template: \`
    <div class="flex items-end gap-2">
      <div scField class="w-44">
        <label scLabel>Reminder</label>
        <div
          scTimeInput
          #reminderInput="scTimeInput"
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
export class ControlledTimeInputDemo {
  private readonly reminder = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('07:45'),
  );
}`;
}
