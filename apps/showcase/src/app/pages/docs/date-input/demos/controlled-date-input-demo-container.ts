import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ControlledDateInputDemo } from './controlled-date-input-demo';

@Component({
  selector: 'app-controlled-date-input-demo-container',
  imports: [DemoContainer, ControlledDateInputDemo],
  template: `
    <app-demo-container
      title="Controlled"
      [code]="code"
      demoUrl="/demos/date-input/controlled-date-input-demo"
    >
      <app-controlled-date-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledDateInputDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScDateInput,
  ScField,
  ScLabel,
} from '@semantic-components/ui';

/** Its value in a signal, two-way; clear() empties every part. */
@Component({
  selector: 'app-controlled-date-input-demo',
  imports: [ScButton, ScDateInput, ScField, ScLabel],
  template: \`
    <div class="flex items-end gap-2">
      <div scField class="w-44">
        <label scLabel>Due date</label>
        <div scDateInput #dueInput="scDateInput" [(value)]="due"></div>
      </div>
      <button scButton variant="outline" (click)="dueInput.clear()">
        Clear
      </button>
    </div>
    <p class="text-muted-foreground text-sm" aria-live="polite">
      {{ due() ? 'Due on ' + due()?.toString() : 'No due date.' }}
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledDateInputDemo {
  private readonly due = signal<Temporal.PlainDate | null>(
    Temporal.PlainDate.from('2026-11-02'),
  );
}`;
}
