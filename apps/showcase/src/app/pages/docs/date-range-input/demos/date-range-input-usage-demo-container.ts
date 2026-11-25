import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DateRangeInputUsageDemo } from './date-range-input-usage-demo';

@Component({
  selector: 'app-date-range-input-usage-demo-container',
  imports: [DemoContainer, DateRangeInputUsageDemo],
  template: `
    <app-demo-container
      title="Usage"
      [code]="code"
      demoUrl="/demos/date-range-input/date-range-input-usage-demo"
    >
      <app-date-range-input-usage-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DateRangeInputUsageDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  type ScCalendarRange,
  ScDateInput,
  ScDateRangeInput,
  ScField,
  ScFieldDescription,
  ScLabel,
} from '@semantic-components/ui';

/** Your two ends, named by you, in one box: each writes its side of the range once whole. */
@Component({
  selector: 'app-date-range-input-usage-demo',
  imports: [
    ScDateInput,
    ScDateRangeInput,
    ScField,
    ScLabel,
    ScFieldDescription,
  ],
  template: \`
    <div scField class="w-full max-w-80">
      <label scLabel>Stay</label>
      <div scDateRangeInput [(value)]="stay">
        <div scDateInput part="start" aria-label="Check-in"></div>
        <span aria-hidden="true" class="text-muted-foreground">–</span>
        <div scDateInput part="end" aria-label="Check-out"></div>
      </div>
      <p scFieldDescription>Check-in, then check-out.</p>
    </div>
    <p class="text-muted-foreground text-sm" aria-live="polite">
      {{ stay()?.from?.toString() ?? '…' }} →
      {{ stay()?.to?.toString() ?? '…' }}
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class DateRangeInputUsageDemo {
  private readonly stay = signal<ScCalendarRange | null>({
    from: Temporal.PlainDate.from('2026-11-02'),
    to: Temporal.PlainDate.from('2026-11-06'),
  });
}`;
}
