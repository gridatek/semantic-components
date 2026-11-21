import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlDateTimeInputDemo } from './rtl-date-time-input-demo';

@Component({
  selector: 'app-rtl-date-time-input-demo-container',
  imports: [DemoContainer, RtlDateTimeInputDemo],
  template: `
    <app-demo-container
      title="RTL"
      [code]="code"
      demoUrl="/demos/date-time-input/rtl-date-time-input-demo"
    >
      <app-rtl-date-time-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlDateTimeInputDemoContainer {
  private readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  ScDateTimeInput,
  ScField,
  ScFieldDescription,
  ScLabel,
} from '@semantic-components/ui';

/** In a right-to-left page: the Arabic date reads right to left, the clock's digits left to right; the arrows follow the parts as they show. */
@Component({
  selector: 'app-rtl-date-time-input-demo',
  imports: [Dir, ScDateTimeInput, ScField, ScFieldDescription, ScLabel],
  template: \`
    <div dir="rtl" lang="ar" scField class="w-64">
      <label scLabel>موعد المغادرة</label>
      <div scDateTimeInput [(value)]="departure"></div>
      <p scFieldDescription>بالتوقيت المحلي للمطار.</p>
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlDateTimeInputDemo {
  private readonly departure = signal<Temporal.PlainDateTime | null>(
    Temporal.PlainDateTime.from('2026-11-02T14:30'),
  );
}`;
}
