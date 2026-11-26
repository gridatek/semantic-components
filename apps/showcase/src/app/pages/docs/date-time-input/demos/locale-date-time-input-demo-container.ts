import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LocaleDateTimeInputDemo } from './locale-date-time-input-demo';

@Component({
  selector: 'app-locale-date-time-input-demo-container',
  imports: [DemoContainer, LocaleDateTimeInputDemo],
  template: `
    <app-demo-container
      title="Locale"
      [code]="code"
      demoUrl="/demos/date-time-input/locale-date-time-input-demo"
    >
      <app-locale-date-time-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LocaleDateTimeInputDemoContainer {
  private readonly code = `import {
  Component,
  HostAttributeToken,
  LOCALE_ID,
  ViewEncapsulation,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { ScDateTimeInput, ScField, ScLabel } from '@semantic-components/ui';

/** A field in the locale of its lang attribute. */
@Component({
  selector: 'app-locale-date-time',
  imports: [ScDateTimeInput, ScField, ScLabel],
  template: \`
    <div scField>
      <label scLabel>{{ label() }}</label>
      <div scDateTimeInput [(value)]="value"></div>
    </div>
  \`,
  providers: [
    {
      provide: LOCALE_ID,
      useFactory: () => inject(new HostAttributeToken('lang')),
    },
  ],
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
class LocaleDateTime {
  readonly label = input.required<string>();
  readonly value = model<Temporal.PlainDateTime | null>(null);
}

/** The same moment in three locales: the parts' order, the separators, the clock and the names are the locale's (LOCALE_ID). */
@Component({
  selector: 'app-locale-date-time-input-demo',
  imports: [LocaleDateTime],
  template: \`
    <div class="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
      <app-locale-date-time
        lang="en-GB"
        label="Departure"
        [(value)]="departure"
      />
      <app-locale-date-time
        lang="de-DE"
        label="Abfahrt"
        [(value)]="departure"
      />
      <app-locale-date-time lang="ko-KR" label="출발" [(value)]="departure" />
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class LocaleDateTimeInputDemo {
  private readonly departure = signal<Temporal.PlainDateTime | null>(
    Temporal.PlainDateTime.from('2026-11-02T14:30'),
  );
}`;
}
