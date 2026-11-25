import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ControlledDateRangeInputDemo } from './controlled-date-range-input-demo';

@Component({
  selector: 'app-controlled-date-range-input-demo-container',
  imports: [DemoContainer, ControlledDateRangeInputDemo],
  template: `
    <app-demo-container
      title="Controlled"
      [code]="code"
      demoUrl="/demos/date-range-input/controlled-date-range-input-demo"
    >
      <app-controlled-date-range-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledDateRangeInputDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  type ScCalendarRange,
  ScDateInput,
  ScDateRangeInput,
  ScField,
  ScLabel,
} from '@semantic-components/ui';

/** Its value in a signal, two-way; clear() empties both ends. */
@Component({
  selector: 'app-controlled-date-range-input-demo',
  imports: [ScDateInput, ScDateRangeInput, ScField, ScLabel, ScButton],
  template: \`
    <div class="flex items-end gap-2">
      <div scField class="w-full max-w-80">
        <label scLabel>Stay</label>
        <div scDateRangeInput #stayInput="scDateRangeInput" [(value)]="stay">
          <div scDateInput part="start" aria-label="Check-in"></div>
          <span aria-hidden="true" class="text-muted-foreground">–</span>
          <div scDateInput part="end" aria-label="Check-out"></div>
        </div>
      </div>
      <button scButton variant="outline" (click)="stayInput.clear()">
        Clear
      </button>
    </div>
    <p class="text-muted-foreground text-sm" aria-live="polite">
      {{ stay()?.from?.toString() ?? '…' }} →
      {{ stay()?.to?.toString() ?? '…' }}
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledDateRangeInputDemo {
  private readonly stay = signal<ScCalendarRange | null>({
    from: Temporal.PlainDate.from('2026-11-02'),
    to: Temporal.PlainDate.from('2026-11-06'),
  });
}`;
}
