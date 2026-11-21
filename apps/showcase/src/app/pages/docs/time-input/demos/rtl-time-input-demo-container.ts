import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlTimeInputDemo } from './rtl-time-input-demo';

@Component({
  selector: 'app-rtl-time-input-demo-container',
  imports: [DemoContainer, RtlTimeInputDemo],
  template: `
    <app-demo-container
      title="RTL"
      [code]="code"
      demoUrl="/demos/time-input/rtl-time-input-demo"
    >
      <app-rtl-time-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlTimeInputDemoContainer {
  private readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScFieldDescription,
  ScLabel,
  ScTimeInput,
} from '@semantic-components/ui';

/** In a right-to-left page: the clock's digits stay left to right, AM/PM on the side the locale puts it; the arrows follow the parts as they show. */
@Component({
  selector: 'app-rtl-time-input-demo',
  imports: [Dir, ScField, ScFieldDescription, ScLabel, ScTimeInput],
  template: \`
    <div dir="rtl" lang="ar" scField class="w-44">
      <label scLabel>وقت الاجتماع</label>
      <div scTimeInput [(value)]="time"></div>
      <p scFieldDescription>بتوقيتك المحلي.</p>
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlTimeInputDemo {
  private readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('14:30'),
  );
}`;
}
