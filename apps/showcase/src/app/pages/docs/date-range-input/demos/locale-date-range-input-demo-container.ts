import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LocaleDateRangeInputDemo } from './locale-date-range-input-demo';

@Component({
  selector: 'app-locale-date-range-input-demo-container',
  imports: [DemoContainer, LocaleDateRangeInputDemo],
  template: `
    <app-demo-container
      title="Locale"
      [code]="code"
      demoUrl="/demos/date-range-input/locale-date-range-input-demo"
    >
      <app-locale-date-range-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LocaleDateRangeInputDemoContainer {
  private readonly code = `import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  type ScCalendarRange,
  ScDateInput,
  ScDateRangeInput,
  ScField,
  ScLabel,
} from '@semantic-components/ui';

/** LOCALE_ID provided as 'de-DE': each end day first, with dots. */
@Component({
  selector: 'app-locale-date-range-input-demo',
  imports: [ScDateInput, ScDateRangeInput, ScField, ScLabel],
  template: \`
    <div lang="de" class="flex w-full flex-col items-center gap-3">
      <div scField class="w-full max-w-80">
        <label scLabel>Aufenthalt</label>
        <div scDateRangeInput [(value)]="stay">
          <div scDateInput part="start" aria-label="Anreise"></div>
          <span aria-hidden="true" class="text-muted-foreground">–</span>
          <div scDateInput part="end" aria-label="Abreise"></div>
        </div>
      </div>
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'de-DE' }],
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class LocaleDateRangeInputDemo {
  private readonly stay = signal<ScCalendarRange | null>({
    from: Temporal.PlainDate.from('2026-11-02'),
    to: Temporal.PlainDate.from('2026-11-06'),
  });
}`;
}
