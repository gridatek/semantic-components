import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ControlledDateInputNextDemo } from './controlled-date-input-next-demo';

@Component({
  selector: 'app-controlled-date-input-next-demo-container',
  imports: [DemoContainer, ControlledDateInputNextDemo],
  template: `
    <app-demo-container
      title="Controlled"
      [code]="code"
      demoUrl="/demos/date-input-next/controlled-date-input-next-demo"
    >
      <app-controlled-date-input-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledDateInputNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScDateInputNext,
  ScField,
  ScLabel,
} from '@semantic-components/ui';

/** Its value in a signal, two-way; clear() empties every part. */
@Component({
  selector: 'app-controlled-date-input-next-demo',
  imports: [ScButton, ScDateInputNext, ScField, ScLabel],
  template: \`
    <div class="flex items-end gap-2">
      <div scField class="w-44">
        <label scLabel>Due date</label>
        <div scDateInputNext #dueInput="scDateInputNext" [(value)]="due"></div>
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
export class ControlledDateInputNextDemo {
  private readonly due = signal<Temporal.PlainDate | null>(
    Temporal.PlainDate.from('2026-11-02'),
  );
}`;
}
